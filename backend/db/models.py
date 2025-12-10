from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/textbook")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    profile_data = Column(JSON)  # Additional user profile information
    learning_level = Column(String)  # beginner, intermediate, advanced
    academic_background = Column(String)
    robotics_experience = Column(String)

class Module(Base):
    __tablename__ = "modules"

    module_id = Column(String, primary_key=True, index=True)  # e.g., 'module-1'
    title = Column(String)
    description = Column(Text)
    learning_objectives = Column(JSON)
    prerequisites = Column(JSON)
    estimated_duration = Column(Integer)  # in minutes
    difficulty_level = Column(String)  # beginner, intermediate, advanced
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ModuleProgress(Base):
    __tablename__ = "module_progress"

    progress_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    module_id = Column(String)
    status = Column(String)  # not_started, in_progress, completed
    completion_percentage = Column(Integer)
    time_spent = Column(Integer)  # in minutes
    last_accessed = Column(DateTime)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)

class Personalization(Base):
    __tablename__ = "personalization"

    personalization_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    setting_key = Column(String)  # e.g., 'preferred_tone', 'difficulty_level'
    setting_value = Column(String)

class Counter(Base):
    __tablename__ = "counters"

    counter_id = Column(String, primary_key=True, index=True)  # e.g., 'total_users'
    title = Column(String)
    value = Column(Integer)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Partner(Base):
    __tablename__ = "partners"

    partner_id = Column(String, primary_key=True, index=True)
    name = Column(String)
    logo_url = Column(String)
    website_url = Column(String)
    description = Column(Text)
    display_order = Column(Integer)
    is_active = Column(Boolean, default=True)

class AccessLog(Base):
    __tablename__ = "access_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)  # Null for unauthenticated access
    timestamp = Column(DateTime, default=datetime.utcnow)
    event_type = Column(String)  # query, chat_message, feedback, module_access, page_view
    module_id = Column(String, nullable=True)
    details = Column(JSON)  # Additional event details

class ChatHistory(Base):
    __tablename__ = "chat_history"

    chat_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)  # Null for anonymous chats
    timestamp = Column(DateTime, default=datetime.utcnow)
    role = Column(String)  # user or assistant
    message_content = Column(Text)
    referenced_content = Column(JSON)  # References to textbook_content.id

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()