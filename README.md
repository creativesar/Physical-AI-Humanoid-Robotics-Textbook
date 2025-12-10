# Physical AI & Humanoid Robotics Textbook Platform

This platform provides an interactive textbook on Physical AI and Humanoid Robotics with an AI-powered chatbot for enhanced learning.

## Architecture

- **Frontend**: Docusaurus-based textbook with TypeScript and TailwindCSS
- **Backend**: FastAPI with PostgreSQL and Qdrant vector database
- **AI Integration**: Cohere embeddings and Google Gemini for reasoning
- **Authentication**: Better Auth system

## Tech Stack

- Frontend: Docusaurus, React, TypeScript, TailwindCSS, Framer Motion
- Backend: FastAPI, Python, PostgreSQL, Qdrant
- AI: Cohere API for embeddings, Google Gemini for reasoning
- Deployment: Docker, docker-compose

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```bash
COHERE_API_KEY=your_cohere_api_key
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://user:password@localhost/dbname
QDRANT_URL=http://localhost:6333
AUTH_SECRET=your_auth_secret_key
```

## Local Development

1. Clone the repository
2. Set up environment variables
3. Start services with Docker Compose:

```bash
docker-compose up --build
```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:8000`.

## API Endpoints

- `POST /api/v1/chat` - Chat with the textbook assistant
- `POST /api/v1/embed` - Generate embeddings for text
- `POST /api/v1/ingest` - Ingest textbook content (requires auth)
- `POST /api/v1/query` - Query textbook content
- `GET /api/v1/metadata/modules` - Get textbook module metadata
- `GET /api/v1/metadata/counters` - Get platform statistics

## Deployment

The platform can be deployed to:
- Frontend: Vercel or Netlify
- Backend: Railway, Render, or any cloud provider supporting Docker

## Project Structure

```
Physical-AI-Humanoid-Robotics-Textbook/
├── backend/          # FastAPI backend
├── frontend/         # Docusaurus frontend
├── docs/             # Textbook content (19 modules)
├── docker-compose.yml # Docker configuration
└── README.md
```