import pytest
from fastapi.testclient import TestClient
from src.main import app

def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok", "message": "FastAPI is running!"}

if __name__ == "__main__":
    test_health_endpoint()
    print("All tests passed!")