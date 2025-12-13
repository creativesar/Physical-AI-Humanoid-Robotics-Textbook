from fastapi import APIRouter, HTTPException, Query, Depends
from pydantic import BaseModel
from typing import List, Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models
from config.settings import settings
import uuid
from models.database import User
from auth.authentication import get_current_active_user
from services.ai_service import AIClientService

router = APIRouter()

# Initialize the unified AI service
ai_service = AIClientService()

# Initialize Qdrant client
qdrant_client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY
)

class QueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5
    module_filter: Optional[str] = None
    provider: Optional[str] = "cohere"  # Default to Cohere

class QueryResponse(BaseModel):
    query: str
    results: List[str]
    sources: List[str]
    provider: str

@router.post("/", response_model=QueryResponse)
async def query_knowledge_base(
    request: QueryRequest,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Generate embedding for the query using the specified provider
        query_embedding = ai_service.generate_embedding(
            text=request.query,
            provider=request.provider
        )

        # Search in Qdrant for similar content
        search_filter = None
        if request.module_filter:
            search_filter = models.Filter(
                must=[
                    models.FieldCondition(
                        key="module",
                        match=models.MatchValue(value=request.module_filter),
                    ),
                ]
            )

        search_results = qdrant_client.search(
            collection_name="textbook_content",
            query_vector=query_embedding,
            query_filter=search_filter,
            limit=request.top_k
        )

        # Extract the text content from results
        results = [hit.payload.get("text", "") for hit in search_results]
        sources = [hit.payload.get("module", "") + "#" + hit.payload.get("section", "") for hit in search_results]

        return QueryResponse(
            query=request.query,
            results=results,
            sources=sources,
            provider=request.provider
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying knowledge base: {str(e)}")