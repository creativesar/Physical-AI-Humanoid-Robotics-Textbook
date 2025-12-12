import cohere
import os
from typing import List
import logging
import torch
from transformers import AutoTokenizer, AutoModel
from sentence_transformers import SentenceTransformer
import numpy as np

# Initialize Cohere client
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
if COHERE_API_KEY:
    co = cohere.Client(COHERE_API_KEY)
else:
    co = None
    logging.warning("COHERE_API_KEY not set, Cohere functionality will be disabled")

# Initialize Hugging Face model
HF_EMBEDDING_MODEL = os.getenv("HF_EMBEDDING_MODEL", "all-MiniLM-L6-v2")
hf_model = None
hf_tokenizer = None

try:
    hf_model = SentenceTransformer(HF_EMBEDDING_MODEL)
    logging.info(f"Loaded Hugging Face embedding model: {HF_EMBEDDING_MODEL}")
except Exception as e:
    logging.error(f"Error loading Hugging Face model: {str(e)}")
    # Optionally load a default model
    try:
        hf_model = SentenceTransformer("all-MiniLM-L6-v2")
        logging.info("Loaded default Hugging Face embedding model: all-MiniLM-L6-v2")
    except Exception as e2:
        logging.error(f"Error loading default Hugging Face model: {str(e2)}")
        hf_model = None

# Determine which embedding provider to use
EMBEDDING_PROVIDER = os.getenv("EMBEDDING_PROVIDER", "huggingface").lower()

async def embed_text(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for a list of texts using the configured provider
    """
    if EMBEDDING_PROVIDER == "cohere":
        if not co:
            raise ValueError("Cohere API is not configured but was requested")
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
    elif EMBEDDING_PROVIDER == "huggingface":
        if not hf_model:
            raise ValueError("Hugging Face model is not loaded but was requested")
        try:
            # Generate embeddings using Hugging Face model
            embeddings = hf_model.encode(texts)
            # Convert to list of lists if needed
            if isinstance(embeddings, np.ndarray):
                embeddings = embeddings.tolist()
            return embeddings
        except Exception as e:
            logging.error(f"Error generating embeddings with Hugging Face: {str(e)}")
            raise e
    else:
        raise ValueError(f"Unsupported embedding provider: {EMBEDDING_PROVIDER}")

async def embed_query(query: str) -> List[float]:
    """
    Generate embedding for a query using the configured provider
    """
    if EMBEDDING_PROVIDER == "cohere":
        if not co:
            raise ValueError("Cohere API is not configured but was requested")
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
    elif EMBEDDING_PROVIDER == "huggingface":
        if not hf_model:
            raise ValueError("Hugging Face model is not loaded but was requested")
        try:
            # Generate embedding for single query
            embedding = hf_model.encode([query])
            # Convert to list if needed
            if isinstance(embedding, np.ndarray):
                embedding = embedding.tolist()
            return embedding[0]  # Return first (and only) embedding
        except Exception as e:
            logging.error(f"Error generating query embedding with Hugging Face: {str(e)}")
            raise e
    else:
        raise ValueError(f"Unsupported embedding provider: {EMBEDDING_PROVIDER}")