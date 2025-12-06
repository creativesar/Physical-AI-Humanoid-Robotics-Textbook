"""
OpenAI Service for AI-powered features.

Provides:
- Chat completions with Agents SDK
- Text embeddings for RAG
- Content personalization
- Urdu translation
"""

from openai import AsyncOpenAI
from typing import Optional, List, Dict, Any, AsyncGenerator
import json

from ..config import settings


class OpenAIService:
    """Service for OpenAI API interactions."""
    
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)
        self.model = settings.openai_model
        self.embedding_model = settings.openai_embedding_model
        
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

    async def create_embedding(self, text: str) -> List[float]:
        """Create an embedding for a single text."""
        response = await self.client.embeddings.create(
            model=self.embedding_model,
            input=text
        )
        return response.data[0].embedding

    async def create_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Create embeddings for multiple texts."""
        response = await self.client.embeddings.create(
            model=self.embedding_model,
            input=texts
        )
        return [item.embedding for item in response.data]

    async def chat(
        self,
        message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        rag_context: Optional[str] = None,
        stream: bool = False
    ) -> str | AsyncGenerator[str, None]:
        """
        Generate a chat response.
        
        Args:
            message: The user's message
            conversation_history: Previous messages in the conversation
            rag_context: Retrieved context from vector database
            stream: Whether to stream the response
        
        Returns:
            Complete response string or async generator for streaming
        """
        messages = [{"role": "system", "content": self.textbook_system_prompt}]
        
        # Add RAG context if provided
        if rag_context:
            messages.append({
                "role": "system",
                "content": f"Relevant textbook content for context:\n\n{rag_context}"
            })
        
        # Add conversation history
        if conversation_history:
            messages.extend(conversation_history)
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        if stream:
            return self._stream_chat(messages)
        else:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
                max_tokens=2000
            )
            return response.choices[0].message.content

    async def _stream_chat(self, messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
        """Stream chat response."""
        stream = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.7,
            max_tokens=2000,
            stream=True
        )
        
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

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

        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        return response.choices[0].message.content

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
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": self.personalization_prompt},
                {"role": "user", "content": f"Adapt this content for a {level} level student:\n\n{content}"}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        return response.choices[0].message.content

    async def translate_to_urdu(self, content: str) -> str:
        """
        Translate content from English to Urdu.
        
        Args:
            content: The English content to translate
        """
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": self.translation_prompt},
                {"role": "user", "content": content}
            ],
            temperature=0.3,  # Lower temperature for translation accuracy
            max_tokens=3000
        )
        return response.choices[0].message.content


# Singleton instance
openai_service = OpenAIService()
