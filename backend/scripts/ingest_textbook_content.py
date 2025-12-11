"""
Script to ingest the Physical AI & Humanoid Robotics textbook content into the RAG system.
This script processes all MD files from the frontend/docs directory and loads them into the Qdrant vector database.
"""

import asyncio
import os
import sys
from pathlib import Path

# Add the backend directory to the Python path so we can import our modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))

from rag.ingest import ingest_documents
from rag.vector_store import initialize_qdrant_collection


async def run_textbook_ingestion():
    """
    Main function to run the ingestion process for the textbook content.
    """
    print("Starting textbook ingestion process...")
    
    # Define the path to the docs directory
    project_root = Path(__file__).parent.parent
    docs_path = project_root / 'frontend' / 'docs'
    
    print(f"Looking for content in: {docs_path}")
    
    if not docs_path.exists():
        print(f"Error: Docs directory does not exist: {docs_path}")
        return False
    
    print("Initializing Qdrant collection...")
    initialize_qdrant_collection()
    
    print(f"Starting ingestion from: {docs_path}")
    
    try:
        # Run the ingestion process
        result = await ingest_documents(str(docs_path))
        
        print(f"Ingestion completed successfully!")
        print(f"Documents processed: {result.get('documents_processed', 0)}")
        print(f"Chunks created: {result.get('chunks_created', 0)}")
        print(f"Sample content IDs: {result.get('content_ids', [])}")
        
        return True
    except Exception as e:
        print(f"Error during ingestion: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = asyncio.run(run_textbook_ingestion())
    if success:
        print("\nTextbook content has been successfully ingested into the RAG system!")
        print("The chatbot can now answer questions based on the textbook content.")
    else:
        print("\nTextbook ingestion failed. Please check the errors above.")