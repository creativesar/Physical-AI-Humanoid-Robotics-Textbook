# Physical AI & Humanoid Robotics Textbook Backend

This backend provides API services for the Physical AI & Humanoid Robotics Textbook platform, featuring a RAG-based chatbot using Cohere and Qdrant.

## Features

- **Authentication System**: Secure login and registration using JWT tokens
- **RAG Chatbot**: Retrieval-Augmented Generation chatbot with textbook knowledge
- **Content Management**: Endpoints for embedding and querying textbook content
- **User Management**: Profiles, progress tracking, and personalization

## Prerequisites

- Python 3.9+
- PostgreSQL database (or compatible connection)
- Qdrant vector database
- Cohere API key

## Installation

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate.bat`
   - On macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables in `.env`:
   - `DATABASE_URL`: PostgreSQL connection string
   - `QDRANT_URL`: Qdrant service URL
   - `QDRANT_API_KEY`: Qdrant API key
   - `COHERE_API_KEY`: Cohere API key
   - `SECRET_KEY`: Secret key for JWT signing

## Running the Server

Start the backend server with:

```bash
python run_server.py
```

Or directly with uvicorn:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000` by default.

## API Endpoints

- `POST /auth/token` - User authentication
- `POST /auth/register` - User registration
- `POST /api/v1/chat` - Chat with the RAG bot
- `POST /query` - Query the knowledge base
- `POST /embed` - Create embeddings for content
- `GET /metadata/modules` - Get textbook modules
- `GET /metadata/counters` - Get platform statistics

## Frontend Integration

The backend is designed to work with the Docusaurus frontend located in the `../frontend` directory. The chatbot component is already integrated and will connect to the backend API.

## Security

This implementation includes:
- JWT-based authentication for API endpoints
- Password hashing using bcrypt
- Input validation using Pydantic
- Secure token handling

## Architecture

The backend follows these principles:
- FastAPI for modern Python web development
- SQLAlchemy for database ORM
- Cohere for LLM and embedding generation
- Qdrant for vector storage and similarity search
- JWT for stateless authentication