# Physical AI & Humanoid Robotics Textbook Backend

This backend serves the Physical AI & Humanoid Robotics Textbook platform, providing RAG (Retrieval-Augmented Generation) functionality using either Cohere or Hugging Face models.

## Features

- RAG functionality with vector storage in Qdrant
- Support for both Cohere and Hugging Face models
- API endpoints for embedding, querying, and chatting
- Metadata management for textbook modules and counters

## Architecture

```
Frontend (Docusaurus) 
    ↓ (API calls)
FastAPI Backend 
    ↓ (Embeddings & Storage)
Qdrant Vector Database
    ↓ (Textbook Content)
PostgreSQL (Metadata)
```

## Hugging Face Integration

This backend now supports both Cohere and Hugging Face models for:
1. **Embedding Generation**: Creating vector representations of text content
2. **Text Generation**: Generating responses to user queries

### Configuration

You can configure which provider to use for each function through environment variables:

- `EMBEDDING_PROVIDER`: Either "cohere" or "huggingface" (default: huggingface)
- `GENERATION_PROVIDER`: Either "cohere" or "huggingface" (default: cohere)
- `HF_EMBEDDING_MODEL`: Hugging Face model for embeddings (default: all-MiniLM-L6-v2)
- `HF_GENERATION_MODEL`: Hugging Face model for text generation (default: microsoft/DialoGPT-medium)

## API Endpoints

- `GET /`: Health check
- `GET /health`: Health check
- `POST /api/v1/chat`: Chat with RAG
- `POST /api/v1/embed`: Generate embeddings
- `POST /api/v1/ingest`: Ingest documents
- `POST /api/v1/query`: Query documents
- `GET /api/v1/metadata/modules`: Get module metadata
- `GET /api/v1/metadata/counters`: Get platform counters

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

## Environment Variables

- `PORT`: Port to run the server on (default: 8000)
- `QDRANT_URL`: URL for Qdrant vector database (default: http://localhost:6333)
- `COHERE_API_KEY`: Your Cohere API key (optional if using Hugging Face)
- `HF_EMBEDDING_MODEL`: Hugging Face model for embeddings
- `HF_GENERATION_MODEL`: Hugging Face model for text generation
- `EMBEDDING_PROVIDER`: Provider for embeddings ("cohere" or "huggingface")
- `GENERATION_PROVIDER`: Provider for generation ("cohere" or "huggingface")
- `DATABASE_URL`: PostgreSQL database URL
- `AUTH_SECRET`: Secret for authentication