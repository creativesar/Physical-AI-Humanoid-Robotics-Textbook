import requests
import json

# Configuration
BASE_URL = "http://127.0.0.1:8000"

def test_registration():
    print("Testing user registration...")
    
    # Registration data (updated to match new API)
    registration_data = {
        "email": "test@example.com",
        "password": "securepassword123"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/auth/register",
            json=registration_data
        )
        
        if response.status_code == 200:
            print("✓ Registration successful")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"✗ Registration failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"✗ Registration error: {e}")
        return False

if __name__ == "__main__":
    test_registration()