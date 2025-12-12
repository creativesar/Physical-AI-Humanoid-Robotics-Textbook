from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from api import embed, query, chat, metadata
from auth.routes import router as auth_router
from config.settings import settings

app = FastAPI(
    title="Physical AI & Humanoid Robotics Textbook API",
    description="Backend API for the Physical AI & Humanoid Robotics Textbook Platform",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(embed.router, prefix="/embed", tags=["embed"])
app.include_router(query.router, prefix="/query", tags=["query"])
app.include_router(chat.router, prefix="/api/v1", tags=["chat"])
app.include_router(metadata.router, prefix="/metadata", tags=["metadata"])

@app.get("/")
async def root():
    return {"message": "Physical AI & Humanoid Robotics Textbook API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )