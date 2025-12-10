from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import logging

from auth import require_auth  # Import authentication dependency
from rag.chat import chat_with_rag
from rag.embed import embed_text
from rag.ingest import ingest_documents
from rag.query import query_documents
from db.metadata import get_modules_metadata, get_counters

router = APIRouter()

# Request/Response models
class ChatRequest(BaseModel):
    user_message: str
    conversation_history: Optional[List[dict]] = []
    retrieved_context: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    status: str
    assistant_response: str
    referenced_content: Optional[List[str]] = []

class EmbedRequest(BaseModel):
    texts: List[str]

class EmbedResponse(BaseModel):
    status: str
    embeddings: List[List[float]]

class IngestRequest(BaseModel):
    source_path: str

class IngestResponse(BaseModel):
    status: str
    message: str
    documents_processed: int

class QueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5

class QueryResponse(BaseModel):
    status: str
    results: List[dict]

class ModuleMetadataResponse(BaseModel):
    status: str
    modules: List[dict]

class CountersResponse(BaseModel):
    status: str
    counters: dict

# API Endpoints
@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response = await chat_with_rag(
            user_message=request.user_message,
            conversation_history=request.conversation_history,
            retrieved_context=request.retrieved_context
        )
        return ChatResponse(
            status="success",
            assistant_response=response["assistant_response"],
            referenced_content=response.get("referenced_content", [])
        )
    except Exception as e:
        logging.error(f"Chat endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during chat")

@router.post("/embed", response_model=EmbedResponse)
async def embed_endpoint(request: EmbedRequest):
    try:
        embeddings = await embed_text(request.texts)
        return EmbedResponse(
            status="success",
            embeddings=embeddings
        )
    except Exception as e:
        logging.error(f"Embed endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during embedding")

@router.post("/ingest", response_model=IngestResponse)
async def ingest_endpoint(request: IngestRequest, user=Depends(require_auth)):
    try:
        result = await ingest_documents(request.source_path)
        return IngestResponse(
            status="success",
            message="Documents successfully ingested",
            documents_processed=result.get("documents_processed", 0)
        )
    except Exception as e:
        logging.error(f"Ingest endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during ingestion")

@router.post("/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    try:
        results = await query_documents(request.query, request.top_k)
        return QueryResponse(
            status="success",
            results=results
        )
    except Exception as e:
        logging.error(f"Query endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during query")

@router.get("/metadata/modules", response_model=ModuleMetadataResponse)
async def get_modules_endpoint():
    try:
        modules = await get_modules_metadata()
        return ModuleMetadataResponse(
            status="success",
            modules=modules
        )
    except Exception as e:
        logging.error(f"Get modules endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error retrieving modules")

@router.get("/metadata/counters", response_model=CountersResponse)
async def get_counters_endpoint():
    try:
        counters = await get_counters()
        return CountersResponse(
            status="success",
            counters=counters
        )
    except Exception as e:
        logging.error(f"Get counters endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error retrieving counters")