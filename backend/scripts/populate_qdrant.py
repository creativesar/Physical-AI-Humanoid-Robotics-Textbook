"""
Script to populate Qdrant with textbook content chunks.
This script reads MDX files from the frontend/docs directory,
chunks them, generates embeddings, and stores them in Qdrant.
"""
import asyncio
import os
import sys
from pathlib import Path

# Add the backend src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.services.chunker import chunk_text_by_headings, generate_content_hash, calculate_token_count
from src.services.embeddings import generate_embeddings
from src.database.qdrant_client import get_qdrant_client, initialize_qdrant_collection, upsert_points_to_qdrant
from src.database.postgres_client import get_db_session, TextbookChunk
from src.core.config import settings

def read_mdx_files(docs_path: str):
    """
    Read all MDX files from the docs directory.
    """
    mdx_files = []
    for root, dirs, files in os.walk(docs_path):
        for file in files:
            if file.endswith('.mdx') or file.endswith('.md'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Extract chapter/section info from path
                    relative_path = os.path.relpath(file_path, docs_path)
                    parts = relative_path.replace('\\', '/').split('/')
                    chapter = parts[0] if len(parts) > 1 else 'General'
                    section = parts[-1].replace('.mdx', '').replace('.md', '') if parts else 'Introduction'
                    
                    mdx_files.append({
                        'content': content,
                        'chapter': chapter,
                        'section': section,
                        'path': file_path
                    })
    return mdx_files

async def populate_qdrant():
    """
    Main function to populate Qdrant with textbook content.
    """
    print("Initializing Qdrant collection...")
    initialize_qdrant_collection()
    
    print("Reading MDX files from frontend/docs...")
    # Get the path to the frontend/docs directory (relative to the project root)
    project_root = Path(__file__).parent.parent
    docs_path = project_root / 'frontend' / 'docs'
    
    if not docs_path.exists():
        print(f"Error: Docs path does not exist: {docs_path}")
        return
    
    mdx_files = read_mdx_files(str(docs_path))
    print(f"Found {len(mdx_files)} MDX files")
    
    all_texts = []
    all_metadatas = []
    
    for file_info in mdx_files:
        print(f"Processing {file_info['path']}...")
        
        # Chunk the content
        chunks = chunk_text_by_headings(file_info['content'])
        print(f"  Generated {len(chunks)} chunks")
        
        for chunk in chunks:
            text = chunk['text']
            metadata = {
                'chapter': file_info['chapter'],
                'section': file_info['section'],
                'heading': chunk['heading'],
                'token_count': chunk['token_count']
            }
            
            all_texts.append(text)
            all_metadatas.append(metadata)
    
    print(f"Total chunks to process: {len(all_texts)}")
    
    if not all_texts:
        print("No content to process!")
        return
    
    print("Generating embeddings...")
    embeddings = await generate_embeddings(all_texts)
    print(f"Generated {len(embeddings)} embeddings")
    
    print("Upserting to Qdrant...")
    ids = upsert_points_to_qdrant(all_texts, embeddings, all_metadatas)
    print(f"Upserted {len(ids)} points to Qdrant")
    
    print("Done! Qdrant database has been populated with textbook content.")

if __name__ == "__main__":
    asyncio.run(populate_qdrant())