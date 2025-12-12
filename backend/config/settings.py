from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    # App settings
    APP_NAME: str = "Physical AI & Humanoid Robotics Textbook API"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # API settings
    API_V1_STR: str = "/v1"
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database settings
    DATABASE_URL: str
    QDRANT_URL: str
    QDRANT_API_KEY: Optional[str] = None
    
    # AI settings
    COHERE_API_KEY: str
    
    # Frontend URL for CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"


settings = Settings()