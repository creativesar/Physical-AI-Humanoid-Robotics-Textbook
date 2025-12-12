from fastapi import APIRouter, HTTPException, Query, Depends
from pydantic import BaseModel
from typing import List, Optional
import cohere
from qdrant_client import QdrantClient
from qdrant_client.http import models
from config.settings import settings
import uuid
from models.database import User
from auth.authentication import get_current_active_user

router = APIRouter()

# Initialize Cohere client
co = cohere.Client(settings.COHERE_API_KEY)

# Initialize Qdrant client
qdrant_client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY
)

class QueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5
    module_filter: Optional[str] = None

class QueryResponse(BaseModel):
    query: str
    results: List[str]
    sources: List[str]

@router.post("/", response_model=QueryResponse)
async def query_knowledge_base(
    request: QueryRequest,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Generate embedding for the query using Cohere
        response = co.embed(
            texts=[request.query],
            model='embed-english-v3.0',
            input_type="search_query"
        )
        query_embedding = response.embeddings[0]

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
            sources=sources
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error querying knowledge base: {str(e)}")