"""
RAG Query API endpoints.

Provides:
- RAG-enhanced question answering with source citations
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional

from .. import schemas
from ..services.gemini_service import gemini_service
from ..services.qdrant_service import qdrant_service
from ..database import get_db
from .auth import get_current_user, get_optional_user
from ..config import settings
from .. import models

router = APIRouter()


@router.post("/query", response_model=schemas.RAGQueryResponse)
async def rag_query(
    request: schemas.RAGQueryRequest,
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(get_optional_user)
):
    """
    Query the textbook content with RAG.
    
    Retrieves relevant content and generates an answer with source citations.
    This endpoint can be used without authentication for basic queries.
    """
    if not settings.enable_rag:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="RAG is not enabled"
        )
    
    # Search for relevant documents
    try:
        search_results = await qdrant_service.search(
            query=request.query,
            top_k=request.top_k
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search error: {str(e)}"
        )
    
    if not search_results:
        return schemas.RAGQueryResponse(
            answer="I couldn't find relevant information in the textbook to answer your question. Please try rephrasing or ask about a different topic.",
            sources=[],
            query=request.query
        )
    
    # Build context from search results
    context_parts = []
    sources = []
    for result in search_results:
        context_parts.append(f"## {result['title']}\n{result['content']}")
        sources.append(schemas.RAGSource(
            title=result["title"],
            content=result["content"][:500] + "..." if len(result["content"]) > 500 else result["content"],
            score=result["score"],
            source_url=result.get("source_url"),
            doc_metadata=result.get("metadata") if request.include_metadata else None
        ))
    
    rag_context = "\n\n---\n\n".join(context_parts)
    
    # Generate answer
    try:
        answer = await gemini_service.chat(
            message=request.query,
            rag_context=rag_context
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI service error: {str(e)}"
        )
    
    return schemas.RAGQueryResponse(
        answer=answer,
        sources=sources,
        query=request.query
    )


@router.get("/search")
async def search_content(
    query: str,
    top_k: int = 5,
    current_user: Optional[models.User] = Depends(get_optional_user)
):
    """
    Search textbook content without generating an answer.
    
    Returns matching documents for the query.
    """
    if not settings.enable_rag:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="RAG is not enabled"
        )
    
    try:
        results = await qdrant_service.search(query=query, top_k=top_k)
        return {"query": query, "results": results}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Search error: {str(e)}"
        )
