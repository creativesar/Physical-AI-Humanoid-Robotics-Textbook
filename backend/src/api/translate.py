"""
Translation API endpoints.

Provides:
- Content translation to Urdu (and potentially other languages)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas
from ..services.gemini_service import gemini_service
from .auth import get_current_user
from .. import models

router = APIRouter()


@router.post("/urdu", response_model=schemas.TranslateResponse)
async def translate_to_urdu(
    request: schemas.TranslateRequest,
    current_user: models.User = Depends(get_current_user)
):
    """
    Translate content to Urdu.
    
    Preserves technical terms and markdown formatting.
    """
    try:
        translated = await gemini_service.translate_to_urdu(request.content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Translation failed: {str(e)}"
        )
    
    return schemas.TranslateResponse(
        original_content=request.content,
        translated_content=translated,
        source_language="en",
        target_language="ur"
    )
