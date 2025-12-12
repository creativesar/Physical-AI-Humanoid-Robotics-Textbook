from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import cohere
from config.settings import settings
from models.database import User
from auth.authentication import get_current_active_user

router = APIRouter()

# Initialize Cohere client
co = cohere.Client(settings.COHERE_API_KEY)

class EmbedRequest(BaseModel):
    text: str
    module: Optional[str] = None
    section: Optional[str] = None

class EmbedResponse(BaseModel):
    id: str
    embedding: List[float]
    text: str
    module: Optional[str] = None
    section: Optional[str] = None

@router.post("/", response_model=EmbedResponse)
async def create_embedding(
    request: EmbedRequest,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Generate embedding using Cohere
        response = co.embed(
            texts=[request.text],
            model='embed-english-v3.0',  # Using Cohere's embedding model
            input_type="search_document"
        )

        # Extract the embedding
        embedding = response.embeddings[0]

        # In a real implementation, you would store this in Qdrant
        # For now, we'll just return the embedding

        return EmbedResponse(
            id="temp_id",  # This would be generated in a real implementation
            embedding=embedding,
            text=request.text,
            module=request.module,
            section=request.section
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating embedding: {str(e)}")