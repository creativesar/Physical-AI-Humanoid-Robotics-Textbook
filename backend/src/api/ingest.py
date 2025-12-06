"""
Content Ingestion API endpoints.

Provides:
- Single document ingestion
- Batch document ingestion
- Document deletion
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..services.qdrant_service import qdrant_service
from ..database import get_db
from .auth import get_current_user

router = APIRouter()


@router.post("/document", response_model=schemas.ContentIngestResponse, status_code=status.HTTP_201_CREATED)
async def ingest_document(
    request: schemas.ContentIngestRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Ingest a single document into the vector database.
    
    The document will be embedded and stored for RAG retrieval.
    """
    # Create database record
    document = models.ContentDocument(
        title=request.title,
        content=request.content,
        source_url=request.source_url,
        doc_type=request.doc_type,
        doc_metadata=request.doc_metadata or {}
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    
    # Index in vector database
    try:
        vector_id = await qdrant_service.index_document(
            document_id=document.id,
            title=document.title,
            content=document.content,
            source_url=document.source_url,
            metadata=document.doc_metadata
        )
        
        # Update document with vector ID
        document.vector_id = vector_id
        db.commit()
        
    except Exception as e:
        # Rollback on indexing failure
        db.delete(document)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to index document: {str(e)}"
        )
    
    return schemas.ContentIngestResponse(
        id=document.id,
        title=document.title,
        vector_id=vector_id,
        status="indexed"
    )


@router.post("/batch", response_model=List[schemas.ContentIngestResponse], status_code=status.HTTP_201_CREATED)
async def ingest_batch(
    requests: List[schemas.ContentIngestRequest],
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Ingest multiple documents in batch.
    
    More efficient than individual ingestion for large datasets.
    """
    if len(requests) > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum 100 documents per batch"
        )
    
    # Create database records
    documents = []
    for req in requests:
        doc = models.ContentDocument(
            title=req.title,
            content=req.content,
            source_url=req.source_url,
            doc_type=req.doc_type,
            doc_metadata=req.doc_metadata or {}
        )
        db.add(doc)
        documents.append(doc)
    
    db.commit()
    for doc in documents:
        db.refresh(doc)
    
    # Prepare for batch indexing
    docs_for_indexing = [
        {
            "id": doc.id,
            "title": doc.title,
            "content": doc.content,
            "source_url": doc.source_url,
            "metadata": doc.doc_metadata
        }
        for doc in documents
    ]
    
    try:
        vector_ids = await qdrant_service.index_documents_batch(docs_for_indexing)
        
        # Update documents with vector IDs
        for doc, vector_id in zip(documents, vector_ids):
            doc.vector_id = vector_id
        db.commit()
        
    except Exception as e:
        # Rollback on failure
        for doc in documents:
            db.delete(doc)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to index documents: {str(e)}"
        )
    
    return [
        schemas.ContentIngestResponse(
            id=doc.id,
            title=doc.title,
            vector_id=doc.vector_id,
            status="indexed"
        )
        for doc in documents
    ]


@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Delete a document from both the database and vector store."""
    document = db.query(models.ContentDocument).filter(
        models.ContentDocument.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Delete from vector store
    if document.vector_id:
        await qdrant_service.delete_document(document.vector_id)
    
    # Delete from database
    db.delete(document)
    db.commit()


@router.get("/stats")
async def get_ingestion_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get statistics about ingested content."""
    doc_count = db.query(models.ContentDocument).count()
    qdrant_info = qdrant_service.get_collection_info()
    
    return {
        "database_documents": doc_count,
        "vector_store": qdrant_info
    }
