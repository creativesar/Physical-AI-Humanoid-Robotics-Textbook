#!/usr/bin/env python3
"""
Sitemap RAG Ingestor for Physical AI & Humanoid Robotics Textbook
This script processes a sitemap, downloads content from URLs, and ingests it into the RAG system.
"""

import sys
import os
from pathlib import Path
from typing import List, Dict, Any

# Add the backend to path so we can import modules
sys.path.insert(0, str(Path(__file__).parent))

from sitemap_processor import SitemapProcessor
from content_downloader import ContentDownloader
from ingest_content import chunk_text
from config.settings import settings
from services.ai_service import AIClientService
from qdrant_client import QdrantClient
from qdrant_client.http import models
import uuid


class SitemapRAGIngestor:
    """
    A class to process sitemap, download content, and ingest into RAG system.
    """
    
    def __init__(self, sitemap_url: str):
        """
        Initialize the SitemapRAGIngestor with the sitemap URL.
        
        Args:
            sitemap_url (str): The URL of the sitemap XML file
        """
        self.sitemap_url = sitemap_url
        
        # Initialize AI service and Qdrant client
        self.ai_service = AIClientService()
        self.qdrant_client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY
        )
    
    def process_sitemap_and_ingest(self, batch_size: int = 10) -> int:
        """
        Process the sitemap, download content, and ingest into RAG system.
        
        Args:
            batch_size (int): Number of items to process in each batch
            
        Returns:
            int: Number of items successfully ingested
        """
        print(f"Processing sitemap: {self.sitemap_url}")
        
        # Process the sitemap to get URLs
        processor = SitemapProcessor(self.sitemap_url)
        urls = processor.get_urls()
        
        if not urls:
            print("No URLs found in sitemap")
            return 0
        
        print(f"Found {len(urls)} URLs to process")
        
        # Download content from URLs
        downloader = ContentDownloader(urls)
        content_list = downloader.download_all_content()
        
        if not content_list:
            print("No content could be downloaded from the URLs")
            return 0
        
        print(f"Downloaded content from {len(content_list)} URLs")
        
        # Process and chunk the content
        processed_content = []
        for item in content_list:
            # Chunk the content to make it suitable for embeddings
            chunks = chunk_text(item["content"])
            
            for i, chunk in enumerate(chunks):
                processed_content.append({
                    "text": chunk,
                    "module": "sitemap_content",
                    "section": f"{item['title']} - Part {i+1}",
                    "url": item["url"],
                    "content_type": item.get("content_type", "html")
                })
        
        print(f"Prepared {len(processed_content)} content chunks for ingestion")
        
        # Ingest content to Qdrant
        items_ingested = self.ingest_content_to_qdrant(processed_content, batch_size)
        
        return items_ingested
    
    def ingest_content_to_qdrant(self, content_list: List[Dict[str, Any]], batch_size: int = 10) -> int:
        """
        Ingest content into Qdrant vector database.

        Args:
            content_list: List of content dictionaries
            batch_size: Number of items to process in each batch
            
        Returns:
            int: Number of items successfully ingested
        """
        print(f"\nStarting ingestion of {len(content_list)} content items...")

        items_ingested = 0

        # Process content in batches
        for i in range(0, len(content_list), batch_size):
            batch = content_list[i:i + batch_size]

            print(f"Processing batch {i//batch_size + 1} of {(len(content_list)-1)//batch_size + 1}")

            points = []
            for item in batch:
                try:
                    # Generate embedding for the text
                    embedding = self.ai_service.generate_embedding(
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
                            "url": item["url"],
                            "content_type": item["content_type"],
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
                    self.qdrant_client.upsert(
                        collection_name="textbook_content",
                        points=points
                    )
                    print(f"  Uploaded {len(points)} items to Qdrant")
                    items_ingested += len(points)
                except Exception as e:
                    print(f"  Error uploading batch to Qdrant: {e}")
                    continue

        print(f"\nIngestion complete! {items_ingested} items processed.")
        return items_ingested


def main():
    """
    Main function to run the sitemap RAG ingestion process.
    """
    print("Physical AI & Humanoid Robotics Textbook - Sitemap RAG Ingestor")
    print("="*65)

    sitemap_url = "https://physical-ai-humanoid-robotics-textb-mocha.vercel.app/sitemap.xml"
    
    # Check required environment variables
    required_vars = ["QDRANT_URL", "QDRANT_API_KEY", "COHERE_API_KEY"]
    missing_vars = [var for var in required_vars if not getattr(settings, var, None)]

    if missing_vars:
        print(f"Error: Missing required environment variables: {missing_vars}")
        print("Please set these variables in your .env file")
        return 1

    print("Environment variables: OK")

    ingestor = SitemapRAGIngestor(sitemap_url)
    
    # Ask for confirmation before proceeding
    response = input(f"Do you want to process the sitemap and ingest content into Qdrant? (y/N): ")
    if response.lower() not in ['y', 'yes']:
        print("Sitemap RAG ingestion cancelled by user.")
        return 0

    items_ingested = ingestor.process_sitemap_and_ingest()
    
    print(f"\nSitemap RAG ingestion complete!")
    print(f"{items_ingested} items were successfully ingested into the RAG system.")
    print("The chatbot can now access content from the sitemap URLs.")

    return 0


if __name__ == "__main__":
    sys.exit(main())