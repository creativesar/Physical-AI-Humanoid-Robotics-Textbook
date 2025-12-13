from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from config.settings import settings
from models.database import User
from auth.authentication import get_current_active_user
from services.ai_service import AIClientService
from qdrant_client import QdrantClient
from qdrant_client.http import models
import uuid

router = APIRouter()

# Initialize the unified AI service
ai_service = AIClientService()

# Initialize Qdrant client
qdrant_client = QdrantClient(
    url=settings.QDRANT_URL,
    api_key=settings.QDRANT_API_KEY
)

class EmbedRequest(BaseModel):
    text: str
    module: Optional[str] = None
    section: Optional[str] = None
    provider: Optional[str] = "cohere"  # Default to Cohere

class EmbedResponse(BaseModel):
    id: str
    embedding: List[float]
    text: str
    module: Optional[str] = None
    section: Optional[str] = None
    provider: str

@router.post("/", response_model=EmbedResponse)
async def create_embedding(
    request: EmbedRequest,
    current_user: User = Depends(get_current_active_user)
):
    try:
        # Generate embedding using the specified provider
        embedding = ai_service.generate_embedding(
            text=request.text,
            provider=request.provider
        )

        # Generate a unique ID for this content
        content_id = str(uuid.uuid4())

        # Store the embedding in Qdrant
        qdrant_client.upsert(
            collection_name="textbook_content",
            points=[
                models.PointStruct(
                    id=content_id,
                    vector=embedding,
                    payload={
                        "text": request.text,
                        "module": request.module,
                        "section": request.section,
                        "user_id": str(current_user.user_id) if current_user else None,
                        "created_at": str(uuid.uuid4()) # This would normally be a timestamp
                    }
                )
            ]
        )

        return EmbedResponse(
            id=content_id,
            embedding=embedding,
            text=request.text,
            module=request.module,
            section=request.section,
            provider=request.provider
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing embedding: {str(e)}")