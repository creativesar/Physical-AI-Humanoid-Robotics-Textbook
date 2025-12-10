"""
Test script to verify backend components are working properly.
"""
import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

def test_imports():
    """Test that all modules can be imported without errors."""
    try:
        from src.core.config import settings
        print("✓ Config module imported successfully")
        
        from src.core.auth import verify_password, get_password_hash, create_access_token
        print("✓ Auth module imported successfully")
        
        from src.database.qdrant_client import get_qdrant_client, initialize_qdrant_collection
        print("✓ Qdrant client module imported successfully")
        
        from src.database.postgres_client import get_db_session
        print("✓ Postgres client module imported successfully")
        
        from src.services.embeddings import generate_embeddings
        print("✓ Embeddings service imported successfully")
        
        from src.services.rag_pipeline import process_chat_query
        print("✓ RAG pipeline service imported successfully")
        
        from src.services.chunker import chunk_text_by_headings
        print("✓ Chunker service imported successfully")
        
        from src.api.health import router as health_router
        print("✓ Health API imported successfully")
        
        from src.api.chat import router as chat_router
        print("✓ Chat API imported successfully")
        
        from src.api.embed import router as embed_router
        print("✓ Embed API imported successfully")
        
        from src.api.query import router as query_router
        print("✓ Query API imported successfully")
        
        from src.api.feedback import router as feedback_router
        print("✓ Feedback API imported successfully")
        
        from src.api.user_profile import router as user_profile_router
        print("✓ User profile API imported successfully")
        
        print("\nAll modules imported successfully! Backend structure is valid.")
        return True
        
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False
    except Exception as e:
        print(f"✗ Other error: {e}")
        return False

def test_config():
    """Test that the configuration can be loaded."""
    try:
        from src.core.config import settings
        # Check that required settings exist
        required_settings = [
            'SECRET_KEY',
            'GEMINI_API_KEY',
            'QDRANT_URL',
            'QDRANT_API_KEY',
            'DATABASE_URL'
        ]
        
        missing_settings = []
        for setting in required_settings:
            if not hasattr(settings, setting):
                missing_settings.append(setting)
        
        if missing_settings:
            print(f"✗ Missing required settings: {missing_settings}")
            print("  Note: These are expected to be in your .env file")
        else:
            print("✓ All required settings are present in config")
        
        return True
        
    except Exception as e:
        print(f"✗ Config error: {e}")
        return False

if __name__ == "__main__":
    print("Testing backend components...\n")
    
    imports_ok = test_imports()
    print()
    config_ok = test_config()
    
    if imports_ok and config_ok:
        print("\n✓ All tests passed! Backend is properly set up.")
    else:
        print("\n✗ Some tests failed. Please check the errors above.")