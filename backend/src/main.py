from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import embed, query, chat, health, feedback, user_profile, ingest, metadata
from .core.config import settings
from .database.qdrant_client import initialize_qdrant_collection

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description=settings.PROJECT_DESCRIPTION,
)

# CORS Middleware (configure as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(health.router)
app.include_router(embed.router)
app.include_router(query.router)
app.include_router(chat.router)
app.include_router(feedback.router)
app.include_router(user_profile.router)
app.include_router(ingest.router)
app.include_router(metadata.router)

@app.on_event("startup")
async def startup_event():
    # Initialize Qdrant collection if needed
    try:
        initialize_qdrant_collection()
        print("Qdrant connection established and collection initialized")
    except Exception as e:
        print(f"Warning: Could not connect to Qdrant: {e}. The app will still run but RAG features won't work until Qdrant is available.")

    print("Application startup complete.")

@app.on_event("shutdown")
async def shutdown_event():
    # Close database connections, etc.
    print("Application shutdown complete.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)