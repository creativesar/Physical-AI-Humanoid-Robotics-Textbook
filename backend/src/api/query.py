from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from ..database.qdrant_client import get_qdrant_client, query_collection
from ..services import embeddings
from ..core.config import settings

router = APIRouter()

class QueryRequest(BaseModel):
    query_text: str
    top_k: int = 5

class QueryResult(BaseModel):
    id: str
    text: str
    chapter: str
    section: str
    score: float

class QueryResponse(BaseModel):
    results: List[QueryResult]

@router.post("/query", response_model=QueryResponse)
async def query_textbook(request: QueryRequest):
    try:
        # Generate embedding for the query
        query_embeddings = await embeddings.generate_embeddings([request.query_text])
        query_vector = query_embeddings[0]

        # Query Qdrant for similar chunks
        search_results = query_collection(query_vector, limit=request.top_k)

        results = []
        for hit in search_results:
            payload = hit.payload or {}
            results.append(QueryResult(
                id=hit.id,
                text=payload.get("text", ""),
                chapter=payload.get("chapter", ""),
                section=payload.get("section", ""),
                score=hit.score
            ))
        return QueryResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {e}")