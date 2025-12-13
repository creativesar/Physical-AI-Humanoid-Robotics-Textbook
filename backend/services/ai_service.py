import os
from typing import List, Optional, Union
from config.settings import settings
import cohere


class AIClientService:
    """
    AI service that uses Cohere models for embeddings and text generation.
    """

    def __init__(self):
        # Initialize Cohere client
        self.cohere_client = cohere.Client(settings.COHERE_API_KEY) if settings.COHERE_API_KEY else None

    def generate_embedding(self, text: str, provider: str = "cohere") -> List[float]:
        """
        Generate embeddings using Cohere.

        Args:
            text (str): Input text to generate embeddings for
            provider (str): "cohere" (only supported provider)

        Returns:
            List[float]: Embedding vector
        """
        if provider == "cohere" and self.cohere_client:
            response = self.cohere_client.embed(
                texts=[text],
                model='embed-english-v3.0',
                input_type="search_document"
            )
            return response.embeddings[0]
        else:
            raise ValueError(f"Provider {provider} not available or not supported")

    def generate_text(self, prompt: str, provider: str = "cohere", max_length: int = 100) -> str:
        """
        Generate text using Cohere.

        Args:
            prompt (str): Input prompt for text generation
            provider (str): "cohere" (only supported provider)
            max_length (int): Maximum length of the generated text

        Returns:
            str: Generated text
        """
        if provider == "cohere" and self.cohere_client:
            response = self.cohere_client.generate(
                model='command-r-plus',
                prompt=prompt,
                max_tokens=max_length,
                temperature=0.7,
            )
            return response.generations[0].text
        else:
            raise ValueError(f"Provider {provider} not available or not supported")

    def chat_completion(self, messages: List[dict], provider: str = "cohere") -> str:
        """
        Generate a chat completion using Cohere.

        Args:
            messages (List[dict]): List of messages in the conversation
            provider (str): "cohere" (only supported provider)

        Returns:
            str: Generated response
        """
        if provider == "cohere" and self.cohere_client:
            # Convert messages to Cohere chat format
            chat_message = " ".join([f"{msg.get('role', 'user')}: {msg.get('content', '')}" for msg in messages])
            response = self.cohere_client.chat(
                message=chat_message,
                model="command-r-plus",
                temperature=0.7,
            )
            return response.text
        else:
            raise ValueError(f"Provider {provider} not available or not supported")

    def get_available_providers(self) -> List[str]:
        """
        Get a list of available AI providers.

        Returns:
            List[str]: List of available providers
        """
        providers = []
        if self.cohere_client:
            providers.append("cohere")
        return providers