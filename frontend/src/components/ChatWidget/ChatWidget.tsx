import React, { useState, useEffect, useRef, Suspense } from 'react';
import styles from './ChatWidget.module.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { chapter: string; section: string }[];
}

const API_BASE_URL = 'http://localhost:8000'; // Backend API base URL

// Main chat component without useDoc hook
const ChatWidgetCore: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);
  
  // Default values for title and description
  const currentTitle = 'Physical AI & Humanoid Robotics Textbook';
  const currentDescription = 'Comprehensive textbook covering Physical AI and Humanoid Robotics';

  useEffect(() => {
    if (isOpen && initialMessage) {
      handleSendMessage(initialMessage);
      setInitialMessage(null);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string = input) => {
    if (!textToSend.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: textToSend,
          chat_history: newMessages.map(msg => ({
            query: msg.role === 'user' ? msg.content : '',
            response: msg.role === 'assistant' ? msg.content : ''
          })),
          selected_text: null // This would be set if user selects text on the page
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.ai_response;
      const sources = data.sources || [];

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        sources: sources
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button 
          className={styles.chatButton} 
          onClick={toggleChat}
          aria-label="Open AI Assistant"
        >
          <span className={styles.chatIcon}>🤖</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              <h3>AI Textbook Assistant</h3>
              <div className={styles.chatSubtitle}>
                Ask me anything about this textbook
              </div>
            </div>
            <div className={styles.chatHeaderRight}>
              <button 
                className={styles.closeButton} 
                onClick={toggleChat}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <p>Hello! I'm your AI assistant for the Physical AI & Humanoid Robotics textbook.</p>
                <p>You're currently reading: <strong>{currentTitle}</strong></p>
                <p>Feel free to ask me questions about the content!</p>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.messageContent}>
                  {msg.content}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className={styles.sources}>
                    <strong>Sources:</strong>
                    <ul>
                      {msg.sources.map((src, srcIndex) => (
                        <li key={srcIndex}>
                          {src.chapter} - {src.section}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInputArea}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about the textbook..."
              className={styles.chatInput}
              disabled={isLoading}
              rows={1}
            />
            <button 
              onClick={() => handleSendMessage()} 
              className={styles.sendButton}
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidgetCore;