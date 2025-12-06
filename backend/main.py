from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from src.api import auth, chat, ingest, rag, personalize, translate, embed
from src.database import engine, Base
from src.config import settings

# Create database tables (sync for simplicity, use migrations in production)
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events."""
    # Startup: could initialize things here
    yield
    # Shutdown: could clean up things here

app = FastAPI(
    title="Physical AI & Humanoid Robotics Textbook Backend",
    description="API for AI-native textbook with RAG, Personalization, and Translation",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",  # Vite default
    "https://physical-ai-textbook.vercel.app",  # Example production URL
    "*"  # Allow all for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/chat", tags=["Chat & AI"])
app.include_router(rag.router, prefix="/rag", tags=["RAG & Search"])
app.include_router(ingest.router, prefix="/ingest", tags=["Content Ingestion"])
app.include_router(personalize.router, prefix="/personalize", tags=["Personalization"])
app.include_router(translate.router, prefix="/translate", tags=["Translation"])
# Keep raw embed router for backward compatibility if needed, or deprecate
app.include_router(embed.router, prefix="/embed", tags=["Embeddings (Legacy)"])

@app.get("/")
async def root():
    return {
        "message": "Physical AI & Humanoid Robotics Textbook Backend API",
        "docs": "/docs",
        "features": {
            "rag": settings.enable_rag,
            "translation": settings.enable_translation,
            "personalization": settings.enable_personalization
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "database": "connected"  # Ideally check actual connection
    }
