#!/usr/bin/env python3
"""
Content ingestion script for Physical AI & Humanoid Robotics Textbook
This script ingests textbook content into the Qdrant vector database for RAG.
"""

import os
import sys
import uuid
from pathlib import Path
from typing import List, Dict, Any

# Add the backend to path so we can import modules
sys.path.insert(0, str(Path(__file__).parent))

from config.settings import settings
from services.ai_service import AIClientService
from qdrant_client import QdrantClient
from qdrant_client.http import models


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks to preserve context.
    
    Args:
        text: Input text to chunk
        chunk_size: Size of each chunk in characters
        overlap: Number of overlapping characters between chunks
    
    Returns:
        List of text chunks
    """
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        
        # Ensure we don't exceed the text length
        if end > len(text):
            end = len(text)
        
        # Add the chunk
        chunk = text[start:end].strip()
        if chunk:  # Only add non-empty chunks
            chunks.append(chunk)
        
        # Move to the next chunk position with overlap
        start = end - overlap
        
        # If the last chunk was shorter than chunk_size, we're done
        if end == len(text):
            break
            
    return chunks


def get_textbook_content() -> List[Dict[str, Any]]:
    """
    Extract content from the textbook modules for ingestion.
    
    Returns:
        List of content dictionaries with text, module, and section info
    """
    content_list = []
    
    # Define the path to the textbook content (assuming it's in docs/)
    docs_path = Path(__file__).parent.parent / "docs"
    
    if not docs_path.exists():
        print(f"Warning: Textbook content directory not found at {docs_path}")
        print("Looking for alternative content sources...")
        
        # Try to find content in other common locations
        possible_paths = [
            Path(__file__).parent.parent / "content",
            Path(__file__).parent.parent / "textbook",
            Path(__file__).parent.parent / "frontend" / "docs",
        ]
        
        for path in possible_paths:
            if path.exists():
                docs_path = path
                print(f"Using alternative content path: {docs_path}")
                break
        else:
            print("No content directory found. Creating sample content for testing...")
            # Create sample content for testing purposes
            sample_modules = [
                {
                    "module_id": "module-1",
                    "title": "Introduction to Physical AI",
                    "content": "Physical AI is a field that combines artificial intelligence with physical systems. This module introduces the core concepts, including embodied intelligence, sensorimotor learning, and the integration of AI with robotic systems. Physical AI systems differ from traditional AI by requiring real-time interaction with the physical world, necessitating considerations of physics, dynamics, and control theory."
                },
                {
                    "module_id": "module-2", 
                    "title": "Humanoid Robotics Fundamentals",
                    "content": "Humanoid robotics focuses on creating robots with human-like form and behavior. This module covers the mechanical design of humanoid robots, including joint actuation, balance control, and locomotion. We explore the challenges of creating stable, efficient, and safe humanoid systems, including considerations of kinematics, dynamics, and control strategies for bipedal walking and manipulation."
                }
            ]
            
            for module in sample_modules:
                # Chunk the content
                chunks = chunk_text(module["content"])
                
                for i, chunk in enumerate(chunks):
                    content_list.append({
                        "text": chunk,
                        "module": module["module_id"],
                        "section": f"{module['title']} - Part {i+1}",
                        "subsection": None
                    })
            
            return content_list
    
    # Look for module directories
    module_dirs = [d for d in docs_path.iterdir() if d.is_dir() and d.name.startswith("module-")]
    
    if not module_dirs:
        print(f"No module directories found in {docs_path}")
        return content_list
    
    print(f"Found {len(module_dirs)} module directories")
    
    for module_dir in module_dirs:
        print(f"Processing {module_dir.name}...")
        
        # Look for MDX or MD files in the module directory
        content_files = list(module_dir.glob("*.mdx")) + list(module_dir.glob("*.md"))
        
        if not content_files:
            print(f"  No content files found in {module_dir}")
            continue
        
        for content_file in content_files:
            print(f"  Reading {content_file.name}...")
            
            try:
                with open(content_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract title from the content if possible
                title = content_file.stem  # Use filename without extension
                
                # Chunk the content to make it suitable for embeddings
                chunks = chunk_text(content)
                
                for i, chunk in enumerate(chunks):
                    content_list.append({
                        "text": chunk,
                        "module": module_dir.name,
                        "section": f"{title} - Part {i+1}",
                        "subsection": None
                    })
                    
            except Exception as e:
                print(f"    Error reading {content_file}: {e}")
    
    return content_list


def ingest_content_to_qdrant(content_list: List[Dict[str, Any]], batch_size: int = 10):
    """
    Ingest content into Qdrant vector database.
    
    Args:
        content_list: List of content dictionaries
        batch_size: Number of items to process in each batch
    """
    print(f"\nStarting ingestion of {len(content_list)} content items...")
    
    # Initialize AI service and Qdrant client
    ai_service = AIClientService()
    qdrant_client = QdrantClient(
        url=settings.QDRANT_URL,
        api_key=settings.QDRANT_API_KEY
    )
    
    # Process content in batches
    for i in range(0, len(content_list), batch_size):
        batch = content_list[i:i + batch_size]
        
        print(f"Processing batch {i//batch_size + 1} of {(len(content_list)-1)//batch_size + 1}")
        
        points = []
        for item in batch:
            try:
                # Generate embedding for the text
                embedding = ai_service.generate_embedding(
                    text=item["text"],
                    provider="cohere"
                )
                
                # Create a Qdrant point
                point = models.PointStruct(
                    id=str(uuid.uuid4()),  # Generate unique ID
                    vector=embedding,
                    payload={
                        "text": item["text"],
                        "module": item["module"],
                        "section": item["section"],
                        "subsection": item.get("subsection"),
                        "created_at": str(uuid.uuid4()) # This would normally be a timestamp
                    }
                )
                
                points.append(point)
                
            except Exception as e:
                print(f"Error processing item: {e}")
                continue
        
        # Upload the batch to Qdrant
        if points:
            try:
                qdrant_client.upsert(
                    collection_name="textbook_content",
                    points=points
                )
                print(f"  Uploaded {len(points)} items to Qdrant")
            except Exception as e:
                print(f"  Error uploading batch to Qdrant: {e}")
    
    print(f"\nIngestion complete! {len(content_list)} items processed.")


def main():
    """Main function to run the ingestion process."""
    print("Physical AI & Humanoid Robotics Textbook - Content Ingestion")
    print("="*60)
    
    # Check required environment variables
    required_vars = ["QDRANT_URL", "QDRANT_API_KEY", "COHERE_API_KEY"]
    missing_vars = [var for var in required_vars if not getattr(settings, var, None)]
    
    if missing_vars:
        print(f"Error: Missing required environment variables: {missing_vars}")
        print("Please set these variables in your .env file")
        return 1
    
    print("Environment variables: OK")
    
    # Get textbook content
    content_list = get_textbook_content()
    
    if not content_list:
        print("No content found to ingest!")
        return 1
    
    print(f"Found {len(content_list)} content chunks to ingest")
    
    # Ask for confirmation before proceeding
    response = input(f"Do you want to ingest {len(content_list)} content items into Qdrant? (y/N): ")
    if response.lower() not in ['y', 'yes']:
        print("Ingestion cancelled by user.")
        return 0
    
    # Ingest content to Qdrant
    ingest_content_to_qdrant(content_list)
    
    print("\nContent ingestion complete!")
    print("The RAG system is now populated with textbook content.")
    print("You can now use the chatbot to query this content.")
    
    return 0


if __name__ == "__main__":
    sys.exit(main())