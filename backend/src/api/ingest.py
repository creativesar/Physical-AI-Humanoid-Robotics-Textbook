from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Dict, Any
import os
import asyncio

from ..services.chunker import chunk_mdx_content
from ..services.embeddings import generate_embeddings
from ..database.qdrant_client import upsert_points_to_qdrant
from ..models.postgres_models import Module, TextbookChunk, Counter
from ..database.postgres_client import get_db_session
from ..core.config import settings

router = APIRouter()

class IngestRequest(BaseModel):
    force_reindex: bool = False

class IngestResponse(BaseModel):
    status: str
    message: str
    processed_modules: int

def read_mdx_files() -> Dict[str, str]:
    """
    Read all MDX files from the frontend docs directory.
    """
    mdx_dir = os.path.join(settings.FRONTEND_PATH or "../../../frontend/docs", "")
    
    content_dict = {}
    
    # Check if directory exists
    if not os.path.exists(mdx_dir):
        raise HTTPException(status_code=404, detail=f"Docs directory not found: {mdx_dir}")
    
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

async def perform_ingestion(db_session, force_reindex: bool = False):
    """
    Perform the full ingestion process for all MDX content.
    """
    # Read all MDX files
    mdx_content = read_mdx_files()
    
    if not mdx_content:
        raise HTTPException(status_code=404, detail="No MDX files found to ingest")
    
    processed_modules = 0
    
    # Process each MDX file
    for file_path, content in mdx_content.items():
        # Extract module slug from file path (e.g., "01-intro/index.mdx" -> "01-intro")
        module_slug = file_path.split('/')[0] if '/' in file_path else file_path.replace('.mdx', '')
        
        # Extract module name from path or content
        module_name = module_slug.replace('-', ' ').title()
        
        # Check if module already exists
        existing_module = db_session.query(Module).filter(Module.slug == module_slug).first()
        
        if existing_module and not force_reindex:
            print(f"Module {module_slug} already exists, skipping...")
            continue
        
        # Create or update module record
        if existing_module:
            existing_module.name = module_name
            existing_module.description = f"Module {module_slug} from the Physical AI & Humanoid Robotics Textbook"
            db_session.add(existing_module)
        else:
            new_module = Module(
                name=module_name,
                slug=module_slug,
                description=f"Module {module_slug} from the Physical AI & Humanoid Robotics Textbook"
            )
            db_session.add(new_module)
        
        # Process the content
        try:
            qdrant_ids = await process_module_content(module_slug, content, db_session)
            print(f"Successfully processed {module_slug} with {len(qdrant_ids)} chunks")
            processed_modules += 1
            
            # Commit changes for this module
            db_session.commit()
        except Exception as e:
            print(f"Error processing module {module_slug}: {str(e)}")
            db_session.rollback()
            continue
    
    # Update counters
    total_modules = db_session.query(Module).count()
    counter = db_session.query(Counter).filter(Counter.name == 'modules_count').first()
    if counter:
        counter.value = total_modules
    else:
        counter = Counter(name='modules_count', value=total_modules)
        db_session.add(counter)
    
    db_session.commit()
    
    return processed_modules

@router.post("/ingest", response_model=IngestResponse)
async def ingest_textbook(request: IngestRequest, background_tasks: BackgroundTasks):
    """
    Ingest all textbook MDX content into the RAG system.
    """
    try:
        # Use context manager to get a database session
        with get_db_session() as db:
            processed_modules = await perform_ingestion(db, request.force_reindex)
        
        return IngestResponse(
            status="success",
            message=f"Ingestion completed successfully. Processed {processed_modules} modules.",
            processed_modules=processed_modules
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

@router.get("/ingest/status")
async def get_ingestion_status():
    """
    Get the current status of the ingestion process.
    """
    try:
        # Check how many modules are already in the database
        with get_db_session() as db:
            total_modules = db.query(Module).count()
        
        return {
            "status": "ready",
            "modules_ingested": total_modules,
            "message": f"Currently {total_modules} modules in the database"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get ingestion status: {str(e)}")