#!/usr/bin/env python3
"""
Main Script for Physical AI & Humanoid Robotics Textbook Sitemap RAG Integration
This script orchestrates the complete process of sitemap processing, content ingestion, and RAG integration.
"""

import sys
import os
from pathlib import Path

# Add the backend to path so we can import modules
sys.path.insert(0, str(Path(__file__).parent))

from sitemap_rag_ingestor import SitemapRAGIngestor
from config.settings import settings


def main():
    """
    Main function to run the complete sitemap RAG integration process.
    """
    print("Physical AI & Humanoid Robotics Textbook - Sitemap RAG Integration")
    print("="*68)
    print("This script will:")
    print("1. Fetch and parse the sitemap from the provided URL")
    print("2. Download content from each URL in the sitemap")
    print("3. Process and chunk the content")
    print("4. Generate embeddings using Cohere")
    print("5. Ingest the content into the Qdrant vector database")
    print("6. Make the content available to the RAG chatbot")
    print()
    
    sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"
    print(f"Sitemap URL: {sitemap_url}")
    print()
    
    # Check required environment variables
    required_vars = ["QDRANT_URL", "QDRANT_API_KEY", "COHERE_API_KEY"]
    missing_vars = [var for var in required_vars if not getattr(settings, var, None)]

    if missing_vars:
        print(f"Error: Missing required environment variables: {missing_vars}")
        print("Please set these variables in your .env file")
        return 1

    print("Environment variables: OK")
    print()
    
    # Initialize the ingestor
    ingestor = SitemapRAGIngestor(sitemap_url)
    
    # Ask for confirmation before proceeding
    response = input(f"Do you want to proceed with the complete sitemap RAG integration? (y/N): ")
    if response.lower() not in ['y', 'yes']:
        print("Sitemap RAG integration cancelled by user.")
        return 0
    
    print()
    print("Starting the sitemap RAG integration process...")
    print()
    
    items_ingested = ingestor.process_sitemap_and_ingest()
    
    print()
    print("="*68)
    print("Sitemap RAG Integration Complete!")
    print(f"- Processed {items_ingested} content chunks")
    print("- Content is now available to the RAG chatbot")
    print("- The chatbot can answer questions based on the sitemap content")
    print()
    print("To use the chatbot:")
    print("1. Start the backend server (if not already running)")
    print("2. Start the frontend (if not already running)")
    print("3. Access the chatbot interface on the website")
    print("4. Ask questions about the content from the sitemap URLs")
    print("="*68)
    
    return 0


if __name__ == "__main__":
    sys.exit(main())