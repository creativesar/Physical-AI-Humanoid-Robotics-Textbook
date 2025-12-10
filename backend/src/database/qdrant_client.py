from qdrant_client import QdrantClient
from qdrant_client.http import models
from typing import List, Dict, Any
import uuid

from ..core.config import settings

def get_qdrant_client():
    return QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY,
    )

def initialize_qdrant_collection():
    try:
        client = get_qdrant_client()

        # Check if collection exists, if not create it
        try:
            client.get_collection(settings.QDRANT_COLLECTION_NAME)
            print(f"Collection {settings.QDRANT_COLLECTION_NAME} already exists")
        except:
            print(f"Creating collection {settings.QDRANT_COLLECTION_NAME}")
            client.create_collection(
                collection_name=settings.QDRANT_COLLECTION_NAME,
                vectors_config=models.VectorParams(size=768, distance=models.Distance.COSINE),  # Adjust size based on embedding model
            )
    except Exception as e:
        # If initialization fails, we just print a warning and continue
        print(f"Warning: Could not initialize Qdrant collection: {e}")

def upsert_points_to_qdrant(
    texts: List[str],
    embeddings: List[List[float]],
    metadatas: List[Dict[str, Any]]
):
    client = get_qdrant_client()

    # Generate unique IDs for the points
    ids = [str(uuid.uuid4()) for _ in range(len(texts))]

    # Prepare the points
    points = []
    for i, (text, embedding, metadata) in enumerate(zip(texts, embeddings, metadatas)):
        points.append(
            models.PointStruct(
                id=ids[i],
                vector=embedding,
                payload={
                    "text": text,
                    **metadata  # Include additional metadata like chapter, section, etc.
                }
            )
        )

    # Upsert the points
    client.upsert(
        collection_name=settings.QDRANT_COLLECTION_NAME,
        points=points
    )

    return ids

def query_collection(query_vector: List[float], limit: int = 5):
    client = get_qdrant_client()

    search_result = client.search(
        collection_name=settings.QDRANT_COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit
    )

    return search_result