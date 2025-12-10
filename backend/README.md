# Physical AI & Humanoid Robotics Textbook - Backend

This is the FastAPI-based backend for the Physical AI & Humanoid Robotics Textbook project. It provides a RAG (Retrieval-Augmented Generation) chatbot, user authentication, and data persistence services.

## Features

- **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python
- **RAG System**: Retrieval-Augmented Generation for AI-powered textbook Q&A
- **Qdrant Integration**: Vector database for semantic search and similarity matching
- **PostgreSQL Integration**: Relational database for user data and content management
- **Google Gemini**: LLM integration for conversational AI
- **Authentication**: User authentication and profile management
- **API Endpoints**:
  - `/health`: Health check endpoint
  - `/chat`: RAG-powered chat endpoint
  - `/embed`: Text embedding endpoint
  - `/query`: Textbook content search endpoint
  - `/feedback`: User feedback endpoint
  - `/user-profile`: User profile management

## Requirements

- Python 3.10+
- Google Gemini API key
- Qdrant Cloud account or self-hosted instance
- PostgreSQL database (Neon Serverless recommended)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   # On Windows
   .venv\Scripts\activate
   # On Linux/macOS
   source .venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables in the `.env` file:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `QDRANT_URL`: Your Qdrant Cloud URL or local instance
   - `QDRANT_API_KEY`: Your Qdrant API key
   - `DATABASE_URL`: Your PostgreSQL database URL

## Running the Application

To run the backend locally:

```bash
cd backend
python -m src.main
```

Or using uvicorn directly:

```bash
cd backend
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

## API Documentation

Interactive API documentation is automatically available at:
- `http://localhost:8000/docs` (Swagger UI)
- `http://localhost:8000/redoc` (ReDoc)

## Services Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │───▶│   FastAPI        │───▶│  Google Gemini  │
│   (Docusaurus)  │    │   Backend        │    │   (LLM)         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                            │    │
                            │    ▼
                            │ ┌──────────────┐
                            │ │   Qdrant     │
                            │ │ (Vector DB)  │
                            │ └──────────────┘
                            ▼
                       ┌─────────────────┐
                       │   PostgreSQL    │
                       │  (Relational   │
                       │   Database)     │
                       └─────────────────┘
```

The system implements a RAG (Retrieval-Augmented Generation) pipeline where user queries are matched against textbook content using vector similarity search, and the most relevant content is passed to the LLM to generate contextual responses.