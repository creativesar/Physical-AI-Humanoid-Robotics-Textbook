@echo off
REM setup-environment.bat - Script to set up the Physical AI & Humanoid Robotics Textbook Platform

echo Setting up Physical AI & Humanoid Robotics Textbook Platform...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not installed or not in PATH.
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker is installed. Proceeding with setup...

REM Navigate to the ops directory
cd /d "%~dp0..\ops"

REM Build and start the services
echo Building and starting services...
docker-compose up --build -d

echo Services are starting. Waiting for initialization...
timeout /t 10 /nobreak >nul

REM Check if services are running
echo Checking running services...
docker-compose ps

echo.
echo Setup completed! The services should now be running:
echo. - Frontend: http://localhost:3000
echo. - Backend: http://localhost:8000
echo. - PostgreSQL: localhost:5432
echo. - Qdrant: http://localhost:6333

echo.
echo To view logs: docker-compose logs
echo To stop services: docker-compose down

pause