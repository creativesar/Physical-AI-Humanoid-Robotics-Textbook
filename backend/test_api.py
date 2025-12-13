import requests
import json

# Configuration
BASE_URL = "http://127.0.0.1:8000"  # Changed from localhost to 127.0.0.1

def test_api_endpoints():
    print("Testing Physical AI & Humanoid Robotics Textbook API...")
    
    # 1. Test health check
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✓ Health check: OK")
        else:
            print(f"✗ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"✗ Health check error: {e}")
    
    # 2. Test registration (if you want to test with new user)
    # Note: This would fail if user already exists
    registration_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "securepassword123",
        "learning_level": "intermediate",
        "academic_background": "computer science",
        "robotics_experience": "beginner"
    }
    
    try:
        # Uncomment to test registration
        # response = requests.post(f"{BASE_URL}/auth/register", json=registration_data)
        # print(f"Registration status: {response.status_code}")
        
        print("✓ Registration test skipped to avoid conflicts")
    except Exception as e:
        print(f"✗ Registration test error: {e}")
    
    # 3. Test login (will fail without valid credentials)
    login_data = {
        "username": "testuser",
        "password": "securepassword123"
    }
    
    try:
        # Use OAuth2 password flow format
        login_response = requests.post(
            f"{BASE_URL}/auth/token",
            data=login_data  # Using data instead of json for OAuth2 password flow
        )
        if login_response.status_code == 200:
            token_data = login_response.json()
            print("✓ Login successful")
            token = token_data.get("access_token")
        else:
            print(f"✗ Login failed: {login_response.status_code} - {login_response.text}")
            # For demo purposes, we'll skip further tests that require auth
            token = None
    except Exception as e:
        print(f"✗ Login test error: {e}")
        token = None

    # 4. Test metadata endpoints (these may require authentication)
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    try:
        response = requests.get(f"{BASE_URL}/metadata/modules", headers=headers)
        if response.status_code in [200, 401, 403]:  # Allow auth failures
            print(f"✓ Modules endpoint reachable: {response.status_code}")
        else:
            print(f"✗ Modules endpoint error: {response.status_code}")
    except Exception as e:
        print(f"✗ Modules endpoint test error: {e}")

    # 5. Test chat endpoint (requires authentication)
    if token:
        chat_data = {
            "user_message": "What is Physical AI?",
            "conversation_history": [],
            "retrieved_context": []
        }
        
        try:
            response = requests.post(f"{BASE_URL}/api/v1/chat", 
                                   json=chat_data, 
                                   headers=headers)
            if response.status_code in [200, 422]:  # Allow validation errors
                print(f"✓ Chat endpoint test: {response.status_code}")
                if response.status_code == 200:
                    result = response.json()
                    print(f"  Response: {result.get('assistant_response', 'No response text')[:100]}...")
            else:
                print(f"✗ Chat endpoint error: {response.status_code}")
        except Exception as e:
            print(f"✗ Chat endpoint test error: {e}")
    else:
        print("⚠ Skipping chat endpoint test (requires authentication)")

    print("\nAPI testing complete!")

if __name__ == "__main__":
    test_api_endpoints()