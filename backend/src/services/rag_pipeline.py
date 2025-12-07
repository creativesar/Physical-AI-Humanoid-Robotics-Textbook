from typing import List, Dict, Any
from .qdrant_service import qdrant_service
from .gemini_service import gemini_service
from ..config import settings
from .. import models  # For chat history typing

async def retrieve_context(query_text: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """Retrieves relevant chunks from Qdrant based on query."""
    return await qdrant_service.search(query_text, top_k=top_k)

def format_context_for_llm(context: List[Dict[str, Any]]) -> str:
    """Formats retrieved context into a string for the LLM."""
    formatted_context = []
    for i, chunk in enumerate(context):
        formatted_context.append(f"--- Textbook Reference {i+1} (Title: {chunk.get('title', '')}) ---")
        formatted_context.append(chunk.get('content', ''))
        formatted_context.append("\n")
    return "\n".join(formatted_context)

async def process_chat_query(user_message: str, conversation_history: List[Dict[str, str]], selected_text: str | None = None) -> (str, List[Dict[str, Any]]):
    """Orchestrates the RAG pipeline."""

    # 1. Retrieve context
    # If selected_text is provided, use it to augment the query for better retrieval
    retrieval_query = f"{user_message} {selected_text}" if selected_text else user_message
    context_chunks = await retrieve_context(retrieval_query)

    # 2. Format context
    formatted_context = format_context_for_llm(context_chunks)

    # 3. Get LLM response using the gemini service
    ai_response = await gemini_service.chat(
        message=user_message,
        conversation_history=conversation_history,
        rag_context=formatted_context
    )

    # Extract sources from context_chunks for the response
    sources = [{"title": c.get("title"), "score": c.get("score"), "source_url": c.get("source_url")}
               for c in context_chunks if c.get("title")]

    return ai_response, sources