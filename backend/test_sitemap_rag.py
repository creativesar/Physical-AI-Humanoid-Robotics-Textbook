#!/usr/bin/env python3
"""
End-to-End Test for Physical AI & Humanoid Robotics Textbook RAG System
This script tests the complete sitemap-to-RAG pipeline.
"""

import sys
from pathlib import Path
import requests
import time
from typing import Dict, Any

# Add the backend to path so we can import modules
sys.path.insert(0, str(Path(__file__).parent))

from sitemap_rag_ingestor import SitemapRAGIngestor
from config.settings import settings
from qdrant_client import QdrantClient


def test_sitemap_processing():
    """
    Test the sitemap processing functionality.
    """
    print("Testing Sitemap Processing...")
    sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"
    
    try:
        from sitemap_processor import SitemapProcessor
        processor = SitemapProcessor(sitemap_url)
        urls = processor.get_urls()
        
        print(f"  Found {len(urls)} URLs in sitemap")
        if urls:
            print(f"  First URL: {urls[0]}")
            print("  ✓ Sitemap processing successful")
            return True
        else:
            print("  ✗ No URLs found in sitemap")
            return False
    except Exception as e:
        print(f"  ✗ Sitemap processing failed: {e}")
        return False


def test_content_download():
    """
    Test the content download functionality.
    """
    print("Testing Content Download...")
    sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"
    
    try:
        from sitemap_processor import SitemapProcessor
        processor = SitemapProcessor(sitemap_url)
        urls = processor.get_urls()
        
        if urls:
            # Test with the first URL if available
            from content_downloader import ContentDownloader
            downloader = ContentDownloader([urls[0]])
            content = downloader.download_all_content()
            
            if content and len(content) > 0:
                print(f"  Downloaded content with {len(content[0]['content'])} characters")
                print("  ✓ Content download successful")
                return True
            else:
                print("  ✗ No content downloaded")
                return False
        else:
            print("  ✗ No URLs available to test content download")
            return False
    except Exception as e:
        print(f"  ✗ Content download failed: {e}")
        return False


def test_rag_ingestion():
    """
    Test the RAG ingestion functionality.
    """
    print("Testing RAG Ingestion...")
    
    try:
        # Initialize Qdrant client to check connection
        qdrant_client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )
        
        # Check if collection exists
        collections = qdrant_client.get_collections()
        collection_names = [col.name for col in collections.collections]
        
        print(f"  Available collections: {collection_names}")
        
        if "textbook_content" in collection_names:
            # Check if collection has content
            count = qdrant_client.count(collection_name="textbook_content")
            print(f"  'textbook_content' collection has {count.count} vectors")
            
        print("  ✓ RAG ingestion infrastructure is available")
        return True
    except Exception as e:
        print(f"  ✗ RAG ingestion test failed: {e}")
        return False


def test_sitemap_rag_full_pipeline():
    """
    Test the complete sitemap-to-RAG pipeline.
    """
    print("Testing Full Sitemap-to-RAG Pipeline...")
    
    try:
        sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"
        ingestor = SitemapRAGIngestor(sitemap_url)
        
        # Perform a small test ingestion (only the first few URLs)
        # For testing purposes, we'll modify the method to process only a few URLs
        from sitemap_processor import SitemapProcessor
        from content_downloader import ContentDownloader
        from ingest_content import chunk_text
        
        print(f"  Processing sitemap: {sitemap_url}")
        processor = SitemapProcessor(sitemap_url)
        urls = processor.get_urls()
        
        # Limit to first 2 URLs for testing
        test_urls = urls[:2] if urls else [sitemap_url]
        
        print(f"  Found {len(urls)} total URLs, using {len(test_urls)} for test")
        
        downloader = ContentDownloader(test_urls)
        content_list = downloader.download_all_content()
        
        print(f"  Downloaded content from {len(content_list)} URLs")
        
        if content_list:
            # Process and test chunking
            processed_content = []
            for item in content_list:
                chunks = chunk_text(item["content"])
                for i, chunk in enumerate(chunks[:1]):  # Only test first chunk of each content
                    processed_content.append({
                        "text": chunk,
                        "module": "sitemap_content_test",
                        "section": f"{item['title']} - Part {i+1}",
                        "url": item["url"],
                        "content_type": item.get("content_type", "html")
                    })
            
            print(f"  Prepared {len(processed_content)} content chunks for test ingestion")
            
            # Test the ingestion API call without actually ingesting
            from services.ai_service import AIClientService
            ai_service = AIClientService()
            
            # Test embedding generation on first chunk if available
            if processed_content:
                test_text = processed_content[0]["text"][:100]  # Use first 100 chars for test
                embedding = ai_service.generate_embedding(
                    text=test_text,
                    provider="cohere"
                )
                
                print(f"  Generated embedding with {len(embedding)} dimensions")
            
            print("  ✓ Full pipeline test successful")
            return True
        else:
            print("  ✗ No content to test the pipeline")
            return False
    except Exception as e:
        print(f"  ✗ Full pipeline test failed: {e}")
        return False


def test_api_connection():
    """
    Test the API connection to ensure the chatbot backend is running.
    """
    print("Testing API Connection...")
    
    try:
        # Check if the backend is running
        response = requests.get(f"{settings.BACKEND_URL}/health", timeout=5)
        if response.status_code == 200:
            print("  ✓ API connection successful")
            return True
        else:
            print(f"  ✗ API returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("  ✗ Could not connect to API - is the backend running?")
        return False
    except Exception as e:
        print(f"  ✗ API connection test failed: {e}")
        return False


def main():
    """
    Main function to run all tests.
    """
    print("Physical AI & Humanoid Robotics Textbook - End-to-End Test")
    print("="*62)
    
    # Check required environment variables
    required_vars = ["QDRANT_URL", "QDRANT_API_KEY", "COHERE_API_KEY"]
    missing_vars = [var for var in required_vars if not getattr(settings, var, None)]
    
    if missing_vars:
        print(f"Error: Missing required environment variables: {missing_vars}")
        print("Please set these variables in your .env file")
        return 1
    
    print("Environment variables: OK")
    print()
    
    # Run all tests
    tests = [
        test_sitemap_processing,
        test_content_download,
        test_rag_ingestion,
        test_sitemap_rag_full_pipeline,
        test_api_connection,
    ]
    
    results = []
    for test in tests:
        print()
        result = test()
        results.append(result)
        time.sleep(1)  # Brief pause between tests
    
    print()
    print("Test Summary:")
    print("-" * 15)
    test_names = [
        "Sitemap Processing",
        "Content Download", 
        "RAG Ingestion",
        "Full Pipeline",
        "API Connection"
    ]
    
    all_passed = True
    for i, (name, result) in enumerate(zip(test_names, results)):
        status = "PASS" if result else "FAIL"
        print(f"{name:<20}: {status}")
        if not result:
            all_passed = False
    
    print()
    if all_passed:
        print("✓ All tests passed! The system is working correctly.")
        print("The RAG chatbot is ready to use with content from the sitemap.")
        return 0
    else:
        print("✗ Some tests failed. Please check the output above for details.")
        return 1


if __name__ == "__main__":
    sys.exit(main())