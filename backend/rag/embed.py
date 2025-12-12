import cohere
import os
from typing import List
import logging

# Initialize Cohere client
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
if COHERE_API_KEY:
    co = cohere.Client(COHERE_API_KEY)
else:
    co = None
    logging.warning("COHERE_API_KEY not set, Cohere functionality will be disabled")

async def embed_text(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for a list of texts using Cohere
    """
    if not co:
        raise ValueError("Cohere API is not configured")
    try:
        response = co.embed(
            texts=texts,
            model='embed-english-v3.0',  # Using Cohere's latest embedding model
            input_type="search_document"  # Appropriate for document search
        )
        return response.embeddings
    except Exception as e:
        logging.error(f"Error generating embeddings with Cohere: {str(e)}")
        raise e

async def embed_query(query: str) -> List[float]:
    """
    Generate embedding for a query using Cohere
    """
    if not co:
        raise ValueError("Cohere API is not configured")
    try:
        response = co.embed(
            texts=[query],
            model='embed-english-v3.0',
            input_type="search_query"  # Appropriate for search queries
        )
        return response.embeddings[0]  # Return first (and only) embedding
    except Exception as e:
        logging.error(f"Error generating query embedding with Cohere: {str(e)}")
        raise e
