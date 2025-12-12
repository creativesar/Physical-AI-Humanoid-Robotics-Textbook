# Dockerfile for Backend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port 7860 (default for HF Spaces)
EXPOSE 7860

# Run the application - use shell form to properly expand PORT variable
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}