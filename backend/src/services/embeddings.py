import cohere
from typing import List

from ..core.config import settings

co = cohere.AsyncClient(settings.COHERE_API_KEY)

async def generate_embeddings(texts: List[str]) -> List[List[float]]:
    # Using Cohere's embedding API
    try:
        response = await co.embed(
            texts=texts,
            model=settings.COHERE_EMBEDDING_MODEL,
            input_type="search_query"  # or "search_document" depending on usage
        )
        return response.embeddings
    except Exception as e:
        raise Exception(f"Embedding generation failed: {e}")