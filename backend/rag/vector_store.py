from qdrant_client import QdrantClient
from qdrant_client.http import models
from typing import List, Dict, Optional
import os
import logging

# Initialize Qdrant client
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
qdrant_client = QdrantClient(url=QDRANT_URL)

# Define collection name
TEXTBOOK_COLLECTION = "textbook_content"

def get_embedding_dimension():
    """
    Determine the embedding dimension based on the configured provider
    """
    EMBEDDING_PROVIDER = os.getenv("EMBEDDING_PROVIDER", "huggingface").lower()

    # Common embedding dimensions for different models
    if EMBEDDING_PROVIDER == "cohere":
        return 1024  # Cohere's embed-english-v3.0 has 1024 dimensions
    elif EMBEDDING_PROVIDER == "huggingface":
        # Different Hugging Face models have different dimensions
        # all-MiniLM-L6-v2 has 384 dimensions
        HF_EMBEDDING_MODEL = os.getenv("HF_EMBEDDING_MODEL", "all-MiniLM-L6-v2")
        model_dims = {
            "all-MiniLM-L6-v2": 384,
            "all-mpnet-base-v2": 768,
            "multi-qa-mpnet-base-dot-v1": 768,
            "all-distilroberta-v1": 768
        }
        return model_dims.get(HF_EMBEDDING_MODEL, 384)  # Default to 384
    else:
        return 384  # Default dimension

def initialize_qdrant_collection():
    """
    Initialize the Qdrant collection for textbook content
    """
    try:
        # Check if collection exists
        collections = qdrant_client.get_collections()
        collection_names = [c.name for c in collections.collections]

        if TEXTBOOK_COLLECTION not in collection_names:
            # Create collection with appropriate vector size based on configuration
            embedding_size = get_embedding_dimension()
            qdrant_client.create_collection(
                collection_name=TEXTBOOK_COLLECTION,
                vectors_config=models.VectorParams(size=embedding_size, distance=models.Distance.COSINE)
            )

            # Create payload index for faster filtering
            qdrant_client.create_payload_index(
                collection_name=TEXTBOOK_COLLECTION,
                field_name="module",
                field_schema=models.PayloadSchemaType.KEYWORD
            )

            logging.info(f"Created Qdrant collection: {TEXTBOOK_COLLECTION} with dimension {embedding_size}")
        else:
            logging.info(f"Qdrant collection {TEXTBOOK_COLLECTION} already exists")
    except Exception as e:
        logging.error(f"Error initializing Qdrant collection: {str(e)}")
        raise e

async def store_embeddings(texts: List[str], embeddings: List[List[float]], 
                          metadata_list: List[Dict]) -> List[str]:
    """
    Store embeddings and associated metadata in Qdrant
    """
    try:
        # Prepare points for insertion
        points = []
        for i, (text, embedding, metadata) in enumerate(zip(texts, embeddings, metadata_list)):
            point = models.PointStruct(
                id=i,  # In a real implementation, use UUIDs
                vector=embedding,
                payload={
                    "text": text,
                    "module": metadata.get("module", ""),
                    "section": metadata.get("section", ""),
                    "subsection": metadata.get("subsection", "")
                }
            )
            points.append(point)
        
        # Upload points to Qdrant
        qdrant_client.upload_points(
            collection_name=TEXTBOOK_COLLECTION,
            points=points
        )
        
        # Return IDs of stored points
        return [str(point.id) for point in points]
    except Exception as e:
        logging.error(f"Error storing embeddings in Qdrant: {str(e)}")
        raise e

async def search_similar(query_embedding: List[float], top_k: int = 5, 
                        module_filter: Optional[str] = None) -> List[Dict]:
    """
    Search for similar content in Qdrant based on embedding similarity
    """
    try:
        # Prepare filters if module is specified
        filters = None
        if module_filter:
            filters = models.Filter(
                must=[
                    models.FieldCondition(
                        key="module",
                        match=models.MatchValue(value=module_filter)
                    )
                ]
            )
        
        # Perform search
        search_results = qdrant_client.search(
            collection_name=TEXTBOOK_COLLECTION,
            query_vector=query_embedding,
            query_filter=filters,
            limit=top_k
        )
        
        # Format results
        results = []
        for result in search_results:
            results.append({
                "id": str(result.id),
                "text": result.payload["text"],
                "module": result.payload["module"],
                "section": result.payload["section"],
                "score": result.score
            })
        
        return results
    except Exception as e:
        logging.error(f"Error searching in Qdrant: {str(e)}")
        raise e

async def get_content_by_id(content_id: str) -> Optional[Dict]:
    """
    Retrieve content by its ID from Qdrant
    """
    try:
        points = qdrant_client.retrieve(
            collection_name=TEXTBOOK_COLLECTION,
            ids=[content_id]
        )
        
        if points and len(points) > 0:
            point = points[0]
            return {
                "id": str(point.id),
                "text": point.payload["text"],
                "module": point.payload["module"],
                "section": point.payload["section"],
                "subsection": point.payload.get("subsection", "")
            }
        return None
    except Exception as e:
        logging.error(f"Error retrieving content by ID from Qdrant: {str(e)}")
        raise e