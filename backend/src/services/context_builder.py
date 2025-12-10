from typing import List, Dict, Any

def format_context_for_llm(context_chunks: List[Dict[str, str]]) -> str:
    """
    Format retrieved context chunks for inclusion in the LLM prompt.
    """
    formatted_context = "RETRIEVED CONTEXT FROM TEXTBOOK:\n"
    formatted_context += "="*50 + "\n\n"
    
    for i, chunk in enumerate(context_chunks):
        formatted_context += f"Source {i+1} (Chapter: {chunk.get('chapter', 'N/A')}, Section: {chunk.get('section', 'N/A')}):\n"
        formatted_context += f"{chunk.get('text', '')}\n\n"
    
    formatted_context += "="*50 + "\n"
    
    return formatted_context

def build_llm_prompt(
    user_message: str,
    context: str,
    chat_history: List[Dict[str, str]] = None,
    selected_text: str = None
) -> str:
    """
    Build a complete prompt for the LLM, including context, history, and user query.
    """
    if chat_history is None:
        chat_history = []
    
    # Start building the prompt
    prompt = "You are an AI assistant for the Physical AI & Humanoid Robotics Textbook.\n"
    prompt += "Your purpose is to answer questions based on the textbook content provided in the context.\n"
    prompt += "If the context doesn't contain the information needed to answer the question, say so.\n\n"
    
    # Add any selected text context
    if selected_text:
        prompt += f"USER SELECTED TEXT: {selected_text}\n\n"
    
    # Add the retrieved context
    prompt += context + "\n"
    
    # Add chat history if available
    if chat_history:
        prompt += "CONVERSATION HISTORY:\n"
        prompt += "="*30 + "\n"
        for message in chat_history:
            role = "USER" if message.get('role') == 'user' else 'ASSISTANT'
            prompt += f"{role}: {message.get('content', '')}\n"
        prompt += "="*30 + "\n\n"
    
    # Add the user's current query
    prompt += f"CURRENT USER QUERY: {user_message}\n\n"
    prompt += "Please provide a helpful and accurate response based solely on the textbook content provided in the context above."
    
    return prompt