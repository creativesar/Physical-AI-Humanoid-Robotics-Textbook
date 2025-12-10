from typing import List, Dict
import logging

from rag.embed import embed_query
from rag.vector_store import search_similar

async def query_documents(query: str, top_k: int = 5, module_filter: str = None) -> List[Dict]:
    """
    Query the vector database to find relevant documents for a given query
    """
    try:
        # Generate embedding for the query
        query_embedding = await embed_query(query)
        
        # Search for similar content in the vector database
        results = await search_similar(query_embedding, top_k, module_filter)
        
        return results
    except Exception as e:
        logging.error(f"Error querying documents: {str(e)}")
        raise e