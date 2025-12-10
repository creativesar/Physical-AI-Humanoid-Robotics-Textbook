#!/bin/bash
# setup-environment.sh - Script to set up the Physical AI & Humanoid Robotics Textbook Platform

echo "Setting up Physical AI & Humanoid Robotics Textbook Platform..."

# Check if Docker is installed
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: Docker is not installed or not in PATH." >&2
  echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
  exit 1
fi

# Check if Docker Compose is available
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "Error: Docker Compose is not available." >&2
  exit 1
fi

echo "Docker is installed. Proceeding with setup..."

# Navigate to the ops directory
cd "$(dirname "$0")/../ops" || exit

# Build and start the services
echo "Building and starting services..."
docker-compose up --build -d

echo "Services are starting. Waiting for initialization..."

# Wait a bit for services to start
sleep 10

# Check if services are running
echo "Checking running services..."
docker-compose ps

echo ""
echo "Setup completed! The services should now be running:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:8000"
echo "- PostgreSQL: localhost:5432"
echo "- Qdrant: http://localhost:6333"

echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop services: docker-compose down"