import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    PROJECT_NAME: str = "Physical AI & Humanoid Robotics RAG Backend"
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_DESCRIPTION: str = "FastAPI backend for RAG chatbot in Physical AI textbook."

    # Secret key for JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    # Better Auth integration
    BETTER_AUTH_API_URL: str = ""  # URL of the Better Auth backend

    # Cohere
    COHERE_API_KEY: str
    COHERE_EMBEDDING_MODEL: str = "embed-multilingual-v3.0"  # Cohere's embedding model
    COHERE_CHAT_MODEL: str = "command-r-plus" # Or other available Cohere models

    # Qdrant
    QDRANT_URL: str
    QDRANT_API_KEY: str
    QDRANT_COLLECTION_NAME: str = "textbook_vectors"  # Updated to match implementation guide

    # Postgres
    DATABASE_URL: str

    # Frontend path for ingestion
    FRONTEND_PATH: str = "../../../frontend"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"] # Adjust for production

settings = Settings()