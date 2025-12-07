"""
Google Gemini Service for AI-powered features.

Provides:
- Chat completions with Gemini
- Text embeddings for RAG (using Vertex AI embeddings or fallback)
- Content personalization
- Urdu translation
"""

import google.generativeai as genai
from typing import Optional, List, Dict, Any
import asyncio
import numpy as np
import hashlib

from ..config import settings


class GeminiService:
    """Service for Google Gemini API interactions."""

    def __init__(self):
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel(settings.gemini_model)

        # Initialize the embedding model
        try:
            # Use the Google embedding API if available
            self.embedding_model = genai.embed_content(
                model=settings.gemini_embedding_model,
                content=["test"],  # Test content to check if the model works
                task_type="semantic_similarity"
            )
            self.use_google_embeddings = True
        except Exception:
            # Fallback to hash-based embedding if Google embeddings aren't available
            self.use_google_embeddings = False

        # System prompts
        self.textbook_system_prompt = """You are an AI teaching assistant for the Physical AI & Humanoid Robotics Textbook.
Your role is to help students understand concepts related to:
- ROS 2 (Robot Operating System 2)
- Gazebo and Unity simulation environments
- NVIDIA Isaac Sim and Isaac Lab
- Vision-Language-Action (VLA) models
- Physical AI and embodied intelligence

Guidelines:
1. Provide clear, educational explanations
2. Use examples and analogies when helpful
3. Reference textbook content when provided
4. Encourage hands-on learning and experimentation
5. Be patient and supportive with beginners
6. For advanced users, dive deeper into technical details"""

        self.personalization_prompt = """You are a content adaptation specialist.
Your task is to rewrite educational content to match the student's experience level.

Experience Levels:
- beginner: Use simple language, more analogies, step-by-step explanations, avoid jargon
- intermediate: Balance technical terms with explanations, include practical examples
- advanced: Use technical language freely, focus on edge cases, optimizations, and deeper concepts

Maintain the educational intent and accuracy while adapting the complexity."""

        self.translation_prompt = """You are a professional translator specializing in technical and educational content.
Translate the following content from English to Urdu.
Maintain technical terms in English where appropriate (like API, ROS 2, Python, etc.)
Preserve any markdown formatting.
Ensure the translation is natural and readable for Urdu speakers."""

    def _hash_embedding(self, text: str, dimensions: int = 768) -> List[float]:
        """Create a simple hash-based embedding as fallback."""
        text_hash = hashlib.sha256(text.encode()).hexdigest()
        vector = []
        for i in range(0, len(text_hash), 2):
            vector.append(int(text_hash[i:i+2], 16) / 255.0)  # Normalize to 0-1

        # Pad or truncate to desired dimensions
        while len(vector) < dimensions:
            vector.append(0.0)
        vector = vector[:dimensions]

        return vector

    async def create_embedding(self, text: str) -> List[float]:
        """Create an embedding for a single text."""
        if self.use_google_embeddings:
            # Using Google's embedding API
            response = await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: genai.embed_content(
                    model=settings.gemini_embedding_model,
                    content=text,
                    task_type="semantic_similarity"
                )
            )
            return response['embedding']
        else:
            # Fallback to hash-based embedding
            return await asyncio.get_event_loop().run_in_executor(
                None,
                lambda: self._hash_embedding(text)
            )

    async def create_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Create embeddings for multiple texts."""
        if self.use_google_embeddings:
            # Using Google's embedding API
            embeddings = []
            for text in texts:
                embedding_response = await asyncio.get_event_loop().run_in_executor(
                    None,
                    lambda t=text: genai.embed_content(
                        model=settings.gemini_embedding_model,
                        content=t,
                        task_type="semantic_similarity"
                    )
                )
                embeddings.append(embedding_response['embedding'])
            return embeddings
        else:
            # Fallback to hash-based embeddings
            embeddings = []
            for text in texts:
                embedding = await asyncio.get_event_loop().run_in_executor(
                    None,
                    lambda t=text: self._hash_embedding(t)
                )
                embeddings.append(embedding)
            return embeddings

    async def chat(
        self,
        message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        rag_context: Optional[str] = None,
        stream: bool = False
    ) -> str:
        """
        Generate a chat response.

        Args:
            message: The user's message
            conversation_history: Previous messages in the conversation
            rag_context: Retrieved context from vector database
            stream: Whether to stream the response (not supported in this implementation)

        Returns:
            Complete response string
        """
        # Build the full prompt following Gemini guidelines
        parts = [self.textbook_system_prompt]

        # Add RAG context if provided
        if rag_context:
            parts.append(f"Relevant textbook content for context:\n\n{rag_context}")

        # Add conversation history
        if conversation_history:
            for msg in conversation_history:
                parts.append(f"{msg['role'].upper()}: {msg['content']}")

        # Add current message
        parts.append(f"USER: {message}")
        parts.append("ASSISTANT:")

        full_prompt = "\n\n".join(parts)

        response = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: self.model.generate_content(full_prompt)
        )

        return response.text

    async def answer_selection(
        self,
        selected_text: str,
        question: str,
        context: Optional[str] = None
    ) -> str:
        """
        Answer a question about selected text.

        Args:
            selected_text: The text the user selected
            question: The user's question about the text
            context: Additional surrounding context
        """
        system_prompt = f"""{self.textbook_system_prompt}

The user has selected some text from the textbook and has a question about it.
Focus your answer on explaining the selected text in relation to their question."""

        user_content = f"Selected text: \"{selected_text}\"\n\n"
        if context:
            user_content += f"Surrounding context: {context}\n\n"
        user_content += f"Question: {question}"

        full_prompt = f"{system_prompt}\n\n{user_content}"
        
        response = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: self.model.generate_content(full_prompt)
        )
        
        return response.text

    async def personalize_content(
        self,
        content: str,
        level: str = "intermediate"
    ) -> str:
        """
        Personalize content based on experience level.

        Args:
            content: The original content to personalize
            level: Experience level (beginner, intermediate, advanced)
        """
        full_prompt = f"""{self.personalization_prompt}

Adapt this content for a {level} level student:

{content}"""

        response = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: self.model.generate_content(full_prompt)
        )
        
        return response.text

    async def translate_to_urdu(self, content: str) -> str:
        """
        Translate content from English to Urdu.

        Args:
            content: The English content to translate
        """
        full_prompt = f"""{self.translation_prompt}

{content}"""

        response = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: self.model.generate_content(full_prompt)
        )
        
        return response.text


# Singleton instance
gemini_service = GeminiService()