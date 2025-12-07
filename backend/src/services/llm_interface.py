import google.generativeai as genai
from typing import List, Dict, Any
from ..config import settings

# Configure the Gemini API
genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel(settings.gemini_model)

def call_gemini_api(messages: List[Dict[str, str]], temperature: float = 0.7, max_tokens: int = 1000) -> str:
    """
    Call Gemini API with conversation history and return response.
    This is a simplified version; in production, you'd map roles appropriately.
    """
    # Flatten messages for Gemini (which expects a single text prompt)
    formatted_prompt = ""
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role == "system":
            # System messages can be prepended to user message or handled as instructions
            formatted_prompt = f"Instructions: {content}\n\n{formatted_prompt}"
        elif role == "user":
            formatted_prompt += f"User: {content}\n"
        elif role == "model" or role == "assistant":
            formatted_prompt += f"Assistant: {content}\n"

    # Add a marker for where the assistant should respond
    formatted_prompt += "Assistant:"

    try:
        response = model.generate_content(
            formatted_prompt,
            generation_config={
                "temperature": temperature,
                "max_output_tokens": max_tokens
            }
        )
        return response.text
    except Exception as e:
        raise Exception(f"Gemini API error: {str(e)}")