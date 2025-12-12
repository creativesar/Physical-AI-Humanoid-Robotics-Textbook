---
title: Physical AI Humanoid Robotics Backend
emoji: 🤖
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# Physical AI & Humanoid Robotics Textbook - Backend API

This is the FastAPI backend for the Physical AI & Humanoid Robotics Textbook platform.

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /api/v1/chat` - RAG chatbot endpoint

## Environment Variables (Set in Space Settings > Variables and secrets)

Required:
- `COHERE_API_KEY` - Your Cohere API key for LLM
- `QDRANT_URL` - Qdrant vector database URL
- `QDRANT_API_KEY` - Qdrant API key
- `DATABASE_URL` - PostgreSQL connection string (optional)

## Usage

Once deployed, the API will be available at:
```
https://creativesar-physical-ai-humanoid-robotics-textbook.hf.space
```

Frontend chatbot should use this URL as `REACT_APP_BACKEND_URL`.