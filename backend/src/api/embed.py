from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from ..services import embeddings

router = APIRouter()

class EmbedRequest(BaseModel):
    texts: List[str]

class EmbedResponse(BaseModel):
    embeddings: List[List[float]]

@router.post("/embed", response_model=EmbedResponse)
async def create_embeddings(request: EmbedRequest):
    try:
        vectors = await embeddings.generate_embeddings(request.texts)
        return EmbedResponse(embeddings=vectors)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding generation failed: {e}")