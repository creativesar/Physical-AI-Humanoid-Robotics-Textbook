# Physical AI & Humanoid Robotics Textbook Backend

This backend serves the Physical AI & Humanoid Robotics Textbook platform, providing RAG (Retrieval-Augmented Generation) functionality using Cohere models.

## Features

- RAG functionality with vector storage in Qdrant
- Support for Cohere models
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

## Setup

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
7. Run the server: `python main.py`

## Configuration

The application requires several environment variables to be set. See `.env.example` for a template of all required variables.

You can configure the application through environment variables:

- `SECRET_KEY`: Secret key for JWT token generation
- `COHERE_API_KEY`: Your Cohere API key
- `QDRANT_URL`: URL for Qdrant vector database
- `QDRANT_API_KEY`: API key for Qdrant
- `DATABASE_URL`: PostgreSQL database URL
- `BETTER_AUTH_API_URL`: URL for Better Auth integration (optional)
- `FRONTEND_PATH`: Path to frontend directory for ingestion
- `BACKEND_CORS_ORIGINS`: CORS origins (JSON array format)

## API Endpoints

The backend exposes several API endpoints:

- `POST /api/v1/chat` - Chat with the RAG system
- `POST /api/v1/embed` - Generate embeddings for text
- `POST /api/v1/ingest` - Ingest documents into the vector database
- `POST /api/v1/query` - Query the vector database
- `GET /api/v1/metadata/modules` - Get textbook module metadata
- `GET /api/v1/metadata/counters` - Get platform counters

Example usage:
```bash
curl -X POST "http://localhost:8000/api/v1/chat" \
  -H "Content-Type: application/json" \
  -d '{"user_message": "What is SLAM in robotics?"}'
```

## Running with Docker

To run the backend using Docker:

1. Build the image: `docker build -t physical-ai-backend .`
2. Run the container: `docker run -p 8000:8000 physical-ai-backend`

## Environment Variables

- `PORT`: Port to run the server on (default: 8000)
- `COHERE_API_KEY`: Your Cohere API key
- `DATABASE_URL`: PostgreSQL database URL
- `AUTH_SECRET`: Secret for authentication