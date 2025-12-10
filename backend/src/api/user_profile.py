from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any

from ..database.postgres_client import get_db_session
from ..models.postgres_models import UserProfile  # Removed User model as its handled by Better Auth
from ..core.auth import get_current_user

router = APIRouter()

class UserProfileRequest(BaseModel):
    preferences: Dict[str, Any]  # e.g., {"dark_mode": True, "notifications": False}

class UserProfileResponse(BaseModel):
    user_id: str
    preferences: Dict[str, Any]

@router.get("/user-profile", response_model=UserProfileResponse)
async def get_user_profile(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("sub")  # This should be the Better Auth user ID

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid user token")

    db = next(get_db_session())  # Get a new session

    # Get or create user profile
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    preferences = profile.preferences if profile else {}

    return UserProfileResponse(user_id=user_id, preferences=preferences)

@router.put("/user-profile", response_model=UserProfileResponse)
async def update_user_profile(request: UserProfileRequest, current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("sub")  # This should be the Better Auth user ID

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid user token")

    db = next(get_db_session())  # Get a new session

    # Get or create user profile
    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    if profile:
        profile.preferences = request.preferences
    else:
        profile = UserProfile(user_id=user_id, preferences=request.preferences)
        db.add(profile)

    db.commit()
    db.refresh(profile)  # Refresh to get updated preferences

    return UserProfileResponse(user_id=user_id, preferences=profile.preferences)