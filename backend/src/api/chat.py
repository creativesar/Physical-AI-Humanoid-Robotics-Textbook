"""
Chat API endpoints.

Provides:
- Chat with AI assistant (with RAG)
- Text-selection based Q&A
- Conversation history management
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import Optional, List
import json

from .. import models, schemas
from ..services.gemini_service import gemini_service
from ..services.qdrant_service import qdrant_service
from ..database import get_db
from .auth import get_current_user, get_optional_user
from ..config import settings

router = APIRouter()


async def get_rag_context(query: str, top_k: int = 3) -> tuple[str, List[dict]]:
    """Get RAG context for a query."""
    if not settings.enable_rag:
        return "", []
    
    try:
        results = await qdrant_service.search(query, top_k=top_k)
        if not results:
            return "", []
        
        # Format context
        context_parts = []
        sources = []
        for result in results:
            context_parts.append(f"## {result['title']}\n{result['content']}")
            sources.append({
                "title": result["title"],
                "score": result["score"],
                "source_url": result.get("source_url")
            })
        
        return "\n\n---\n\n".join(context_parts), sources
    except Exception:
        return "", []


def get_conversation_history(
    db: Session,
    conversation_id: int,
    limit: int = 10
) -> List[dict]:
    """Get recent messages from a conversation."""
    messages = db.query(models.ConversationMessage).filter(
        models.ConversationMessage.conversation_id == conversation_id
    ).order_by(
        models.ConversationMessage.created_at.desc()
    ).limit(limit).all()
    
    # Return in chronological order
    return [
        {"role": msg.role, "content": msg.content}
        for msg in reversed(messages)
    ]


@router.post("/", response_model=schemas.ChatResponse)
async def chat(
    request: schemas.ChatRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Chat with the AI assistant.
    
    Optionally uses RAG to retrieve relevant textbook content.
    """
    # Get or create conversation
    if request.conversation_id:
        conversation = db.query(models.Conversation).filter(
            models.Conversation.id == request.conversation_id,
            models.Conversation.user_id == current_user.id
        ).first()
        if not conversation:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Conversation not found"
            )
    else:
        conversation = models.Conversation(
            user_id=current_user.id,
            title=request.message[:50] + "..." if len(request.message) > 50 else request.message
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
    
    # Get conversation history
    history = get_conversation_history(db, conversation.id)
    
    # Get RAG context if enabled
    rag_context = ""
    sources = []
    if request.include_rag:
        rag_context, sources = await get_rag_context(request.message)
    
    # Generate response
    try:
        response_text = await gemini_service.chat(
            message=request.message,
            conversation_history=history,
            rag_context=rag_context
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI service error: {str(e)}"
        )
    
    # Save messages
    user_message = models.ConversationMessage(
        conversation_id=conversation.id,
        role="user",
        content=request.message
    )
    assistant_message = models.ConversationMessage(
        conversation_id=conversation.id,
        role="assistant",
        content=response_text,
        msg_metadata={"sources": sources} if sources else {}
    )
    db.add(user_message)
    db.add(assistant_message)
    db.commit()
    
    return schemas.ChatResponse(
        message=response_text,
        conversation_id=conversation.id,
        sources=sources if sources else None
    )


@router.post("/selection", response_model=schemas.ChatResponse)
async def chat_with_selection(
    request: schemas.TextSelectionRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Answer a question about selected text.
    
    This endpoint is designed for text-selection based Q&A.
    """
    try:
        response_text = await gemini_service.answer_selection(
            selected_text=request.selected_text,
            question=request.question,
            context=request.context
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"AI service error: {str(e)}"
        )
    
    # Create a new conversation for this Q&A
    conversation = models.Conversation(
        user_id=current_user.id,
        title=f"Q: {request.question[:40]}..."
    )
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    # Save the exchange
    user_message = models.ConversationMessage(
        conversation_id=conversation.id,
        role="user",
        content=request.question,
        msg_metadata={"selected_text": request.selected_text, "context": request.context}
    )
    assistant_message = models.ConversationMessage(
        conversation_id=conversation.id,
        role="assistant",
        content=response_text
    )
    db.add(user_message)
    db.add(assistant_message)
    db.commit()
    
    return schemas.ChatResponse(
        message=response_text,
        conversation_id=conversation.id
    )


@router.get("/history", response_model=List[schemas.ConversationResponse])
def get_conversations(
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get user's conversation history."""
    conversations = db.query(models.Conversation).filter(
        models.Conversation.user_id == current_user.id
    ).order_by(
        models.Conversation.updated_at.desc()
    ).limit(limit).all()
    
    return [
        schemas.ConversationResponse(
            id=conv.id,
            title=conv.title,
            created_at=conv.created_at,
            messages=[]  # Don't include messages in list view
        )
        for conv in conversations
    ]


@router.get("/history/{conversation_id}", response_model=schemas.ConversationResponse)
def get_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Get a specific conversation with messages."""
    conversation = db.query(models.Conversation).filter(
        models.Conversation.id == conversation_id,
        models.Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    messages = [
        schemas.ChatMessage(
            role=schemas.MessageRole(msg.role),
            content=msg.content,
            msg_metadata=msg.msg_metadata
        )
        for msg in conversation.messages
    ]
    
    return schemas.ConversationResponse(
        id=conversation.id,
        title=conversation.title,
        created_at=conversation.created_at,
        messages=messages
    )


@router.delete("/history/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Delete a conversation."""
    conversation = db.query(models.Conversation).filter(
        models.Conversation.id == conversation_id,
        models.Conversation.user_id == current_user.id
    ).first()
    
    if not conversation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found"
        )
    
    db.delete(conversation)
    db.commit()


@router.delete("/history", status_code=status.HTTP_204_NO_CONTENT)
def clear_all_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """Clear all conversation history for the user."""
    db.query(models.Conversation).filter(
        models.Conversation.user_id == current_user.id
    ).delete()
    db.commit()
