import cohere
from typing import List, Dict, Any, Tuple

from ..core.config import settings
from ..database.qdrant_client import get_qdrant_client, query_collection
from ..services.embeddings import generate_embeddings
from ..services.context_builder import format_context_for_llm, build_llm_prompt

co = cohere.Client(settings.COHERE_API_KEY)

async def process_chat_query(
    user_message: str,
    chat_history: List[Dict[str, str]] = None,
    selected_text: str = None,
    user_id: str = None
) -> Tuple[str, List[Dict[str, Any]]]:
    """
    Main function to process a chat query using RAG.
    """
    if chat_history is None:
        chat_history = []

    # Step 1: Retrieve relevant context from Qdrant
    context_chunks, sources = await retrieve_context(user_message)

    # Step 2: Format the context for the LLM
    formatted_context = format_context_for_llm(context_chunks)

    # Step 3: Build the full prompt with context, history, and user query
    full_prompt = build_llm_prompt(
        user_message=user_message,
        context=formatted_context,
        chat_history=chat_history,
        selected_text=selected_text
    )

    # Step 4: Generate response using the LLM
    response = await generate_llm_response(full_prompt)

    # Optionally log the interaction to the database
    if user_id:
        await log_chat_interaction(user_message, response, user_id)

    return response, sources

async def retrieve_context(query: str, top_k: int = 5) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    """
    Retrieve relevant context from the Qdrant vector database.
    """
    # Generate embedding for the query
    query_embeddings = await generate_embeddings([query])
    query_vector = query_embeddings[0]

    # Query Qdrant for similar chunks
    search_results = query_collection(query_vector, limit=top_k)

    context_chunks = []
    sources = []

    for hit in search_results:
        payload = hit.payload or {}
        context_chunks.append({
            'text': payload.get("text", ""),
            'chapter': payload.get("chapter", ""),
            'section': payload.get("section", ""),
        })

        sources.append({
            'id': hit.id,
            'chapter': payload.get("chapter", ""),
            'section': payload.get("section", ""),
            'score': hit.score
        })

    return context_chunks, sources

async def generate_llm_response(prompt: str) -> str:
    """
    Generate a response from the LLM based on the prompt.
    """
    try:
        response = co.generate(
            model=settings.COHERE_CHAT_MODEL,
            prompt=prompt,
            max_tokens=1024,
            temperature=0.7,
        )

        return response.generations[0].text
    except Exception as e:
        # Fallback response if LLM fails
        return f"Sorry, I encountered an error processing your request: {str(e)}"

async def log_chat_interaction(user_message: str, ai_response: str, user_id: str):
    """
    Log the chat interaction to the database for analytics and improvement.
    """
    # Implementation would require database access and ChatMessage model
    # This is a placeholder for the actual implementation
    pass