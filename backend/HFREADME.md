# Physical AI & Humanoid Robotics Textbook Backend

This is the backend service for the Physical AI & Humanoid Robotics Textbook platform, designed to run on Hugging Face Spaces.

## Deployment Instructions

1. Create a new Space on Hugging Face with the following settings:
   - SDK: Docker
   - Hardware: CPU or GPU (depending on your needs)

2. The Space will automatically use the provided Dockerfile to build and run the application.

3. Set the following environment variables in your Space secrets:
   - `COHERE_API_KEY`: Your Cohere API key
   - `QDRANT_URL`: URL to your Qdrant instance
   - `DATABASE_URL`: Connection string to your PostgreSQL database

## Configuration

The application is configured to run on the port specified by the `PORT` environment variable, which is automatically set by Hugging Face Spaces.

## API Endpoints

Once deployed, the API will be available at the Space URL with the following endpoints:
- `/` - Health check and welcome message
- `/health` - Health status
- `/api/v1/*` - All API endpoints as documented in the main README

## Requirements

All dependencies are specified in `requirements.txt` and will be automatically installed during the Docker build process.