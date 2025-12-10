"""
Script to ingest the textbook content into the RAG system.
This script will process all MDX files from the frontend and load them into the vector database.
"""

import sys
import os
import asyncio
from typing import Dict, Any

# Add the src directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.core.config import settings
from src.services.chunker import chunk_mdx_content
from src.services.embeddings import generate_embeddings
from src.database.qdrant_client import upsert_points_to_qdrant
from src.models.postgres_models import Module, TextbookChunk, Counter
from src.database.postgres_client import get_db_session
import os


def read_mdx_files() -> Dict[str, str]:
    """
    Read all MDX files from the frontend docs directory.
    """
    mdx_dir = os.path.join(settings.FRONTEND_PATH or "../../../frontend/docs", "")

    content_dict = {}

    # Check if directory exists
    if not os.path.exists(mdx_dir):
        raise FileNotFoundError(f"Docs directory not found: {mdx_dir}")

    # Walk through the docs directory to find MDX files
    for root, dirs, files in os.walk(mdx_dir):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Use relative path from docs directory as identifier
                    rel_path = os.path.relpath(file_path, mdx_dir)
                    content_dict[rel_path] = content

    return content_dict


async def process_module_content(module_slug: str, content: str, db_session):
    """
    Process a single module's content: chunk, embed, and store.
    """
    # Chunk the content
    chunks = chunk_mdx_content(content, module_slug, f"docs/{module_slug}")

    if not chunks:
        print(f"No chunks generated for module {module_slug}")
        return []

    # Extract text content for embedding
    texts = [chunk['text'] for chunk in chunks]

    # Generate embeddings
    embeddings = await generate_embeddings(texts)

    # Prepare metadata for Qdrant
    metadatas = []
    for chunk in chunks:
        metadata = {
            'module_id': module_slug,
            'module_title': chunk.get('module_title', ''),
            'section': chunk.get('section', ''),
            'source_path': chunk.get('source_path', ''),
            'token_count': chunk.get('token_count', len(chunk['text'].split()))
        }
        metadatas.append(metadata)

    # Store in Qdrant
    qdrant_ids = upsert_points_to_qdrant(texts, embeddings, metadatas)

    # Store mapping in PostgreSQL
    for i, chunk in enumerate(chunks):
        textbook_chunk = TextbookChunk(
            hash=hash(chunk['text']),  # Simple hash for deduplication
            chapter=module_slug,
            section=chunk.get('section', ''),
            content=chunk['text'],
            token_count=len(chunk['text'].split()),
            embedding_vector_id=qdrant_ids[i]
        )
        db_session.add(textbook_chunk)

    return qdrant_ids


async def run_ingestion():
    """
    Main function to run the ingestion process.
    """
    print("Starting textbook ingestion process...")
    
    # Read all MDX files
    try:
        mdx_content = read_mdx_files()
        print(f"Found {len(mdx_content)} MDX files to process")
    except Exception as e:
        print(f"Error reading MDX files: {str(e)}")
        return

    if not mdx_content:
        print("No MDX files found to ingest")
        return

    processed_modules = 0
    
    # Use the database session context manager
    with get_db_session() as db:
        # Process each MDX file
        for file_path, content in mdx_content.items():
            # Extract module slug from file path (e.g., "01-intro/index.mdx" -> "01-intro")
            module_slug = file_path.split('/')[0] if '/' in file_path else file_path.replace('.mdx', '')

            # Extract module name from path or content
            module_name = module_slug.replace('-', ' ').title()

            # Check if module already exists
            existing_module = db.query(Module).filter(Module.slug == module_slug).first()

            # Create or update module record
            if existing_module:
                existing_module.name = module_name
                existing_module.description = f"Module {module_slug} from the Physical AI & Humanoid Robotics Textbook"
                db.add(existing_module)
            else:
                new_module = Module(
                    name=module_name,
                    slug=module_slug,
                    description=f"Module {module_slug} from the Physical AI & Humanoid Robotics Textbook"
                )
                db.add(new_module)

            # Process the content
            try:
                qdrant_ids = await process_module_content(module_slug, content, db)
                print(f"Successfully processed {module_slug} with {len(qdrant_ids)} chunks")
                processed_modules += 1

                # Commit changes for this module
                db.commit()
            except Exception as e:
                print(f"Error processing module {module_slug}: {str(e)}")
                db.rollback()
                continue

        # Update counters
        total_modules = db.query(Module).count()
        counter = db.query(Counter).filter(Counter.name == 'modules_count').first()
        if counter:
            counter.value = total_modules
        else:
            counter = Counter(name='modules_count', value=total_modules)
            db.add(counter)

        db.commit()
        print(f"Ingestion completed successfully. Processed {processed_modules} modules.")
        print(f"Total modules in database: {total_modules}")


if __name__ == "__main__":
    asyncio.run(run_ingestion())