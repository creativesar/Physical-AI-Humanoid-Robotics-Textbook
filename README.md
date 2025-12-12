# Physical AI & Humanoid Robotics Textbook

This repository contains the code and content for the Physical AI & Humanoid Robotics Textbook platform.

## Platform Overview

This educational platform provides comprehensive resources for learning about Physical AI and humanoid robotics, including:

- Interactive textbook content
- RAG-powered chatbot for Q&A
- Code examples and exercises
- Simulation environments

## Technical Architecture

- **Frontend**: Docusaurus with React
- **Backend**: FastAPI with RAG pipeline
- **AI Services**: Cohere models
- **Vector Store**: Qdrant
- **Database**: PostgreSQL

## Setup

1. Clone the repository
2. Install dependencies for both frontend and backend
3. Configure environment variables
4. Run the services

For detailed setup instructions, please refer to the main project documentation.

## Hugging Face Integration

This project can be deployed to Hugging Face Spaces and models/datasets can be uploaded to Hugging Face Hub.

### Deploying Backend to Hugging Face Spaces

1. Navigate to the backend directory
2. Run the deployment script: `python deploy_to_hf.py`
3. Follow the prompts to create a new Space or deploy to an existing one

### Uploading Models/Datasets to Hugging Face

1. Run the upload script: `python upload_to_hf.py`
2. Follow the prompts to upload your model, dataset, or both

For detailed instructions, see:
- [Hugging Face Deployment Guide](HUGGINGFACE_DEPLOYMENT.md)
- [Hugging Face Upload Instructions](HF_UPLOAD_INSTRUCTIONS.md)