# Deploying to Hugging Face Spaces

This guide explains how to deploy the Physical AI & Humanoid Robotics Textbook backend to Hugging Face Spaces.

## Prerequisites

1. A Hugging Face account
2. Access to the `creativesar` organization on Hugging Face (or your own account)
3. Required API keys and service credentials
4. Git installed on your system

## Deployment Steps

### 1. Create a New Space

1. Go to https://huggingface.co/spaces/new
2. Select the "creativesar" organization (or your personal account)
3. Enter a space name (e.g., "physical-ai-humanoid-robotics-textbook-backend")
4. Choose "Docker" as the SDK
5. Click "Create Space"

### 2. Configure the Space

1. In your newly created Space, go to "Files" and upload all the backend files:
   - All Python files (`.py`)
   - `requirements.txt`
   - `Dockerfile`
   - `.env.example`
   - Any other necessary files

2. Alternatively, you can connect your Space to a Git repository:
   - Go to "Settings" tab
   - Under "Repository", click "Connect a repository"
   - Enter your repository URL

### 3. Set Environment Variables

1. Go to the "Settings" tab of your Space
2. Scroll down to "Environment Variables"
3. Add the following variables:
   - `SECRET_KEY`: A secure secret key for JWT token generation
   - `COHERE_API_KEY`: Your Cohere API key
   - `QDRANT_URL`: URL to your Qdrant instance
   - `QDRANT_API_KEY`: API key for your Qdrant instance
   - `DATABASE_URL`: Connection string to your PostgreSQL database
   - Any other required environment variables

### 4. Build and Deploy

1. Once you've uploaded files or connected a repository, the Space will automatically start building
2. You can monitor the build process in the "Logs" tab
3. After successful build, your application will be available at the Space URL

## Automated Deployment Script

The backend includes a helper script `deploy_to_hf.py` that can automate the deployment process:

1. Navigate to the backend directory
2. Run the script: `python deploy_to_hf.py`
3. Follow the prompts to either create a new Space or deploy to an existing one

Note: The script will automatically install the required dependencies if they're not already installed.

## Configuration Notes

- The application listens on the port specified by the `PORT` environment variable, which is automatically set by Hugging Face Spaces
- Make sure your Qdrant and PostgreSQL services are accessible from the Space
- For production use, consider setting appropriate CORS origins instead of allowing all origins

## Troubleshooting

- Check the logs in the "Logs" tab for any errors during build or runtime
- Ensure all required environment variables are set
- Verify that external services (Qdrant, PostgreSQL) are accessible
- If the build fails due to missing dependencies, make sure all required packages are listed in `requirements.txt`