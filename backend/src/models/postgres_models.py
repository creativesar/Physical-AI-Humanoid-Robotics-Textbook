from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.sql import func
from ..database.postgres_client import Base

class UserProfile(Base):
    __tablename__ = "user_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)  # This would be the Better Auth user ID
    preferences = Column(Text)  # JSON string for user preferences
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # Better Auth user ID
    chat_session_id = Column(String, index=True)
    role = Column(String)  # 'user' or 'assistant'
    content = Column(Text)
    timestamp = Column(DateTime, default=func.now())

class FeedbackLog(Base):
    __tablename__ = "feedback_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # Better Auth user ID
    query = Column(Text)
    response = Column(Text)
    is_helpful = Column(Boolean)
    comments = Column(Text)
    rating = Column(Integer)  # 1-5 scale
    created_at = Column(DateTime, default=func.now())

class TextbookChunk(Base):
    __tablename__ = "textbook_chunks"

    id = Column(Integer, primary_key=True, index=True)
    hash = Column(String, unique=True, index=True)  # To avoid duplicates
    chapter = Column(String, index=True)
    section = Column(String, index=True)
    content = Column(Text)
    token_count = Column(Integer)
    embedding_vector_id = Column(String)  # Reference to Qdrant ID
    created_at = Column(DateTime, default=func.now())

class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

class Counter(Base):
    __tablename__ = "counters"

    name = Column(String(100), primary_key=True)  # Counter name (e.g. 'modules_count', 'chapters_count')
    value = Column(Integer, default=0)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

class ChatLog(Base):
    __tablename__ = "chat_logs"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100))
    user_message = Column(Text)
    bot_response = Column(Text)
    timestamp = Column(DateTime, default=func.now())