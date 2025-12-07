from typing import List
import numpy as np
import hashlib

def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for texts. Since Gemini API doesn't have standalone embeddings,
    we'll use a simple hash-based approach for this demo. In production, you would use
    a proper embedding model or OpenAI's embedding API.
    """
    embeddings = []
    for text in texts:
        # Simple hash-based embedding (not semantically meaningful, for demo purposes)
        # In production, use text-embedding-004 or OpenAI's embeddings
        text_hash = hashlib.sha256(text.encode()).hexdigest()
        # Convert hex to vector
        vector = []
        for i in range(0, len(text_hash), 2):
            vector.append(int(text_hash[i:i+2], 16) / 255.0)  # Normalize to 0-1
        
        # Pad or truncate to 768 dimensions (typical for many embedding models)
        while len(vector) < 768:
            vector.append(0.0)
        vector = vector[:768]
        
        embeddings.append(vector)
    
    return embeddings