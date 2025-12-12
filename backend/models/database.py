from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    user_id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    last_login = Column(DateTime, onupdate=func.now())
    profile_data = Column(JSON)
    learning_level = Column(String)
    academic_background = Column(String)
    robotics_experience = Column(String)


class Module(Base):
    __tablename__ = "modules"

    module_id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    learning_objectives = Column(JSON)
    prerequisites = Column(JSON)
    estimated_duration = Column(Integer)  # in minutes
    difficulty_level = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class ModuleProgress(Base):
    __tablename__ = "module_progress"

    progress_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    module_id = Column(String, index=True)
    status = Column(String)  # not_started, in_progress, completed
    completion_percentage = Column(Integer)
    time_spent = Column(Integer)  # in minutes
    last_accessed = Column(DateTime)
    started_at = Column(DateTime)
    completed_at = Column(DateTime)


class Personalization(Base):
    __tablename__ = "personalization"

    personalization_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    setting_key = Column(String)
    setting_value = Column(String)


class Counter(Base):
    __tablename__ = "counters"

    counter_id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    value = Column(Integer, default=0)
    updated_at = Column(DateTime, onupdate=func.now())


class Partner(Base):
    __tablename__ = "partners"

    partner_id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    logo_url = Column(String)
    website_url = Column(String)
    description = Column(Text)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)


class AccessLog(Base):
    __tablename__ = "access_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # nullable for anonymous access
    timestamp = Column(DateTime, server_default=func.now())
    event_type = Column(String)
    module_id = Column(String)
    details = Column(JSON)


class ChatHistory(Base):
    __tablename__ = "chat_history"

    chat_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # nullable for anonymous chats
    timestamp = Column(DateTime, server_default=func.now())
    role = Column(String)  # user or assistant
    message_content = Column(Text)
    referenced_content = Column(JSON)  # references to textbook_content.id