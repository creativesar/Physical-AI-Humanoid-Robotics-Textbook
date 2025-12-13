#!/usr/bin/env python3
"""
Test script for the RAG Assistant Service
"""

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.rag_assistant import RAGAssistantService

def test_rag_assistant():
    """
    Test the RAG Assistant Service functionality
    """
    print("Testing RAG Assistant Service...")
    
    # Initialize the service
    rag_service = RAGAssistantService()
    
    print("\n1. Testing available providers...")
    providers = rag_service.get_available_providers()
    print(f"Available providers: {providers}")
    
    # Test contexts for different scenarios
    sample_context = [
        "Physical AI combines artificial intelligence with physical systems.",
        "Humanoid robotics focuses on creating robots with human-like form and behavior.",
        "Embodied intelligence refers to AI systems that interact with the physical world."
    ]
    
    print("\n2. Testing general knowledge query...")
    general_response = rag_service.general_knowledge_query(
        "What is Physical AI?", 
        sample_context
    )
    print(f"General query response: {general_response[:200]}...")
    
    print("\n3. Testing textbook question answer...")
    textbook_response = rag_service.answer_textbook_question(
        "What are the main characteristics of humanoid robots?",
        sample_context,
        "section"
    )
    print(f"Textbook question response: {textbook_response[:200]}...")
    
    print("\n4. Testing highlighted text explanation...")
    highlighted_text = "Physical AI combines artificial intelligence with physical systems. This means the AI has real-time interaction with the physical world."
    highlighted_response = rag_service.explain_highlighted_text(
        highlighted_text,
        "How does this differ from traditional AI?",
        sample_context
    )
    print(f"Highlighted text response: {highlighted_response[:200]}...")
    
    print("\n5. Testing website page explanation...")
    page_response = rag_service.explain_website_page(
        "/modules/module-1",
        sample_context
    )
    print(f"Website page explanation: {page_response[:200]}...")
    
    print("\nAll tests completed successfully!")

if __name__ == "__main__":
    test_rag_assistant()