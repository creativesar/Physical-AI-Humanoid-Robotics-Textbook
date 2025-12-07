"""
Qdrant Vector Database Service for RAG.

Provides:
- Collection management
- Document indexing with embeddings
- Semantic search
"""

from qdrant_client import QdrantClient
from qdrant_client.http import models as qdrant_models
from typing import List, Dict, Any, Optional
import uuid

from ..config import settings
from .gemini_service import gemini_service


class QdrantService:
    """Service for Qdrant vector database operations."""
    
    def __init__(self):
        if settings.qdrant_url and settings.qdrant_api_key:
            self.client = QdrantClient(
                url=settings.qdrant_url,
                api_key=settings.qdrant_api_key
            )
        else:
            # Use in-memory client for development
            self.client = QdrantClient(":memory:")
        
        self.collection_name = settings.qdrant_collection_name
        self.vector_size = 1536  # text-embedding-3-small dimension
        
        # Ensure collection exists
        self._ensure_collection()

    def _ensure_collection(self):
        """Ensure the vector collection exists."""
        try:
            self.client.get_collection(self.collection_name)
        except Exception:
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=qdrant_models.VectorParams(
                    size=self.vector_size,
                    distance=qdrant_models.Distance.COSINE
                )
            )

    async def index_document(
        self,
        document_id: int,
        title: str,
        content: str,
        source_url: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> str:
        """
        Index a document in the vector database.
        
        Args:
            document_id: Database ID of the document
            title: Document title
            content: Document content
            source_url: Optional source URL
            metadata: Optional additional metadata
        
        Returns:
            Vector ID (UUID string)
        """
        # Create embedding
        embedding = await gemini_service.create_embedding(f"{title}\n\n{content}")
        
        # Generate vector ID
        vector_id = str(uuid.uuid4())
        
        # Prepare payload
        payload = {
            "document_id": document_id,
            "title": title,
            "content": content[:2000],  # Limit stored content
            "source_url": source_url,
            **(metadata or {})
        }
        
        # Upsert to Qdrant
        self.client.upsert(
            collection_name=self.collection_name,
            points=[
                qdrant_models.PointStruct(
                    id=vector_id,
                    vector=embedding,
                    payload=payload
                )
            ]
        )
        
        return vector_id

    async def index_documents_batch(
        self,
        documents: List[Dict[str, Any]]
    ) -> List[str]:
        """
        Index multiple documents in batch.
        
        Args:
            documents: List of document dicts with id, title, content, etc.
        
        Returns:
            List of vector IDs
        """
        # Create embeddings in batch
        texts = [f"{doc['title']}\n\n{doc['content']}" for doc in documents]
        embeddings = await gemini_service.create_embeddings(texts)
        
        # Prepare points
        points = []
        vector_ids = []
        
        for doc, embedding in zip(documents, embeddings):
            vector_id = str(uuid.uuid4())
            vector_ids.append(vector_id)
            
            points.append(
                qdrant_models.PointStruct(
                    id=vector_id,
                    vector=embedding,
                    payload={
                        "document_id": doc.get("id"),
                        "title": doc["title"],
                        "content": doc["content"][:2000],
                        "source_url": doc.get("source_url"),
                        **(doc.get("metadata") or {})
                    }
                )
            )
        
        # Upsert batch
        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        
        return vector_ids

    async def search(
        self,
        query: str,
        top_k: int = 5,
        score_threshold: float = 0.7
    ) -> List[Dict[str, Any]]:
        """
        Search for relevant documents.
        
        Args:
            query: Search query
            top_k: Number of results to return
            score_threshold: Minimum similarity score
        
        Returns:
            List of search results with scores
        """
        # Create query embedding
        query_embedding = await gemini_service.create_embedding(query)
        
        # Search
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=top_k,
            score_threshold=score_threshold
        )
        
        return [
            {
                "id": str(result.id),
                "score": result.score,
                "title": result.payload.get("title", ""),
                "content": result.payload.get("content", ""),
                "source_url": result.payload.get("source_url"),
                "document_id": result.payload.get("document_id"),
                "metadata": {k: v for k, v in result.payload.items() 
                           if k not in ["title", "content", "source_url", "document_id"]}
            }
            for result in results
        ]

    async def delete_document(self, vector_id: str) -> bool:
        """
        Delete a document from the vector database.
        
        Args:
            vector_id: The vector ID to delete
        
        Returns:
            True if successful
        """
        try:
            self.client.delete(
                collection_name=self.collection_name,
                points_selector=qdrant_models.PointIdsList(
                    points=[vector_id]
                )
            )
            return True
        except Exception:
            return False

    def get_collection_info(self) -> Dict[str, Any]:
        """Get information about the collection."""
        try:
            info = self.client.get_collection(self.collection_name)
            return {
                "name": self.collection_name,
                "vectors_count": info.vectors_count,
                "points_count": info.points_count,
                "status": info.status.value
            }
        except Exception as e:
            return {"error": str(e)}


# Singleton instance
qdrant_service = QdrantService()
