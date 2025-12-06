from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database - Neon Serverless Postgres
    database_url: str
    
    # Authentication
    secret_key: str
    jwt_refresh_secret: str = ""  # Will use secret_key if not set
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    
    # OpenAI - Agents SDK
    openai_api_key: str = ""
    openai_model: str = "gpt-4o"
    openai_embedding_model: str = "text-embedding-3-small"
    
    # Qdrant Cloud - Vector Database
    qdrant_url: str = ""
    qdrant_api_key: str = ""
    qdrant_collection_name: str = "textbook_content"
    
    # Feature flags
    enable_rag: bool = True
    enable_translation: bool = True
    enable_personalization: bool = True
    
    @property
    def refresh_secret(self) -> str:
        """Return refresh secret, falling back to main secret if not set."""
        return self.jwt_refresh_secret or self.secret_key

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
