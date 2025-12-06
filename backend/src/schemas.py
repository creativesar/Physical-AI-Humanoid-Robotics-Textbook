from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum


# ============== Enums ==============

class ExperienceLevel(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"


class MessageRole(str, Enum):
    user = "user"
    assistant = "assistant"
    system = "system"


# ============== User & Auth Schemas ==============

class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class User(UserBase):
    id: int
    is_active: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class UserWithPreferences(User):
    preferences: Optional["UserPreferenceResponse"] = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds


class TokenRefreshRequest(BaseModel):
    refresh_token: str


class OAuth2PasswordRequestForm(BaseModel):
    username: str  # email
    password: str


# ============== User Preferences ==============

class UserPreferenceUpdate(BaseModel):
    experience_level: Optional[ExperienceLevel] = None
    preferred_language: Optional[str] = Field(None, max_length=10)
    personalization_enabled: Optional[bool] = None


class UserPreferenceResponse(BaseModel):
    experience_level: str
    preferred_language: str
    personalization_enabled: bool

    class Config:
        from_attributes = True


# ============== Chat Schemas ==============

class ChatMessage(BaseModel):
    role: MessageRole
    content: str
    msg_metadata: Optional[Dict[str, Any]] = None


class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    include_rag: bool = True


class TextSelectionRequest(BaseModel):
    selected_text: str = Field(..., min_length=1, max_length=5000)
    question: str = Field(..., min_length=1, max_length=1000)
    context: Optional[str] = None  # Surrounding text for better context


class ChatResponse(BaseModel):
    message: str
    conversation_id: int
    sources: Optional[List[Dict[str, Any]]] = None  # RAG sources


class ConversationResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    messages: List[ChatMessage] = []

    class Config:
        from_attributes = True


# ============== RAG & Content Schemas ==============

class ContentIngestRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    source_url: Optional[str] = None
    doc_type: str = "markdown"
    doc_metadata: Optional[Dict[str, Any]] = None


class ContentIngestResponse(BaseModel):
    id: int
    title: str
    vector_id: str
    status: str = "indexed"


class RAGQueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000)
    top_k: int = Field(default=5, ge=1, le=20)
    include_metadata: bool = True


class RAGSource(BaseModel):
    title: str
    content: str
    score: float
    source_url: Optional[str] = None
    doc_metadata: Optional[Dict[str, Any]] = None


class RAGQueryResponse(BaseModel):
    answer: str
    sources: List[RAGSource]
    query: str


# ============== Personalization Schemas ==============

class PersonalizeContentRequest(BaseModel):
    content: str = Field(..., min_length=1)
    level: Optional[ExperienceLevel] = None  # Override user's default level


class PersonalizeContentResponse(BaseModel):
    original_content: str
    personalized_content: str
    level: str


# ============== Translation Schemas ==============

class TranslateRequest(BaseModel):
    content: str = Field(..., min_length=1)


class TranslateResponse(BaseModel):
    original_content: str
    translated_content: str
    source_language: str = "en"
    target_language: str = "ur"


# Update forward references
UserWithPreferences.model_rebuild()
