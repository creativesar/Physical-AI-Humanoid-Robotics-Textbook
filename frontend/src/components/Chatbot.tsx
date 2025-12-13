import React, { useState, useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { useAuth } from '../hooks/useAuth'; 
import styles from './Chatbot.module.css';

// SVG Icons
const Icons = {
  Chat: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 12 22M12 2C17.52 2 22 6.48 12 2M12 2C6.48 2 2 6.48 12 2M17 12H7M15 16H9M13 8H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Send: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Robot: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25c19f" strokeWidth="1.5">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  )
};

const Chatbot = () => {
  const { colorMode } = useColorMode();
  const { token } = useAuth(); // Get token from auth context
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggestions for empty state
  const suggestions = [
    "Explain Physical AI",
    "What is Embodied Intelligence?",
    "Summarize Chapter 1"
  ];

  // Function to get selected text from the page
  const getSelectedText = () => {
    const selectedText = window.getSelection()?.toString().trim() || '';
    return selectedText;
  };

  // Handle sending a message
  const sendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Get any currently selected text
    const currentSelectedText = getSelectedText();

    const userMessage = {
      role: 'user',
      content: inputValue,
      id: Date.now(),
      selectedText: currentSelectedText || selectedText
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

      const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_message: inputValue,
          conversation_history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          retrieved_context: currentSelectedText ? [{
            text: currentSelectedText,
            module: 'current-page',
            section: 'selected-text'
          }] : []
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        role: 'assistant',
        content: data.assistant_response,
        sources: data.referenced_content || [],
        id: Date.now() + 1
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedText('');
    }
  };

  const handleSuggestionClick = (text) => {
    setInputValue(text);
    // Optional: auto-send
    // setInputValue needs a moment to update state if we called sendMessage immediately, 
    // but React batching might handle it. Safer to just set input and focus.
    inputRef.current?.focus();
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <>
      <button
        className={styles.chatbotButton}
        onClick={toggleChat}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <Icons.Close /> : <Icons.Chat />}
      </button>

      {isOpen && (
        <div className={styles.chatbotPanel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h3>Textbook Assistant</h3>
              <p>Physical AI & Robotics</p>
            </div>
            <div className={styles.closeButton} onClick={toggleChat}>
              <Icons.Close />
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <Icons.Robot />
                </div>
                <p>Hello! I'm your AI study companion.</p>
                <div className={styles.suggestionGrid}>
                  {suggestions.map((s, i) => (
                    <div
                      key={i}
                      className={styles.suggestionChip}
                      onClick={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}>
                    <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.assistantBubble}`}>
                      {msg.content}
                    </div>
                    {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                      <div className={styles.sources}>
                        {msg.sources.slice(0, 2).map((source, idx) => (
                          <span key={idx} className={styles.sourceBadge}>{typeof source === 'string' ? source : 'Ref'}</span>
                        ))}
                      </div>
                    )}
                    <span className={styles.messageLabel}>{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                  </div>
                ))}

                {isLoading && (
                  <div className={`${styles.messageWrapper} ${styles.assistantMessage}`}>
                    <div className={`${styles.bubble} ${styles.assistantBubble}`}>
                      <div className={styles.typing}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputArea}>
            <form className={styles.inputForm} onSubmit={sendMessage}>
              <input
                ref={inputRef}
                type="text"
                className={styles.inputField}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isLoading ? "Thinking..." : "Ask a question..."}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={!inputValue.trim() || isLoading}
              >
                <Icons.Send />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;