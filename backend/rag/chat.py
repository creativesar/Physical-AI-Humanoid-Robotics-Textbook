import google.generativeai as genai
import os
from typing import List, Dict, Optional
import logging

# Initialize Gemini client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')  # Using the text generation model

async def chat_with_rag(
    user_message: str, 
    conversation_history: Optional[List[dict]] = None,
    retrieved_context: Optional[List[dict]] = None
) -> Dict:
    """
    Handle a chat request using RAG (Retrieval-Augmented Generation) approach
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
        
        # Prepare the prompt for Gemini
        if context_text:
            prompt = f"""
            You are an expert assistant for the Physical AI & Humanoid Robotics Textbook.
            Use the following context from the textbook to answer the user's question.
            If the context doesn't contain relevant information, use your general knowledge but be clear about this.
            
            Context:
            {context_text}
            
            User's question: {user_message}
            
            Please provide a helpful, accurate response based on the textbook content when possible.
            """
        else:
            prompt = f"""
            You are an expert assistant for the Physical AI & Humanoid Robotics Textbook.
            The user has asked: {user_message}
            
            Please provide a helpful response. Note that no specific textbook context was retrieved for this query.
            """
        
        # Generate response using Gemini
        response = await model.generate_content_async(prompt)
        
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