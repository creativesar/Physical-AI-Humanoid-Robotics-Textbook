from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any

from ..database.postgres_client import get_db_session
from ..models.postgres_models import FeedbackLog # Assuming this model exists
from ..core.auth import get_current_user

router = APIRouter()

class FeedbackRequest(BaseModel):
    query: str
    response: str
    is_helpful: bool
    comments: str | None = None
    rating: int | None = None # e.g., 1-5

@router.post("/feedback")
async def submit_feedback(request: FeedbackRequest, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user.get("sub")  # Assuming 'sub' is the user ID in the JWT payload

        db = next(get_db_session()) # Get a new session
        feedback_entry = FeedbackLog(
            user_id=user_id,
            query=request.query,
            response=request.response,
            is_helpful=request.is_helpful,
            comments=request.comments,
            rating=request.rating
        )
        db.add(feedback_entry)
        db.commit()
        db.refresh(feedback_entry)
        return {"message": "Feedback submitted successfully!", "id": feedback_entry.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit feedback: {e}")