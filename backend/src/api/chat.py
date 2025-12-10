from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Dict, Any

from ..services import rag_pipeline
from ..core.auth import get_current_user

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    user_message: str
    chat_history: List[ChatMessage] = [] # Optional: for conversational context
    selected_text: str | None = None # Optional: if user selected text from textbook

class ChatResponse(BaseModel):
    ai_response: str
    sources: List[Dict[str, Any]] # e.g., [{"chapter": "...", "section": "..."}]

@router.post("/chat", response_model=ChatResponse)
async def chat_with_rag(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    try:
        user_id = current_user.get("sub")  # Assuming 'sub' is the user ID in the JWT payload

        response, sources = await rag_pipeline.process_chat_query(
            user_message=request.user_message,
            chat_history=[{'role': msg.role, 'content': msg.content} for msg in request.chat_history],
            selected_text=request.selected_text,
            user_id=user_id  # Pass user ID for potential logging or personalization
        )
        return ChatResponse(ai_response=response, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {e}")