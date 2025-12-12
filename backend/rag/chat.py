import cohere
import os
from typing import List, Dict, Optional
import logging
import asyncio

# Initialize Cohere client
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
if COHERE_API_KEY:
    co = cohere.AsyncClient(COHERE_API_KEY)
else:
    co = None
    logging.warning("COHERE_API_KEY not set, Cohere functionality will be disabled")

async def chat_with_rag(
    user_message: str,
    conversation_history: Optional[List[dict]] = None,
    retrieved_context: Optional[List[dict]] = None
) -> Dict:
    """
    Handle a chat request using RAG (Retrieval-Augmented Generation) approach with Cohere
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

        if not co:
            raise ValueError("Cohere API is not configured")

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