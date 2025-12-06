# Project Implementation Guide: Physical AI & Humanoid Robotics Textbook

This guide provides a step-by-step implementation plan for building the "Physical AI & Humanoid Robotics Textbook" project, encompassing the Docusaurus frontend, FastAPI backend with RAG system, Qdrant and Postgres databases, chatbot integration, deployment, and testing.

## 1. Project Environment Setup

This section outlines the tools, dependencies, and initial repository structure required to set up your development environment.

### Required Tools & Versions

*   **Node.js**: v18.x or later (for Docusaurus)
*   **npm**: v9.x or later (or Yarn v1.x or later)
*   **Python**: 3.10+ (for FastAPI backend)
*   **pip**: Latest version
*   **Git**: Latest version
*   **Docker**: (Optional, for containerized deployments)

### Installation Commands

1.  **Node.js & npm**: Download and install from [nodejs.org](https://nodejs.org/).
2.  **Python 3.10+**: Download and install from [python.org](https://www.python.org/).
3.  **Git**: Download and install from [git-scm.com](https://git-scm.com/downloads).

### Repo Structure Creation

The project will follow a monorepo-like structure with `frontend/` for Docusaurus and `backend/` for FastAPI.

```bash
# Initialize Git repository (if not already done)
git init

# Create main project directories
mkdir frontend
mkdir backend

# Navigate into frontend to initialize Docusaurus (see section 2)
# Navigate into backend to set up FastAPI (see section 4)
```

### Environment Variable Setup Instructions

Both the frontend and backend will utilize environment variables for configuration, especially for API keys and database credentials.

**Backend (`.env` in `backend/`):**

```ini
# OpenAI API Key for embeddings and RAG
OPENAI_API_KEY="your_openai_api_key_here"

# Qdrant Cloud connection
QDRANT_URL="your_qdrant_cloud_url"
QDRANT_API_KEY="your_qdrant_api_key"
QDRANT_COLLECTION_NAME="textbook_chunks"

# Neon Postgres connection
DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]" # e.g., postgresql://user:pass@host:5432/db
```

**Frontend (`.env.local` or similar in `frontend/` if using direct API calls):**

```ini
# FastAPI Backend URL
REACT_APP_API_BASE_URL="http://localhost:8000" # Change for production deployment
```

**Instructions:**
1.  Create a `.env` file in the `backend/` directory.
2.  Create a `.env.local` file in the `frontend/` directory (after Docusaurus project creation).
3.  Fill in the respective values with your actual API keys and connection strings. **Never commit these files to version control.**

## 2. Docusaurus Implementation

This section details the steps to set up the Docusaurus frontend for the textbook.

### How to Create the Docusaurus Project

1.  **Navigate to the `frontend/` directory:**
    ```bash
    cd frontend
    ```
2.  **Initialize Docusaurus project:**
    ```bash
    npx create-docusaurus@latest my-textbook classic --typescript
    # Replace 'my-textbook' with your desired project name (e.g., 'physical-ai-textbook')
    ```
    This command will create a new Docusaurus project within the `frontend/my-textbook` directory. For simplicity, we'll assume the Docusaurus project is directly in `frontend/`, so you might want to move its contents up or adjust paths accordingly.

3.  **Install dependencies and start development server:**
    ```bash
    cd my-textbook # or just 'cd .' if you moved contents up
    npm install
    npm start
    ```
    Your Docusaurus site should now be running at `http://localhost:3000`.

### Folder Structure

The Docusaurus project will reside in the `frontend/` directory. Key folders include:

```text
frontend/
├── blog/                # Optional: for blog posts
├── docs/                # MDX content for textbook chapters
│   └── intro.md         # Example chapter
├── src/
│   ├── components/      # Reusable React components (e.g., Chatbot UI)
│   ├── css/             # Custom CSS files
│   ├── pages/           # Custom React pages
│   └── theme/           # Docusaurus theme overrides
├── static/              # Static assets (images, PDFs)
├── docusaurus.config.ts # Main Docusaurus configuration
├── sidebars.ts          # Sidebar navigation configuration
└── package.json         # Project dependencies
```

### How to Add MDX Support

Docusaurus inherently supports MDX. Just place `.md` or `.mdx` files in your `docs/` directory, and Docusaurus will process them.

### How to Add Mermaid Diagrams

1.  **Install Docusaurus plugin for Mermaid:**
    You will likely need a plugin to render Mermaid diagrams within MDX. Search for `docusaurus-plugin-mermaid` or similar in the Docusaurus ecosystem. A common approach is to use `remark-mermaid`.

    Example `docusaurus.config.ts` snippet for `remark-plugins`:
    ```typescript
    // docusaurus.config.ts
    import type * as Preset from '@docusaurus/preset-classic';
    import type {Config} from '@docusaurus/types';

    const config: Config = {
      // ... other config ...
      presets: [
        [
          'classic',
          {
            docs: {
              sidebarPath: './sidebars.ts',
              remarkPlugins: [require('remark-mermaid')], // Add this line
              // ... other docs config ...
            },
            // ... other preset config ...
          } satisfies Preset.Options,
        ],
      ],
      // ... other config ...
    };
    export default config;
    ```
    *Note: You might need to install `remark-mermaid` via `npm install remark-mermaid`.*

2.  **Embed Mermaid in MDX:**
    ```mdx
    ```mermaid
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    ```
    ```

### How to Configure Sidebars and Routing

1.  **`sidebars.ts`:** Define your textbook's navigation structure.
    ```typescript
    // sidebars.ts
    import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

    const sidebars: SidebarsConfig = {
      tutorialSidebar: [
        {
          type: 'autogenerated',
          dirName: '.', // Generates sidebar from docs/ directory
        },
        // Alternatively, define items manually:
        // {
        //   type: 'category',
        //   label: 'Introduction',
        //   items: ['intro'],
        // },
        // {
        //   type: 'category',
        //   label: 'Foundations of Physical AI',
        //   items: [
        //     'foundations/introduction',
        //     'foundations/concepts',
        //     // ... more sub-chapters
        //   ],
        // },
        // ... more chapters
      ],
    };
    export default sidebars;
    ```
    For the textbook, it's recommended to define a custom structure rather than `autogenerated` to ensure a logical flow of chapters.

2.  **`docusaurus.config.ts` (Routing):** Docusaurus automatically creates routes for `.md` and `.mdx` files in your `docs/` directory based on their file path.

### How to Create Reusable Components

Create React components in `frontend/src/components/`.

**Example: `frontend/src/components/Highlight/index.tsx`**
```typescript
import React from 'react';
import styles from './styles.module.css';

interface HighlightProps {
  children: React.ReactNode;
}

export default function Highlight({ children }: HighlightProps): JSX.Element {
  return (
    <span className={styles.highlight}>
      {children}
    </span>
  );
}
```

**Usage in MDX:**
```mdx
import Highlight from '@site/src/components/Highlight';

This is a <Highlight>highlighted</Highlight> text.
```

### How to Integrate the Chatbot UI inside Docusaurus

The chatbot UI will likely be a React component. It can be integrated as a floating button and a sidebar.

**Floating Chat Button:**

1.  **Create `frontend/src/components/ChatButton/index.tsx`:**
    ```tsx
    import React, { useState } from 'react';
    import styles from './styles.module.css';
    import ChatWindow from '../ChatWindow'; // Assuming ChatWindow component

    export default function ChatButton(): JSX.Element {
      const [isOpen, setIsOpen] = useState(false);

      const toggleChat = () => setIsOpen(!isOpen);

      return (
        <>
          <button className={styles.chatButton} onClick={toggleChat}>
            💬
          </button>
          {isOpen && <ChatWindow onClose={toggleChat} />}
        </>
      );
    }
    ```

2.  **Add `ChatButton` to a Docusaurus layout:** You can override a theme component, for example, by creating `frontend/src/theme/Layout/index.tsx` and rendering `ChatButton` there.

## 3. Full Textbook Implementation

This section guides you through creating the MDX content for your textbook chapters.

### MDX Folder Structure

Organize your chapters logically within `frontend/docs/`.
```text
frontend/docs/
├── category/
│   ├── _category_.json  # Metadata for the category (e.g., label, position)
│   ├── chapter-name.mdx
│   └── sub-chapter-name.mdx
├── foundations/
│   ├── _category_.json
│   ├── introduction.mdx
│   ├── concepts.mdx
│   └── exercises.mdx
├── ros2/
│   ├── _category_.json
│   ├── fundamentals.mdx
│   ├── communication.mdx
│   └── urdf.mdx
# ... and so on for all 15 chapters
├── glossary.mdx
└── appendix.mdx
```

### Naming Conventions

*   Use lowercase, kebab-case for filenames (e.g., `foundations-introduction.mdx`).
*   Match filenames to their content (e.g., `ros2-fundamentals.mdx` for ROS 2 fundamentals).

### Frontmatter Requirements

Each MDX file should start with frontmatter for Docusaurus to correctly process it.

```mdx
---
title: Foundations of Physical AI: Introduction
description: An introduction to the core concepts of Physical AI.
slug: /foundations/introduction
sidebar_position: 1 # Position in the sidebar
keywords: [Physical AI, Robotics, AI, Introduction]
---
```

### How to Format Chapters for RAG Chunking

To optimize for RAG, chapters should be structured into digestible chunks.

*   **Short Sections**: Break down long explanations into smaller, focused sections.
*   **Clear Headings**: Use clear H2, H3 headings. These can be used as metadata during chunking.
*   **Bullet Points & Lists**: Use them where appropriate to convey information concisely.
*   **Code Blocks**: Ensure code blocks are well-formatted and can be easily extracted.

### How to Insert Diagrams

As described in Section 2, use Mermaid code blocks.

```mdx
```mermaid
graph LR
    A[Perception] --> B(Cognition);
    B --> C{Action};
    C --> D[Robot];
```
```

### How to Embed ROS 2 & Isaac Sim Code Blocks

Use standard Markdown code blocks with language highlighting.

**ROS 2 (Python `rclpy`):**
```python
# frontend/docs/ros2/code-examples/simple_publisher.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello ROS 2: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Isaac Sim (Python):**
```python
# frontend/docs/isaac-sim/code-examples/basic_cube.py
from omni.isaac.kit import SimulationApp

# This launches Isaac Sim with the UI
kit = SimulationApp({"headless": False})

import omni.usd
from pxr import Gf, UsdGeom

# Get the USD stage
stage = omni.usd.get_context().get_stage()

# Create a new Xform (transform node) for our cube
cube_path = "/World/Cube"
cube_prim = stage.DefinePrim(cube_path, "Xform")

# Add a cube geometry to the prim
cube_geom = UsdGeom.Cube.Define(stage, cube_path + "/CubeMesh")
cube_geom.CreateSizeAttr(20.0) # Size in meters
cube_geom.AddTranslateOp().Set(Gf.Vec3f(0.0, 0.0, 10.0)) # Position

# Update the stage to see the changes
omni.usd.get_context().reload_stage()

# Keep the simulation running
while kit.is_running():
    kit.update()

kit.shutdown()
```

### How to Add Exercises, Summaries, Review Questions

These can be standard Markdown sections within your MDX files.

**Example MDX Chapter Template:**

```mdx
---
title: Chapter Title
description: A brief description of the chapter content.
slug: /chapter-slug
sidebar_position: X
keywords: [keyword1, keyword2]
---

# Chapter Title

## Introduction
(Write introductory text here, outlining learning objectives.)

## Key Concepts
(Explain core concepts using clear headings, bullet points, and definitions.)

### Concept 1
Description of Concept 1.

### Concept 2
Description of Concept 2.

## Diagrams
(Embed Mermaid diagrams to illustrate concepts.)
```mermaid
graph TD;
    Start --> Process;
    Process --> End;
```

## Code Examples
(Include relevant code blocks with language highlighting.)

```python
# Example Python code
def hello_world():
    print("Hello, World!")

hello_world()
```

## Step-by-Step Procedures
(Provide detailed guides for practical applications.)
1. First step.
2. Second step.
3. Third step.

## Practical Exercises
(Develop hands-on exercises for readers.)
1. Exercise 1: Description and expected outcome.
2. Exercise 2: Description and expected outcome.

## Summary
(Conclude with a concise summary of key takeaways.)

## Learning Outcomes
*   Understand X.
*   Be able to do Y.
*   Know Z.

## Review Questions
1. What is...?
2. Explain the difference between...
3. How would you...?
```

## 4. Backend (FastAPI) Implementation

This section provides detailed steps for implementing the entire FastAPI backend.

### Folder Structure (`backend/`)

```text
backend/
├── src/
│   ├── api/             # FastAPI endpoints (embed, query, chat, feedback, user-profile)
│   │   ├── __init__.py
│   │   ├── embed.py
│   │   ├── query.py
│   │   ├── chat.py
│   │   ├── health.py
│   │   ├── feedback.py
│   │   └── user_profile.py
│   ├── services/        # Business logic, RAG pipeline components
│   │   ├── __init__.py
│   │   ├── chunker.py
│   │   ├── embeddings.py
│   │   ├── rag_pipeline.py
│   │   ├── context_builder.py
│   │   └── llm_interface.py # Renamed from chat.py for clarity
│   ├── models/          # Pydantic models for request/response, database models
│   │   ├── __init__.py
│   │   ├── qdrant_models.py
│   │   └── postgres_models.py
│   ├── core/            # Core configurations, constants (e.g., settings.py)
│   │   └── config.py
│   ├── database/        # Database connection logic
│   │   ├── __init__.py
│   │   ├── qdrant_client.py
│   │   └── postgres_client.py
│   └── main.py          # FastAPI application entry point
├── tests/
│   ├── unit/
│   └── integration/
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (local)
└── README.md
```

### Required Python Packages

Create `backend/requirements.txt`:

```
fastapi==0.104.1
uvicorn[standard]==0.24.0.post1
pydantic==2.5.2
openai==1.3.7
qdrant-client==1.7.0
psycopg2-binary==2.9.9 # Or asyncpg for async Postgres client
python-dotenv==1.0.0
langchain==0.0.350 # For chunking, if used
tiktoken==0.5.2 # For token counting in chunking
```
Install them:
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate # On Windows
# source .venv/bin/activate # On Linux/macOS
pip install -r requirements.txt
```

### FastAPI Initialization (`backend/src/main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from .api import embed, query, chat, health, feedback, user_profile
from .core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description=settings.PROJECT_DESCRIPTION,
)

# CORS Middleware (configure as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(health.router)
app.include_router(embed.router)
app.include_router(query.router)
app.include_router(chat.router)
app.include_router(feedback.router)
app.include_router(user_profile.router)

@app.on_event("startup")
async def startup_event():
    # Initialize Qdrant client, Postgres client, etc.
    print("Application startup complete.")

@app.on_event("shutdown")
async def shutdown_event():
    # Close database connections, etc.
    print("Application shutdown complete.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### Creating API Routes

**`backend/src/api/health.py`**
```python
from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    return {"status": "ok", "message": "FastAPI is running!"}
```

**`backend/src/api/embed.py`**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from ..services import embeddings

router = APIRouter()

class EmbedRequest(BaseModel):
    texts: List[str]

class EmbedResponse(BaseModel):
    embeddings: List[List[float]]

@router.post("/embed", response_model=EmbedResponse)
async def create_embeddings(request: EmbedRequest):
    try:
        vectors = await embeddings.generate_embeddings(request.texts)
        return EmbedResponse(embeddings=vectors)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding generation failed: {e}")
```

**`backend/src/api/query.py`**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from ..database.qdrant_client import get_qdrant_client
from ..services import embeddings

router = APIRouter()

class QueryRequest(BaseModel):
    query_text: str
    top_k: int = 5

class QueryResult(BaseModel):
    id: str
    text: str
    chapter: str
    section: str
    score: float

class QueryResponse(BaseModel):
    results: List[QueryResult]

@router.post("/query", response_model=QueryResponse)
async def query_textbook(request: QueryRequest):
    try:
        query_vector = await embeddings.generate_embeddings([request.query_text])
        qdrant_client = get_qdrant_client()
        search_results = qdrant_client.query_collection(
            collection_name="textbook_chunks",
            query_vector=query_vector[0],
            limit=request.top_k
        )

        results = []
        for hit in search_results:
            payload = hit.payload or {}
            results.append(QueryResult(
                id=hit.id,
                text=payload.get("text", ""),
                chapter=payload.get("chapter", ""),
                section=payload.get("section", ""),
                score=hit.score
            ))
        return QueryResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {e}")
```

**`backend/src/api/chat.py`**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from ..services import rag_pipeline
from ..models.postgres_models import ChatMessage  # Assuming you have this model

router = APIRouter()

class ChatRequest(BaseModel):
    user_message: str
    chat_history: List[ChatMessage] = [] # Optional: for conversational context
    selected_text: str | None = None # Optional: if user selected text from textbook

class ChatResponse(BaseModel):
    ai_response: str
    sources: List[Dict[str, Any]] # e.g., [{"chapter": "...", "section": "..."}]

@router.post("/chat", response_model=ChatResponse)
async def chat_with_rag(request: ChatRequest):
    try:
        response, sources = await rag_pipeline.process_chat_query(
            user_message=request.user_message,
            chat_history=request.chat_history,
            selected_text=request.selected_text
        )
        return ChatResponse(ai_response=response, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {e}")
```

**`backend/src/api/feedback.py`**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from ..database.postgres_client import get_db_session
from ..models.postgres_models import FeedbackLog # Assuming this model exists

router = APIRouter()

class FeedbackRequest(BaseModel):
    user_id: str | None = None
    query: str
    response: str
    is_helpful: bool
    comments: str | None = None
    rating: int | None = None # e.g., 1-5

@router.post("/feedback")
async def submit_feedback(request: FeedbackRequest):
    try:
        db = next(get_db_session()) # Get a new session
        feedback_entry = FeedbackLog(
            user_id=request.user_id,
            query=request.query,
            response=request.response,
            is_helpful=request.is_helpful,
            comments=request.comments,
            rating=request.rating
        )
        db.add(feedback_entry)
        db.commit()
        db.refresh(feedback_entry)
        return {"message": "Feedback submitted successfully!", "id": feedback_entry.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit feedback: {e}")
```

**`backend/src/api/user_profile.py`**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from ..database.postgres_client import get_db_session
from ..models.postgres_models import User, UserProfile # Assuming these models exist

router = APIRouter()

class UserProfileRequest(BaseModel):
    user_id: str
    preferences: Dict[str, Any] # e.g., {"dark_mode": True, "notifications": False}

class UserProfileResponse(BaseModel):
    user_id: str
    username: str
    preferences: Dict[str, Any]

@router.get("/user-profile/{user_id}", response_model=UserProfileResponse)
async def get_user_profile(user_id: str):
    db = next(get_db_session())
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(UserProfile).filter(UserProfile.user_id == user_id).first()
    preferences = profile.preferences if profile else {}

    return UserProfileResponse(user_id=user.id, username=user.username, preferences=preferences)

@router.put("/user-profile", response_model=UserProfileResponse)
async def update_user_profile(request: UserProfileRequest):
    db = next(get_db_session())
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(UserProfile).filter(UserProfile.user_id == request.user_id).first()
    if profile:
        profile.preferences = request.preferences
    else:
        profile = UserProfile(user_id=request.user_id, preferences=request.preferences)
        db.add(profile)

    db.commit()
    db.refresh(user)
    db.refresh(profile) # Refresh to get updated preferences

    return UserProfileResponse(user_id=user.id, username=user.username, preferences=profile.preferences)
```

### Creating Helper Modules (under `backend/src/services/` and `backend/src/database/` etc.)

**`backend/src/core/config.py`**
```python
import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    PROJECT_NAME: str = "Physical AI & Humanoid Robotics RAG Backend"
    PROJECT_VERSION: str = "1.0.0"
    PROJECT_DESCRIPTION: str = "FastAPI backend for RAG chatbot in Physical AI textbook."

    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-ada-002"
    OPENAI_CHAT_MODEL: str = "gpt-4" # Or "gpt-3.5-turbo"

    # Qdrant
    QDRANT_URL: str
    QDRANT_API_KEY: str
    QDRANT_COLLECTION_NAME: str = "textbook_chunks"

    # Postgres
    DATABASE_URL: str

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"] # Adjust for production

settings = Settings()
```

**`backend/src/services/embeddings.py`**
```python
from openai import OpenAI
from typing import List

from ..core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

async def generate_embeddings(texts: List[str]) -> List[List[float]]:
    response = client.embeddings.create(
        input=texts,
        model=settings.OPENAI_EMBEDDING_MODEL
    )
    return [d.embedding for d in response.data]
```

**`backend/src/database/qdrant_client.py`**
```python
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct, FilterSelector, Filter

from ..core.config import settings
from typing import List, Dict, Any

_qdrant_client: QdrantClient | None = None

def get_qdrant_client() -> QdrantClient:
    global _qdrant_client
    if _qdrant_client is None:
        _qdrant_client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY,
        )
    return _qdrant_client

def initialize_qdrant_collection(collection_name: str, vector_size: int = 1536):
    client = get_qdrant_client()
    try:
        client.recreate_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE),
        )
        print(f"Collection '{collection_name}' recreated.")
    except Exception as e:
        print(f"Error recreating collection '{collection_name}': {e}")
        # If it's an error due to collection already existing, we can ignore or update
        if "already exists" in str(e):
            print(f"Collection '{collection_name}' already exists, skipping recreation.")
            pass
        else:
            raise

def upsert_points_to_qdrant(collection_name: str, points: List[PointStruct]):
    client = get_qdrant_client()
    operation_info = client.upsert(
        collection_name=collection_name,
        wait=True,
        points=points,
    )
    return operation_info

def query_collection(collection_name: str, query_vector: List[float], limit: int = 5, filters: Dict[str, Any] | None = None):
    client = get_qdrant_client()

    # Convert filters dict to Qdrant Filter object if provided
    qdrant_filter = None
    if filters:
        # Example: {"chapter": "Foundations"} -> Must(FieldCondition(key="chapter", MatchText(text="Foundations")))
        # This is a simplified example, a real implementation would be more robust
        must_conditions = []
        for key, value in filters.items():
            if isinstance(value, str):
                must_conditions.append(Filter(field=key, match=MatchText(text=value)))
            # Add more types as needed (e.g., MatchValue, Range)
        if must_conditions:
            qdrant_filter = Filter(must=must_conditions)


    search_result = client.search(
        collection_name=collection_name,
        query_vector=query_vector,
        query_filter=qdrant_filter,
        limit=limit,
    )
    return search_result
```

**`backend/src/database/postgres_client.py`**
```python
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

from ..core.config import settings

SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get the DB session
def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**`backend/src/models/postgres_models.py`**
```python
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from ..database.postgres_client import Base

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True) # Unique user ID
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    profiles = relationship("UserProfile", back_populates="user")
    chat_history = relationship("ChatHistory", back_populates="user")
    feedback = relationship("FeedbackLog", back_populates="user")

class UserProfile(Base):
    __tablename__ = "user_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    preferences = Column(JSON, default={}) # Store JSON preferences

    user = relationship("User", back_populates="profiles")

class ChatHistory(Base):
    __tablename__ = "chat_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"))
    query = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chat_history")

class FeedbackLog(Base):
    __tablename__ = "feedback_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    query = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    is_helpful = Column(Boolean, nullable=False)
    comments = Column(Text, nullable=True)
    rating = Column(Integer, nullable=True) # 1-5 rating
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="feedback")

class TextbookChunk(Base):
    __tablename__ = "textbook_chunks" # For tracking chunk metadata in Postgres
    id = Column(String, primary_key=True, index=True) # Matches Qdrant ID
    chapter = Column(String, nullable=False)
    section = Column(String, nullable=False)
    content_hash = Column(String, nullable=False) # To detect content changes
    chunk_text_length = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
```

**`backend/src/services/chunker.py`**
```python
from typing import List, Dict, Any
import tiktoken
import re
import hashlib

def calculate_token_count(text: str, model_name: str = "gpt-4") -> int:
    """Calculates the number of tokens in a text using tiktoken."""
    encoding = tiktoken.encoding_for_model(model_name)
    return len(encoding.encode(text))

def chunk_text_by_headings(md_content: str, max_tokens: int = 800, overlap_tokens: int = 100) -> List[Dict[str, Any]]:
    """
    Chunks Markdown content by headings, attempting to keep chunks within max_tokens,
    with an overlap between chunks.
    """
    chunks = []
    current_chunk_text = []
    current_metadata = {"chapter": "Unknown", "section": "Introduction"} # Default

    lines = md_content.split('\n')

    for line in lines:
        heading_match = re.match(r'^(#+)\s*(.*)', line)
        if heading_match:
            # If a new heading is encountered, and current_chunk_text is not empty,
            # save the current chunk before starting a new one.
            if current_chunk_text:
                chunk_content = "\n".join(current_chunk_text).strip()
                if chunk_content:
                    chunks.append({
                        "text": chunk_content,
                        "metadata": current_metadata.copy()
                    })
                current_chunk_text = [] # Start fresh for the new section

            # Update metadata for the new section
            level = len(heading_match.group(1))
            title = heading_match.group(2).strip()

            if level == 1: # Main chapter title
                current_metadata["chapter"] = title
                current_metadata["section"] = "Introduction"
            elif level == 2: # Section title
                current_metadata["section"] = title
            # You can add more logic for H3, H4 etc.

            current_chunk_text.append(line) # Include the heading in the new chunk
            continue

        current_chunk_text.append(line)

        # Check if the current chunk exceeds max_tokens
        if calculate_token_count("\n".join(current_chunk_text)) > max_tokens:
            # If it's too large, try to split it more granularly
            # This is a basic split; advanced chunking would use more sophisticated methods
            temp_content = "\n".join(current_chunk_text)
            sub_chunks = re.split(r'(\n\n)', temp_content) # Split by double newlines

            re_chunked_text = []
            for sub_chunk in sub_chunks:
                re_chunked_text.append(sub_chunk)
                if calculate_token_count("\n".join(re_chunked_text)) > max_tokens:
                    # Save a chunk and prepare for overlap
                    chunk_content = "\n".join(re_chunked_text[:-1]).strip()
                    if chunk_content:
                        chunks.append({
                            "text": chunk_content,
                            "metadata": current_metadata.copy()
                        })

                    # Create overlap
                    overlap_content = "\n".join(re_chunked_text[-int(len(re_chunked_text)*0.5):]).strip() # Simple overlap
                    current_chunk_text = [overlap_content] if overlap_content else []
                    re_chunked_text = [sub_chunk] # Reset for next sub_chunk

            # Add any remaining re_chunked_text
            if "\n".join(re_chunked_text).strip():
                current_chunk_text = re_chunked_text # What's left becomes the current_chunk_text for next iteration
            else:
                current_chunk_text = []

    # Add any remaining chunk
    if current_chunk_text:
        chunk_content = "\n".join(current_chunk_text).strip()
        if chunk_content:
            chunks.append({
                "text": chunk_content,
                "metadata": current_metadata.copy()
            })

    return chunks

def generate_content_hash(content: str) -> str:
    return hashlib.sha256(content.encode('utf-8')).hexdigest()
```

**`backend/src/services/rag_pipeline.py`**
```python
from typing import List, Dict, Any
from openai import OpenAI

from ..core.config import settings
from ..database.qdrant_client import get_qdrant_client
from ..services.embeddings import generate_embeddings
from ..models.postgres_models import ChatMessage # For chat history typing

client = OpenAI(api_key=settings.OPENAI_API_KEY)

async def retrieve_context(query_text: str, top_k: int = 5) -> List[Dict[str, Any]]:
    """Retrieves relevant chunks from Qdrant based on query."""
    query_vector = await generate_embeddings([query_text])
    qdrant_client = get_qdrant_client()
    search_results = qdrant_client.query_collection(
        collection_name=settings.QDRANT_COLLECTION_NAME,
        query_vector=query_vector[0],
        limit=top_k
    )

    context = []
    for hit in search_results:
        if hit.payload:
            context.append({
                "text": hit.payload.get("text", ""),
                "chapter": hit.payload.get("chapter", ""),
                "section": hit.payload.get("section", ""),
                "score": hit.score
            })
    return context

def format_context_for_llm(context: List[Dict[str, Any]]) -> str:
    """Formats retrieved context into a string for the LLM."""
    formatted_context = []
    for i, chunk in enumerate(context):
        formatted_context.append(f"--- Chunk {i+1} (Chapter: {chunk.get('chapter')}, Section: {chunk.get('section')}) ---")
        formatted_context.append(chunk.get('text'))
        formatted_context.append("\n")
    return "\n".join(formatted_context)

def build_llm_prompt(user_message: str, context: str, chat_history: List[ChatMessage], selected_text: str | None = None) -> List[Dict[str, str]]:
    """Builds the prompt for the LLM, including system instructions, context, and chat history."""

    messages = []

    # System instruction
    system_instruction = (
        "You are an AI assistant for the 'Physical AI & Humanoid Robotics Textbook'. "
        "Your goal is to provide accurate, concise, and helpful answers based ONLY on the provided textbook context. "
        "If the answer is not in the context, state that you don't have enough information. "
        "Maintain a professional and educational tone. "
        "Cite the chapter and section from the context if possible."
    )
    messages.append({"role": "system", "content": system_instruction})

    # Chat history
    for msg in chat_history:
        messages.append({"role": "user", "content": msg.query})
        messages.append({"role": "assistant", "content": msg.response})

    # Context
    messages.append({"role": "user", "content": f"Textbook Context:\n{context}\n"})

    # User's current query
    if selected_text:
        messages.append({"role": "user", "content": f"User selected text: '{selected_text}'. Based on this and the context, {user_message}"})
    else:
        messages.append({"role": "user", "content": user_message})

    return messages

async def get_llm_response(prompt_messages: List[Dict[str, str]]) -> str:
    """Sends the prompt to the LLM and gets a response."""
    response = client.chat.completions.create(
        model=settings.OPENAI_CHAT_MODEL,
        messages=prompt_messages,
        temperature=0.7,
        max_tokens=500
    )
    return response.choices[0].message.content

async def process_chat_query(user_message: str, chat_history: List[ChatMessage], selected_text: str | None = None) -> (str, List[Dict[str, Any]]):
    """Orchestrates the RAG pipeline."""

    # 1. Retrieve context
    # If selected_text is provided, use it to augment the query for better retrieval
    retrieval_query = f"{user_message} (related to: {selected_text})" if selected_text else user_message
    context_chunks = await retrieve_context(retrieval_query)

    # 2. Format context
    formatted_context = format_context_for_llm(context_chunks)

    # 3. Build LLM prompt
    prompt_messages = build_llm_prompt(user_message, formatted_context, chat_history, selected_text)

    # 4. Get LLM response
    ai_response = await get_llm_response(prompt_messages)

    # Extract sources from context_chunks for the response
    sources = [{"chapter": c.get("chapter"), "section": c.get("section")} for c in context_chunks if c.get("chapter") and c.get("section")]

    return ai_response, sources
```

### CORS Setup

The CORS middleware is already included in `backend/src/main.py`. Ensure `settings.BACKEND_CORS_ORIGINS` in `backend/src/core/config.py` is correctly configured to allow requests from your Docusaurus frontend's URL.

### Environment Variable Configuration

As described in Section 1, create a `.env` file in the `backend/` directory and populate it with:
`OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.

## 5. Qdrant Vector Database Implementation

This section details how to set up and interact with Qdrant Cloud.

### How to Create the Collection

Use the `initialize_qdrant_collection` function in `backend/src/database/qdrant_client.py`.

```python
# Example script for initial setup (e.g., backend/scripts/init_qdrant.py)
import asyncio
from backend.src.database.qdrant_client import initialize_qdrant_collection
from backend.src.core.config import settings

async def main():
    initialize_qdrant_collection(settings.QDRANT_COLLECTION_NAME, vector_size=1536) # OpenAI embeddings are 1536-dim

if __name__ == "__main__":
    asyncio.run(main())
```

Run this script once to create or recreate your collection:
```bash
cd backend
source .venv/bin/activate
python scripts/init_qdrant.py
```

### Define Schema

The schema is implicitly defined by the `PointStruct` you send to Qdrant. For our `textbook_chunks` collection, we'll store:
*   `id`: Unique ID for each chunk (e.g., hash of content + metadata)
*   `vector`: The embedding vector (1536 dimensions for OpenAI `text-embedding-ada-002`)
*   `payload`: A dictionary containing metadata:
    *   `text`: The actual text content of the chunk
    *   `chapter`: The chapter title
    *   `section`: The section title
    *   `content_hash`: Hash of the original content to detect changes
    *   `chunk_text_length`: Length of the chunk text

### Chunk Textbook Content

Use the `chunk_text_by_headings` function from `backend/src/services/chunker.py`. This will parse your MDX files and break them into smaller, manageable pieces suitable for embedding.

### Generate Embeddings

Use the `generate_embeddings` function from `backend/src/services/embeddings.py`.

### Upsert Embeddings

Use the `upsert_points_to_qdrant` function from `backend/src/database/qdrant_client.py`.

**Example: Full Embedding Pipeline Script (`backend/scripts/populate_qdrant.py`)**

```python
import asyncio
import os
import glob
from qdrant_client.http.models import PointStruct
from backend.src.services.chunker import chunk_text_by_headings, generate_content_hash, calculate_token_count
from backend.src.services.embeddings import generate_embeddings
from backend.src.database.qdrant_client import get_qdrant_client, initialize_qdrant_collection, upsert_points_to_qdrant
from backend.src.database.postgres_client import get_db_session, TextbookChunk
from backend.src.core.config import settings

TEXTBOOK_DOCS_PATH = "../frontend/docs" # Path to your Docusaurus docs

async def main():
    initialize_qdrant_collection(settings.QDRANT_COLLECTION_NAME, vector_size=1536)
    qdrant_client = get_qdrant_client()
    db_session = next(get_db_session())

    mdx_files = glob.glob(os.path.join(TEXTBOOK_DOCS_PATH, "**/*.mdx"), recursive=True)
    mdx_files.extend(glob.glob(os.path.join(TEXTBOOK_DOCS_PATH, "**/*.md"), recursive=True))

    all_points = []
    for file_path in mdx_files:
        print(f"Processing {file_path}...")
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Simple extraction of chapter/section from file path if not in content
        relative_path = os.path.relpath(file_path, TEXTBOOK_DOCS_PATH)
        chapter_guess = relative_path.split(os.sep)[0].replace('-', ' ').title()

        chunks = chunk_text_by_headings(content)

        for i, chunk_data in enumerate(chunks):
            text = chunk_data["text"]
            metadata = chunk_data["metadata"]

            chapter = metadata.get("chapter", chapter_guess)
            section = metadata.get("section", f"Chunk {i+1}")

            # Generate a unique ID for the point
            unique_id_str = f"{file_path}-{chapter}-{section}-{generate_content_hash(text)}"
            chunk_id = str(int(hashlib.sha256(unique_id_str.encode()).hexdigest(), 16) % (10**18)) # numeric ID for Qdrant

            # Check if chunk already exists in Postgres (simple deduplication/update check)
            existing_chunk = db_session.query(TextbookChunk).filter_by(id=chunk_id).first()
            current_content_hash = generate_content_hash(text)

            if existing_chunk and existing_chunk.content_hash == current_content_hash:
                print(f"Skipping unchanged chunk: {chapter}/{section} (ID: {chunk_id})")
                continue # Skip if content hasn't changed

            print(f"Generating embedding for chunk: {chapter}/{section} (ID: {chunk_id})")
            embedding = await generate_embeddings([text])

            payload = {
                "text": text,
                "chapter": chapter,
                "section": section,
                "file_path": relative_path,
                "content_hash": current_content_hash,
                "chunk_text_length": len(text)
            }

            all_points.append(PointStruct(id=chunk_id, vector=embedding[0], payload=payload))

            # Update/insert into Postgres
            if existing_chunk:
                existing_chunk.content_hash = current_content_hash
                existing_chunk.chunk_text_length = len(text)
                db_session.add(existing_chunk)
            else:
                new_chunk_entry = TextbookChunk(
                    id=chunk_id,
                    chapter=chapter,
                    section=section,
                    content_hash=current_content_hash,
                    chunk_text_length=len(text)
                )
                db_session.add(new_chunk_entry)
            db_session.commit()

            # Batch upsert to Qdrant if too many points
            if len(all_points) >= 100: # Adjust batch size as needed
                upsert_points_to_qdrant(settings.QDRANT_COLLECTION_NAME, all_points)
                all_points = []

    # Upsert any remaining points
    if all_points:
        upsert_points_to_qdrant(settings.QDRANT_COLLECTION_NAME, all_points)

    print("Qdrant population complete!")

if __name__ == "__main__":
    asyncio.run(main())
```

Run this script:
```bash
cd backend
source .venv/bin/activate
python scripts/populate_qdrant.py
```

### Run Similarity Search

The `query_collection` function in `backend/src/database/qdrant_client.py` and the `/query` API endpoint (`backend/src/api/query.py`) handle similarity search.

### Test Vector Queries

You would typically write `pytest` unit/integration tests for `backend/src/api/query.py` and `backend/src/services/rag_pipeline.py`.

## 6. Neon Postgres Implementation

This section covers setting up your Neon Serverless Postgres database and integrating it with FastAPI.

### How to Create Database

1.  **Sign up for Neon**: Go to [neon.tech](https://neon.tech/) and create an account.
2.  **Create a Project**: Follow the instructions to create a new project.
3.  **Get Connection String**: Once your project is created, navigate to its settings or connection details to find your PostgreSQL connection string. It will look something like:
    `postgresql://[user]:[password]@[host]:[port]/[database]?sslmode=require`
4.  **Add to `.env`**: Place this `DATABASE_URL` in your `backend/.env` file.

### How to Add Tables

The schema is defined using SQLAlchemy ORM in `backend/src/models/postgres_models.py`.

**Example: Creating tables on startup (for development/initial setup)**
You can add a function to `backend/src/database/postgres_client.py` to create tables.

```python
# backend/src/database/postgres_client.py (add this function)
def create_all_tables():
    Base.metadata.create_all(bind=engine)
    print("All database tables created or updated.")

# Then call it in main.py startup event
# backend/src/main.py
@app.on_event("startup")
async def startup_event():
    from .database.postgres_client import create_all_tables
    create_all_tables()
    print("Application startup complete.")
```
For production, use a proper migration tool like Alembic.

### Example SQL Schema (for reference)

```sql
-- users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- user_profiles table (for personalization)
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    preferences JSONB DEFAULT '{}',
    UNIQUE(user_id)
);

-- chat_history table
CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- feedback_logs table
CREATE TABLE feedback_logs (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id) NULL,
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    is_helpful BOOLEAN NOT NULL,
    comments TEXT,
    rating INTEGER,
    timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- textbook_chunks table (metadata for Qdrant chunks)
CREATE TABLE textbook_chunks (
    id VARCHAR(255) PRIMARY KEY,
    chapter VARCHAR(255) NOT NULL,
    section VARCHAR(255) NOT NULL,
    content_hash VARCHAR(64) NOT NULL,
    chunk_text_length INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### How to Connect FastAPI to Postgres

The connection is managed by SQLAlchemy in `backend/src/database/postgres_client.py`. The `get_db_session` dependency provides a session to your API routes.

### Example Python Connection Code

See `backend/src/database/postgres_client.py` and the `/feedback` and `/user-profile` API routes in `backend/src/api/` for examples of how to interact with the database.

## 7. RAG Pipeline Implementation

This section details the Retrieval-Augmented Generation (RAG) pipeline, which combines information retrieval with LLM generation.

### RAG Pipeline Architecture Diagram

```mermaid
graph TD
    A[User Query/Selected Text] --> B(Embed Query);
    B --> C(Vector Search in Qdrant);
    C --> D{Retrieve Top-K Chunks};
    D --> E[Format Context for LLM];
    E --> F{Build LLM Prompt};
    F --> G[Call OpenAI Chat Model];
    G --> H[AI Response];
    H --> I[Present Response + Sources];

    subgraph User Interface
        A
        I
    end

    subgraph FastAPI Backend
        B
        C
        D
        E
        F
        G
        H
    end

    subgraph External Services
        OpenAI(OpenAI API)
        Qdrant(Qdrant Cloud)
    end

    G --> OpenAI;
    C --> Qdrant;
```

### Chunking Strategy

*   **Granularity**: Chunk the textbook content into pieces of 500-800 tokens.
*   **Metadata Preservation**: Extract and store headings (H1, H2, H3) as `chapter` and `section` metadata.
*   **Overlap**: Implement a small overlap (e.g., 100 tokens) between consecutive chunks to maintain context across boundaries.
*   **Tools**: Use `tiktoken` for accurate token counting and custom Python scripting (see `backend/src/services/chunker.py`) for parsing MDX and splitting content.

### Embedding Generation Using OpenAI

*   **Model**: Use OpenAI's `text-embedding-ada-002` model (or a newer, more capable model).
*   **Process**: Convert each text chunk into a 1536-dimensional vector embedding.
*   **Tool**: `backend/src/services/embeddings.py` encapsulates this logic.

### Storing Embeddings in Qdrant

*   **Collection**: A dedicated Qdrant collection (e.g., `textbook_chunks`) will store these vector embeddings.
*   **Payload**: Each vector will have an associated payload containing the original text, chapter, section, and content hash.
*   **Tool**: `backend/src/database/qdrant_client.py` handles Qdrant interactions.

### Retrieval Algorithm

*   **Query Embedding**: When a user asks a question, embed the question using the same OpenAI embedding model.
*   **Similarity Search**: Perform a cosine similarity search in Qdrant to find the `top-k` most relevant textbook chunks.
*   **Tool**: `backend/src/services/rag_pipeline.py` contains the `retrieve_context` function.

### Context Assembly Logic

*   **Concatenation**: The retrieved `top-k` chunks are concatenated into a single context string.
*   **Attribution**: Each chunk in the context is clearly marked with its source (chapter, section) for LLM to use for citation.
*   **Tool**: `format_context_for_llm` in `backend/src/services/rag_pipeline.py` handles this.

### Final LLM Prompt Format

The prompt for the LLM is carefully constructed to include:

1.  **System Instructions**: Guiding the LLM to act as a helpful textbook assistant, adhere to the context, and cite sources.
2.  **Chat History**: Previous turns of conversation (optional, for continuity).
3.  **Retrieved Context**: The formatted chunks from the textbook.
4.  **User Query**: The user's actual question.
5.  **Selected Text (Optional)**: If the user highlighted text, it's included to provide additional focus.

*   **Tool**: `build_llm_prompt` in `backend/src/services/rag_pipeline.py` handles prompt construction.

### Chat Pipeline Architecture

See the RAG Pipeline Architecture Diagram above. The `backend/src/services/rag_pipeline.py` module orchestrates this entire flow via the `process_chat_query` function.

## 8. Chatbot Frontend Integration

This section details how to integrate the RAG chatbot into your Docusaurus frontend.

### Floating Chat Button

1.  **Component**: Create `frontend/src/components/ChatButton/index.tsx` as shown in Section 2.
2.  **Styling**: Add CSS in `frontend/src/components/ChatButton/styles.module.css` for a fixed position, bottom-right floating button.
    ```css
    .chatButton {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--ifm-color-primary); /* Docusaurus primary color */
      color: white;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transition: transform 0.2s ease-in-out;
    }

    .chatButton:hover {
      transform: scale(1.1);
    }
    ```
3.  **Placement**: Render the `ChatButton` in a Docusaurus layout override (e.g., `frontend/src/theme/Layout/index.tsx`).

### Chat Window Component

1.  **Component**: Create `frontend/src/components/ChatWindow/index.tsx`. This component will contain the message display, input field, and logic.

    ```tsx
    import React, { useState, useEffect, useRef } from 'react';
    import styles from './styles.module.css';
    import axios from 'axios'; // npm install axios

    interface ChatMessage {
      role: 'user' | 'ai';
      content: string;
      sources?: { chapter: string; section: string }[];
    }

    interface ChatWindowProps {
      onClose: () => void;
      initialMessage?: string;
    }

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

    export default function ChatWindow({ onClose, initialMessage }: ChatWindowProps): JSX.Element {
      const [messages, setMessages] = useState<ChatMessage[]>([]);
      const [input, setInput] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const messagesEndRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (initialMessage) {
          handleSendMessage(initialMessage);
        }
      }, [initialMessage]);

      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      const handleSendMessage = async (textToSend: string = input) => {
        if (!textToSend.trim()) return;

        const newMessages: ChatMessage[] = [...messages, { role: 'user', content: textToSend }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
          const chatHistoryForAPI = newMessages
            .filter(msg => msg.role !== 'ai' || msg.content !== 'Thinking...') // Filter out loading message
            .map(msg => ({ query: msg.content, response: msg.role === 'ai' ? msg.content : '' }));

          const payload = {
            user_message: textToSend,
            chat_history: chatHistoryForAPI,
            // selected_text will be handled by the selection listener
          };

          const response = await axios.post(`${API_BASE_URL}/chat`, payload);
          const aiResponse = response.data.ai_response;
          const sources = response.data.sources;

          setMessages(prev => [...prev, { role: 'ai', content: aiResponse, sources }]);
        } catch (error) {
          console.error('Error sending message:', error);
          setMessages(prev => [...prev, { role: 'ai', content: 'Oops! Something went wrong. Please try again.' }]);
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>AI Textbook Assistant</h3>
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.messageBubble} ${styles[msg.role]}`}>
                <p>{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <div className={styles.sources}>
                    <strong>Sources:</strong>
                    <ul>
                      {msg.sources.map((src, srcIndex) => (
                        <li key={srcIndex}>
                          {src.chapter} - {src.section}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.ai}`}>
                <p>Thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatInputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about the textbook..."
              className={styles.chatInput}
              disabled={isLoading}
            />
            <button onClick={() => handleSendMessage()} className={styles.sendButton} disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      );
    }
    ```

2.  **Styling**: Create `frontend/src/components/ChatWindow/styles.module.css`.
    ```css
    .chatWindow {
      position: fixed;
      bottom: 90px; /* Above the chat button */
      right: 20px;
      width: 350px;
      height: 500px;
      background-color: var(--ifm-background-color);
      border: 1px solid var(--ifm-color-emphasis-300);
      border-radius: var(--ifm-border-radius);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      z-index: 999;
    }

    .chatHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--ifm-spacing-md);
      background-color: var(--ifm-color-primary);
      color: white;
      border-top-left-radius: var(--ifm-border-radius);
      border-top-right-radius: var(--ifm-border-radius);
    }

    .chatHeader h3 {
      margin: 0;
      color: white;
    }

    .closeButton {
      background: none;
      border: none;
      color: white;
      font-size: 1.5em;
      cursor: pointer;
    }

    .chatMessages {
      flex-grow: 1;
      padding: var(--ifm-spacing-md);
      overflow-y: auto;
      background-color: var(--ifm-background-color);
    }

    .messageBubble {
      max-width: 80%;
      padding: var(--ifm-spacing-sm) var(--ifm-spacing-md);
      border-radius: var(--ifm-border-radius);
      margin-bottom: var(--ifm-spacing-sm);
      word-wrap: break-word;
    }

    .messageBubble.user {
      background-color: var(--ifm-color-primary-lightest);
      margin-left: auto;
      text-align: right;
    }

    .messageBubble.ai {
      background-color: var(--ifm-color-emphasis-100);
      margin-right: auto;
      text-align: left;
    }

    .sources {
      font-size: 0.8em;
      margin-top: var(--ifm-spacing-sm);
      border-top: 1px solid var(--ifm-color-emphasis-200);
      padding-top: var(--ifm-spacing-sm);
    }

    .sources ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sources li {
      margin-bottom: 2px;
      color: var(--ifm-color-emphasis-700);
    }

    .chatInputContainer {
      display: flex;
      padding: var(--ifm-spacing-md);
      border-top: 1px solid var(--ifm-color-emphasis-300);
    }

    .chatInput {
      flex-grow: 1;
      border: 1px solid var(--ifm-color-emphasis-400);
      border-radius: var(--ifm-border-radius);
      padding: var(--ifm-spacing-sm);
      margin-right: var(--ifm-spacing-sm);
    }

    .sendButton {
      background-color: var(--ifm-color-primary);
      color: white;
      border: none;
      border-radius: var(--ifm-border-radius);
      padding: var(--ifm-spacing-sm) var(--ifm-spacing-md);
      cursor: pointer;
    }

    .sendButton:disabled {
      background-color: var(--ifm-color-emphasis-300);
      cursor: not-allowed;
    }
    ```

### API Calls to Backend

The `ChatWindow` component demonstrates using `axios` to make `POST` requests to the FastAPI `/chat` endpoint. Ensure your `REACT_APP_API_BASE_URL` is correctly set in `frontend/.env.local` for development and production.

### UI Logic and Message Bubbles

The `ChatWindow` component manages the chat state, displaying user and AI messages in distinct bubbles. Loading states are handled to provide user feedback.

### Selected-Text Question Mode

1.  **Event Listener**: Add a JavaScript event listener to the Docusaurus root element to detect text selection.
2.  **Pass to Chatbot**: When text is selected, open the chat window (if not open) and pre-fill or pass the selected text to the chatbot component.

    **Example (conceptual, can be integrated into `Layout` or a custom hook):**

    ```typescript
    // frontend/src/theme/Layout/index.tsx (example integration)
    import React, { useState, useEffect } from 'react';
    import Layout from '@theme-original/Layout';
    import ChatButton from '../../components/ChatButton';
    import ChatWindow from '../../components/ChatWindow';

    export default function LayoutWrapper(props): JSX.Element {
      const [isChatOpen, setIsChatOpen] = useState(false);
      const [selectedTextForChat, setSelectedTextForChat] = useState<string | undefined>(undefined);

      useEffect(() => {
        const handleSelection = () => {
          const selection = window.getSelection();
          if (selection && selection.toString().length > 0) {
            const text = selection.toString();
            console.log('Selected text:', text);
            setSelectedTextForChat(text);
            setIsChatOpen(true); // Open chat when text is selected
          }
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('keyup', handleSelection); // For keyboard selection
        return () => {
          document.removeEventListener('mouseup', handleSelection);
          document.removeEventListener('keyup', handleSelection);
        };
      }, []);

      const handleChatClose = () => {
        setIsChatOpen(false);
        setSelectedTextForChat(undefined); // Clear selected text
      };

      return (
        <Layout {...props}>
          {props.children}
          {!isChatOpen && <ChatButton />}
          {isChatOpen && (
            <ChatWindow
              onClose={handleChatClose}
              initialMessage={selectedTextForChat ? `Explain: "${selectedTextForChat}"` : undefined}
            />
          )}
        </Layout>
      );
    }
    ```

    You would also need to update the `ChatWindow` component to accept and use `selected_text` in its API call.

## 9. Deployment Instructions

This section provides detailed instructions for deploying both the Docusaurus frontend and the FastAPI backend.

### Frontend Deployment (Docusaurus)

#### Deploying Docusaurus to GitHub Pages or Vercel

**GitHub Pages:**

1.  **Add `deploy.sh` script (e.g., in `frontend/`):**
    ```bash
    #!/usr/bin/env bash

    # Exit on error
    set -e

    # Build the Docusaurus site
    npm run build

    # Navigate into the build output directory
    cd build

    # Initialize a new Git repository in the build folder
    git init
    git add -A
    git commit -m "Deploy to GitHub Pages"

    # Push to the gh-pages branch of your remote repository
    # Replace <USERNAME> and <REPO>
    git push -f https://github.com/<USERNAME>/<REPO>.git main:gh-pages

    cd - # Go back to original directory
    ```
2.  **Configure `docusaurus.config.ts`:**
    ```typescript
    // docusaurus.config.ts
    const config: Config = {
      // ...
      url: 'https://<USERNAME>.github.io', // Your GitHub Pages URL
      baseUrl: '/<REPO>/', // Your repository name
      // ...
    };
    ```
3.  **Run the deploy script:**
    ```bash
    cd frontend
    bash deploy.sh
    ```
4.  **Enable GitHub Pages**: In your GitHub repository settings, go to "Pages" and select the `gh-pages` branch as the source.

**Vercel:**

1.  **Install Vercel CLI**: `npm install -g vercel`
2.  **Login**: `vercel login`
3.  **Deploy from `frontend/` directory**:
    ```bash
    cd frontend
    vercel # Follow prompts to link project
    vercel --prod # Deploy to production
    ```
4.  **Environment Variables**: Manage `REACT_APP_API_BASE_URL` in Vercel project settings.

#### Build Commands

*   `npm run build`: Builds the Docusaurus static site into the `build/` directory.

#### Production Config

*   **`docusaurus.config.ts`**: Ensure `url` and `baseUrl` are correctly set for your production environment.
*   **Environment Variables**: Any environment variables needed by your frontend (e.g., `REACT_APP_API_BASE_URL`) should be configured in your hosting platform (Vercel, GitHub Pages using GitHub Actions secrets).

#### CNAME (if needed)

If you're using a custom domain with GitHub Pages, create a `CNAME` file in your `static/` directory (e.g., `frontend/static/CNAME`) with your custom domain (e.g., `textbook.yourdomain.com`).

### Backend Deployment (FastAPI)

Choose one of the following platforms.

#### Deploying FastAPI to Railway / Render / Fly.io

**General Steps (applies to all):**

1.  **Containerize (Recommended)**: Create a `Dockerfile` in your `backend/` directory.

    **`backend/Dockerfile`:**
    ```dockerfile
    # Use an official Python runtime as a parent image
    FROM python:3.10-slim-buster

    # Set the working directory in the container
    WORKDIR /app

    # Copy the current directory contents into the container at /app
    COPY requirements.txt .

    # Install any needed packages specified in requirements.txt
    RUN pip install --no-cache-dir -r requirements.txt

    # Copy the rest of your application code
    COPY . .

    # Expose port 8000 for the FastAPI application
    EXPOSE 8000

    # Command to run the application
    CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```

2.  **Commit your code**: Ensure all backend code and the `Dockerfile` are committed to your Git repository.

**Railway:**

1.  **Link your GitHub repo**: Create a new project on Railway and connect it to your GitHub repository containing the backend code.
2.  **Automatic Deployment**: Railway will detect the `Dockerfile` and deploy your application.
3.  **Environment Variables**: Add your `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL` as environment variables in your Railway project settings.

**Render:**

1.  **New Web Service**: Create a new web service on Render, linking to your GitHub repository.
2.  **Configuration**:
    *   **Runtime**: `Docker`
    *   **Build Command**: (Leave empty if using Dockerfile)
    *   **Start Command**: `uvicorn src.main:app --host 0.0.0.0 --port 8000` (or leave empty if specified in Dockerfile CMD)
    *   **Port**: `8000`
3.  **Environment Variables**: Add your secrets (API keys, database URLs) in Render's environment settings.

**Fly.io:**

1.  **Install Flyctl**: `curl -L https://fly.io/install.sh | sh` (macOS/Linux) or download from [fly.io/docs/getting-started/installing-flyctl/](https://fly.io/docs/getting-started/installing-flyctl/).
2.  **Login**: `flyctl auth login`
3.  **Deploy**: Navigate to your `backend/` directory and run:
    ```bash
    flyctl launch # Follow prompts, choose region
    flyctl deploy
    ```
4.  **Environment Variables**: Use `flyctl secrets set OPENAI_API_KEY=...` to set your environment variables.

#### Environment Variables

*   **Crucial for Production**: Never hardcode sensitive information. Use platform-specific methods (e.g., Railway/Render/Fly.io environment settings) to manage `OPENAI_API_KEY`, `QDRANT_URL`, `QDRANT_API_KEY`, `DATABASE_URL`.

#### Connecting Qdrant Cloud

*   Ensure your `QDRANT_URL` and `QDRANT_API_KEY` environment variables are correctly set in the deployed backend's environment. The `backend/src/database/qdrant_client.py` will automatically use these.

#### Connecting Neon Postgres

*   Ensure your `DATABASE_URL` environment variable is correctly set in the deployed backend's environment. The `backend/src/database/postgres_client.py` will use this to connect.

#### Testing Production Deployment

*   After deployment, access your frontend (Docusaurus site) and verify that the chatbot button appears and interactions with the RAG chatbot function correctly.
*   Use tools like `curl` or Postman to test backend endpoints directly (e.g., `/health`, `/chat`) to ensure they are accessible and respond as expected.

## 10. Testing Instructions

This section outlines the testing strategies for ensuring the quality of the project.

### API Tests (PyTest)

Use `pytest` for testing your FastAPI backend.

1.  **Install `pytest`**:
    ```bash
    cd backend
    source .venv/bin/activate
    pip install pytest pytest-asyncio httpx
    ```
2.  **Create test files**:
    *   `backend/tests/unit/test_health.py`
    *   `backend/tests/integration/test_chat_rag.py`

**Example `backend/tests/unit/test_health.py`:**
```python
from fastapi.testclient import TestClient
from backend.src.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "FastAPI is running!"}
```

**Example `backend/tests/integration/test_chat_rag.py` (conceptual):**
```python
import pytest
from fastapi.testclient import TestClient
from backend.src.main import app
from backend.src.core.config import settings
from unittest.mock import patch, AsyncMock

client = TestClient(app)

@pytest.mark.asyncio
@patch('backend.src.services.embeddings.generate_embeddings', new_callable=AsyncMock)
@patch('backend.src.database.qdrant_client.QdrantClient')
@patch('backend.src.services.rag_pipeline.OpenAI')
async def test_chat_with_rag(mock_openai_client, mock_qdrant_client, mock_generate_embeddings):
    # Mock embedding generation
    mock_generate_embeddings.return_value = [[0.1] * 1536]

    # Mock Qdrant search results
    mock_qdrant_instance = mock_qdrant_client.return_value
    mock_qdrant_instance.search.return_value = [
        type('obj', (object,), {
            'id': '1',
            'payload': {"text": "Context about physical AI.", "chapter": "Foundations", "section": "Introduction"},
            'score': 0.9
        })()
    ]

    # Mock OpenAI chat completion
    mock_chat_completion_instance = mock_openai_client.return_value.chat.completions.create
    mock_chat_completion_instance.return_value = type('obj', (object,), {
        'choices': [type('obj', (object,), {'message': type('obj', (object,), {'content': 'This is an AI response based on context.'})()})]
    })()

    response = client.post(
        "/chat",
        json={"user_message": "What is physical AI?"}
    )

    assert response.status_code == 200
    assert response.json()["ai_response"] == "This is an AI response based on context."
    assert len(response.json()["sources"]) > 0
    assert response.json()["sources"][0]["chapter"] == "Foundations"
```

3.  **Run tests**:
    ```bash
    cd backend
    source .venv/bin/activate
    pytest
    ```

### RAG Accuracy Tests

These are typically custom tests that evaluate the quality of the retrieved context and the generated LLM responses.

*   **Evaluation Metrics**: Precision, Recall, F1-score for retrieval; faithfulness, relevance, coherence for generation.
*   **Dataset**: Create a dataset of (query, relevant_textbook_chunks, ideal_response) tuples.
*   **Automation**: Use Python scripts to:
    1.  Send queries to your RAG pipeline.
    2.  Compare retrieved chunks to `relevant_textbook_chunks`.
    3.  Evaluate LLM responses against `ideal_response` (potentially using another LLM for grading).

### UI Behavior Tests

Use testing frameworks like Jest, React Testing Library, or Cypress for frontend UI tests.

**Example (Jest/React Testing Library for `ChatWindow`):**
```typescript
// frontend/src/components/ChatWindow/ChatWindow.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatWindow from './index';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ChatWindow', () => {
  it('renders correctly and handles close', () => {
    const onCloseMock = jest.fn();
    render(<ChatWindow onClose={onCloseMock} />);
    expect(screen.getByText('AI Textbook Assistant')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('close')); // Assuming a good aria-label
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('sends a message and displays AI response', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        ai_response: 'This is a test AI response.',
        sources: [],
      },
    });

    render(<ChatWindow onClose={jest.fn()} />);
    const input = screen.getByPlaceholderText('Ask me about the textbook...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Hello bot' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello bot')).toBeInTheDocument();
    expect(screen.getByText('Thinking...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('This is a test AI response.')).toBeInTheDocument();
    });
    expect(screen.queryByText('Thinking...')).not.toBeInTheDocument();
  });
});
```

### MDX Validation Tests

*   **Linting**: Use tools like `remark-lint` to enforce Markdown/MDX formatting and structure rules.
*   **Broken Links**: Docusaurus has built-in link validation during build.
*   **Schema Validation**: Custom scripts can check frontmatter fields (e.g., `title`, `description`, `sidebar_position`, `keywords`) against expected schemas.
*   **Mermaid Syntax**: Lint Mermaid diagrams for correct syntax.

### Integration Test Workflow

1.  **Start Backend**: Run the FastAPI backend locally or against a staging deployment.
2.  **Start Frontend**: Run the Docusaurus frontend locally.
3.  **End-to-End Tests**: Use Cypress or Playwright to simulate user interactions on the Docusaurus site, sending queries to the chatbot and validating the UI and AI responses. This tests the full stack.

## 11. Final Deliverables

Upon successful completion of all implementation steps, the following deliverables should exist:

*   **Complete Docusaurus Project**:
    *   A fully functional Docusaurus website in the `frontend/` directory.
    *   `node_modules` and `build/` directories (post-build).
*   **Complete MDX Chapters**:
    *   All textbook chapters, glossary, appendix, and resources converted into `MDX` files within `frontend/docs/`.
    *   Correct frontmatter and internal linking.
    *   Embedded Mermaid diagrams and code examples (ROS 2, Isaac Sim).
*   **Fully Running FastAPI Backend**:
    *   A robust FastAPI application in the `backend/` directory, serving `/health`, `/embed`, `/query`, `/chat`, `/feedback`, and `/user-profile` endpoints.
    *   `requirements.txt` with all necessary Python dependencies.
    *   A `.venv` (virtual environment) for the backend.
    *   Configured `backend/.env` file (locally).
*   **Qdrant + Postgres Connected**:
    *   A Qdrant Cloud collection (`textbook_chunks`) populated with embeddings of all textbook content.
    *   A Neon Serverless Postgres database with `users`, `chat_history`, `feedback_logs`, and `textbook_chunks` metadata tables.
    *   FastAPI backend successfully connecting to both databases.
*   **Fully Working RAG Chatbot**:
    *   Integrated chatbot UI within Docusaurus (floating button, chat window).
    *   Frontend successfully communicating with the FastAPI backend for RAG queries.
    *   Accurate and context-aware responses from the AI assistant, with source citations.
    *   Selected-text question mode functionality.
*   **Deployment Live Links**:
    *   A live, publicly accessible URL for the Docusaurus textbook frontend (e.g., GitHub Pages, Vercel).
    *   A live, publicly accessible URL for the FastAPI backend API (e.g., Railway, Render, Fly.io).
*   **Repo-Ready Structure**:
    *   A clean Git repository with all code committed.
    *   Appropriate `.gitignore`, `.dockerignore` (if used), etc., to exclude temporary files and secrets.

---

**Completion Note:** This document serves as a comprehensive guide. Each section requires careful execution and verification. Ensure all configurations, API keys, and deployment settings are accurate for your specific environment.
