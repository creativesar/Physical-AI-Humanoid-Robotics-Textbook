import cohere
import os
from typing import List, Dict, Optional
import logging
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import asyncio

# Initialize Cohere client
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
if COHERE_API_KEY:
    co = cohere.AsyncClient(COHERE_API_KEY)
else:
    co = None
    logging.warning("COHERE_API_KEY not set, Cohere functionality will be disabled")

# Initialize Hugging Face model for text generation
HF_GENERATION_MODEL = os.getenv("HF_GENERATION_MODEL", "microsoft/DialoGPT-medium")
hf_generator = None

try:
    hf_generator = pipeline(
        "text-generation",
        model=HF_GENERATION_MODEL,
        tokenizer=HF_GENERATION_MODEL,
        device=0 if torch.cuda.is_available() else -1
    )
    logging.info(f"Loaded Hugging Face generation model: {HF_GENERATION_MODEL}")
except Exception as e:
    logging.error(f"Error loading Hugging Face generation model: {str(e)}")
    # Optionally load a default model
    try:
        hf_generator = pipeline(
            "text-generation",
            model="microsoft/DialoGPT-medium",
            tokenizer="microsoft/DialoGPT-medium",
            device=0 if torch.cuda.is_available() else -1
        )
        logging.info("Loaded default Hugging Face generation model: microsoft/DialoGPT-medium")
    except Exception as e2:
        logging.error(f"Error loading default Hugging Face generation model: {str(e2)}")
        hf_generator = None

# Determine which generation provider to use
GENERATION_PROVIDER = os.getenv("GENERATION_PROVIDER", "cohere").lower()

async def chat_with_rag(
    user_message: str,
    conversation_history: Optional[List[dict]] = None,
    retrieved_context: Optional[List[dict]] = None
) -> Dict:
    """
    Handle a chat request using RAG (Retrieval-Augmented Generation) approach with the configured provider
    """
    try:
        # Prepare the context from retrieved documents
        context_text = ""
        referenced_content = []

        if retrieved_context:
            for item in retrieved_context:
                context_text += f"Module: {item['module']}, Section: {item['section']}\n"
                context_text += f"Content: {item['text']}\n\n"
                referenced_content.append(item['id'])

        if GENERATION_PROVIDER == "cohere":
            if not co:
                raise ValueError("Cohere API is not configured but was requested")

            # Prepare the message for Cohere
            if context_text:
                preamble = """You are an expert assistant for the Physical AI & Humanoid Robotics Textbook.
                Use the following context from the textbook to answer the user's question.
                If the context doesn't contain relevant information, use your general knowledge but be clear about this."""

                message = f"""
                Context:
                {context_text}

                User's question: {user_message}

                Please provide a helpful, accurate response based on the textbook content when possible.
                """
            else:
                preamble = "You are an expert assistant for the Physical AI & Humanoid Robotics Textbook."
                message = f"The user has asked: {user_message}\n\nPlease provide a helpful response. Note that no specific textbook context was retrieved for this query."

            # Generate response using Cohere
            response = await co.chat(
                model='command-r-plus',  # Using Cohere's advanced model
                message=message,
                preamble=preamble,
                conversation_id=None,  # For a new conversation
                temperature=0.3  # Lower temperature for more factual responses
            )

            # Extract the text from the response
            if response.text:
                assistant_response = response.text
            else:
                assistant_response = "I'm sorry, I couldn't generate a response for your query. Please try rephrasing your question."

        elif GENERATION_PROVIDER == "huggingface":
            if not hf_generator:
                raise ValueError("Hugging Face generation model is not loaded but was requested")

            # Prepare the prompt for Hugging Face model
            if context_text:
                prompt = f"""You are an expert assistant for the Physical AI & Humanoid Robotics Textbook.
                Use the following context from the textbook to answer the user's question.
                If the context doesn't contain relevant information, use your general knowledge but be clear about this.

                Context:
                {context_text}

                User's question: {user_message}

                Please provide a helpful, accurate response based on the textbook content when possible."""
            else:
                prompt = f"""You are an expert assistant for the Physical AI & Humanoid Robotics Textbook.
                The user has asked: {user_message}
                Please provide a helpful response. Note that no specific textbook context was retrieved for this query."""

            # Generate response using Hugging Face model
            result = hf_generator(
                prompt,
                max_length=min(len(prompt) + 200, 2048),  # Limit response length
                temperature=0.3,  # Lower temperature for more factual responses
                do_sample=True,
                pad_token_id=50256  # Common pad token ID, adjust based on model if needed
            )

            # Extract the generated text
            generated_text = result[0]['generated_text']

            # Extract just the response part (after the user's question)
            if "User's question:" in generated_text:
                # Get everything after the user's question
                assistant_response = generated_text.split("User's question:")[1].split("\n")[1:]
                assistant_response = "\n".join(assistant_response).strip()
            else:
                assistant_response = generated_text[len(prompt):].strip()

            # Ensure response is not empty
            if not assistant_response:
                assistant_response = "I'm sorry, I couldn't generate a response for your query. Please try rephrasing your question."

        else:
            raise ValueError(f"Unsupported generation provider: {GENERATION_PROVIDER}")

        return {
            "assistant_response": assistant_response,
            "referenced_content": referenced_content
        }
    except Exception as e:
        logging.error(f"Error in chat with RAG: {str(e)}")
        return {
            "assistant_response": "I'm sorry, I encountered an error while processing your request. Please try again.",
            "referenced_content": []
        }