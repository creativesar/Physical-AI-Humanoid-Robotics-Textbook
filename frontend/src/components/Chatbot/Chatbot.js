import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Chatbot.module.css';
import { queryRAGSystem } from './RAGSystem';

const Chatbot = ({ isOpen, onClose, onToggle, selectedText }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // If text was selected, add it as an initial message
  useEffect(() => {
    if (selectedText) {
      const selectionMessage = {
        id: Date.now(),
        text: `You highlighted: "${selectedText}". Could you explain this concept?`,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, selectionMessage]);

      // Automatically send this query
      setTimeout(() => {
        handleSend(selectedText, true);
      }, 500);
    }
  }, [selectedText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = null, isFromSelection = false) => {
    const messageText = text || inputValue;
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: isFromSelection ? `Could you explain: "${messageText}"` : messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!isFromSelection) setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call the RAG system
      const response = await queryRAGSystem(messageText);

      const botResponse = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => {
      inputRef.current?.focus();
      handleSend();
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        <div className={styles.chatbotTitle}>
          <div className={styles.chatbotIcon}>🤖</div>
          <h3>AI Assistant</h3>
        </div>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>
      
      <div className={styles.chatbotMessages}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={clsx(
              styles.message, 
              styles[message.sender],
              {[styles.botMessage]: message.sender === 'bot'},
              {[styles.userMessage]: message.sender === 'user'}
            )}
          >
            <div className={styles.messageContent}>
              {message.text}
            </div>
            <div className={styles.messageTimestamp}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className={clsx(styles.message, styles.bot, styles.typingIndicator)}>
            <div className={styles.typingDots}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.chatbotInputArea}>
        <div className={styles.suggestedQuestions}>
          <button 
            onClick={() => handleSuggestedQuestion("What is Physical AI?")}
            className={styles.suggestedQuestion}
          >
            What is Physical AI?
          </button>
          <button 
            onClick={() => handleSuggestedQuestion("Explain humanoid robotics")}
            className={styles.suggestedQuestion}
          >
            Explain humanoid robotics
          </button>
          <button 
            onClick={() => handleSuggestedQuestion("How do I get started?")}
            className={styles.suggestedQuestion}
          >
            How do I get started?
          </button>
        </div>
        
        <div className={styles.inputContainer}>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Physical AI, Humanoid Robotics..."
            className={styles.chatInput}
            rows="1"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={clsx(styles.sendButton, {
              [styles.sendButtonDisabled]: !inputValue.trim() || isLoading
            })}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Floating chatbot button that appears on all pages
export const ChatbotButton = ({ onClick, isOpen }) => {
  return (
    <button
      className={clsx(styles.chatbotButton, {[styles.open]: isOpen})}
      onClick={onClick}
      aria-label="Open AI Assistant"
    >
      <div className={styles.chatbotButtonIcon}>🤖</div>
      {!isOpen && <span className={styles.chatbotButtonText}>AI Help</span>}
      <div className={styles.chatbotBadge}>New</div>
    </button>
  );
};

export default Chatbot;