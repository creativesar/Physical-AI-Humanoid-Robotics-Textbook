"""
Personalization API endpoints.

Provides:
- Content adaptation based on user level
- User preference management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas
from ..services.gemini_service import gemini_service
from ..database import get_db
from .auth import get_current_user

router = APIRouter()


@router.post("/content", response_model=schemas.PersonalizeContentResponse)
async def personalize_content(
    request: schemas.PersonalizeContentRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Personalize content for the user's experience level.
    """
    # Determine level to use
    if request.level:
        level = request.level.value
    elif current_user.preferences:
        level = current_user.preferences.experience_level
    else:
        level = "intermediate"
    
    try:
        personalized = await gemini_service.personalize_content(
            content=request.content,
            level=level
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Personalization failed: {str(e)}"
        )
    
    return schemas.PersonalizeContentResponse(
        original_content=request.content,
        personalized_content=personalized,
        level=level
    )


@router.get("/preferences", response_model=schemas.UserPreferenceResponse)
def get_preferences(
    current_user: models.User = Depends(get_current_user)
):
    """Get current user's preferences."""
    if not current_user.preferences:
        # Should not happen for valid users, but handle gracefully
        return schemas.UserPreferenceResponse(
            experience_level="intermediate",
            preferred_language="en",
            personalization_enabled=True
        )
    
    return current_user.preferences


@router.put("/preferences", response_model=schemas.UserPreferenceResponse)
def update_preferences(
    preferences: schemas.UserPreferenceUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Update user's preferences."""
    user_prefs = current_user.preferences
    
    if not user_prefs:
        user_prefs = models.UserPreference(user_id=current_user.id)
        db.add(user_prefs)
    
    if preferences.experience_level:
        user_prefs.experience_level = preferences.experience_level.value
    
    if preferences.preferred_language:
        user_prefs.preferred_language = preferences.preferred_language
        
    if preferences.personalization_enabled is not None:
        user_prefs.personalization_enabled = preferences.personalization_enabled
    
    db.commit()
    db.refresh(user_prefs)
    
    return user_prefs
