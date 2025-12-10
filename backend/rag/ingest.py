import os
import asyncio
from typing import List, Dict
from pathlib import Path
import logging
import glob

from rag.embed import embed_text
from rag.vector_store import store_embeddings, initialize_qdrant_collection
from db.models import get_db
from db.metadata import initialize_counters

async def ingest_documents(source_path: str) -> Dict:
    """
    Ingest documents from a source path, chunk them, embed, and store in vector DB
    """
    try:
        # Initialize Qdrant collection
        initialize_qdrant_collection()
        
        # Find all MDX files in the source path
        mdx_files = []
        for ext in ['*.mdx', '*.md']:
            mdx_files.extend(glob.glob(os.path.join(source_path, '**', ext), recursive=True))
        
        if not mdx_files:
            logging.warning(f"No MDX/MD files found in {source_path}")
            return {"documents_processed": 0, "message": "No documents found to process"}
        
        # Process each file
        all_texts = []
        all_metadata = []
        
        for file_path in mdx_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract module information from file path
                path_parts = file_path.replace('\\', '/').split('/')
                module_name = 'unknown'
                for part in path_parts:
                    if part.startswith('module-'):
                        module_name = part
                        break
                
                # Chunk the content
                chunks = chunk_text(content, file_path)
                
                # Prepare for embedding
                for i, chunk in enumerate(chunks):
                    all_texts.append(chunk)
                    all_metadata.append({
                        "module": module_name,
                        "section": f"{Path(file_path).stem}-chunk-{i}",
                        "file_path": file_path
                    })
            except Exception as e:
                logging.error(f"Error processing file {file_path}: {str(e)}")
                continue
        
        if not all_texts:
            return {"documents_processed": 0, "message": "No text chunks generated"}
        
        # Generate embeddings for all texts
        embeddings = await embed_text(all_texts)
        
        # Store embeddings in Qdrant
        content_ids = await store_embeddings(all_texts, embeddings, all_metadata)
        
        # Initialize counters in database if needed
        db_gen = get_db()
        db = next(db_gen)
        try:
            initialize_counters(db)
        finally:
            db.close()
        
        return {
            "documents_processed": len(mdx_files),
            "chunks_created": len(all_texts),
            "content_ids": content_ids[:5]  # Return first 5 IDs as sample
        }
    except Exception as e:
        logging.error(f"Error during document ingestion: {str(e)}")
        raise e

def chunk_text(text: str, file_path: str) -> List[str]:
    """
    Chunk text into smaller pieces for embedding
    """
    # Simple chunking approach - split by paragraphs with overlap
    paragraphs = text.split('\n\n')
    
    chunks = []
    current_chunk = ""
    chunk_size = 0
    max_chunk_size = 500  # approximately 300-500 tokens
    overlap_size = 60  # approximately 40-60 tokens overlap
    
    for paragraph in paragraphs:
        # If adding this paragraph would exceed max size
        if chunk_size + len(paragraph.split()) > max_chunk_size and current_chunk:
            chunks.append(current_chunk.strip())
            
            # Create overlap by taking last part of current chunk
            words = current_chunk.split()
            if len(words) > overlap_size:
                current_chunk = " ".join(words[-overlap_size:])
                chunk_size = len(current_chunk.split())
            else:
                current_chunk = ""
                chunk_size = 0
        else:
            # Add paragraph to current chunk
            if current_chunk:
                current_chunk += "\n\n" + paragraph
            else:
                current_chunk = paragraph
            chunk_size = len(current_chunk.split())
    
    # Add the final chunk if it has content
    if current_chunk.strip():
        chunks.append(current_chunk.strip())
    
    # If no chunks were created from paragraphs, split by fixed size
    if not chunks:
        words = text.split()
        for i in range(0, len(words), max_chunk_size - overlap_size):
            chunk_words = words[i:i+max_chunk_size]
            chunks.append(" ".join(chunk_words))
    
    return chunks