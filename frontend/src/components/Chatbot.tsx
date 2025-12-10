import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const Chatbot = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputValue, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // In a real implementation, this would call the backend API
    // For now, we'll simulate a response
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botMessage = {
        role: 'assistant',
        content: `I received your message: "${inputValue}". This is a simulated response from the Physical AI & Humanoid Robotics textbook assistant. In a full implementation, this would connect to a Cohere-powered RAG backend to provide accurate answers based on the textbook content.`,
        id: Date.now() + 1
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot icon button - fixed to bottom right */}
      <button
        onClick={toggleChat}
        className="chatbot-button"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25c19f',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        }}
      >
        💬
      </button>

      {/* Chatbot panel - slides up when opened */}
      {isOpen && (
        <div
          className="chatbot-panel"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            height: '500px',
            backgroundColor: colorMode === 'dark' ? '#242526' : '#ffffff',
            border: '1px solid #555',
            borderRadius: '8px',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '15px',
              backgroundColor: 'transparent',
              color: 'white',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #555',
            }}
          >
            <h3 style={{ margin: 0, fontFamily: 'Sora, sans-serif' }}>Textbook Assistant</h3>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          {/* Messages area */}
          <div
            className="chat-messages"
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              backgroundColor: 'transparent',
              color: '#fff',
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                <p>Hello! I'm your Physical AI & Humanoid Robotics textbook assistant.</p>
                <p>Ask me anything about the textbook content, and I'll help find relevant information.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    marginBottom: '15px',
                    textAlign: message.role === 'user' ? 'right' : 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '10px 15px',
                      borderRadius: '18px',
                      backgroundColor: message.role === 'user' ? '#25c19f' : 'rgba(37, 193, 159, 0.1)',
                      color: message.role === 'user' ? '#000' : '#fff',
                      maxWidth: '80%',
                    }}
                  >
                    {message.content}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7em',
                      color: '#888',
                      marginTop: '4px',
                      paddingLeft: message.role === 'user' ? '0' : '10px',
                      paddingRight: message.role === 'user' ? '10px' : '0',
                    }}
                  >
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '10px 15px',
                    borderRadius: '18px',
                    backgroundColor: 'rgba(37, 193, 159, 0.1)',
                    color: '#fff',
                    maxWidth: '80%',
                  }}
                >
                  <div>Thinking...</div>
                </div>
                <div style={{ fontSize: '0.7em', color: '#888', marginTop: '4px', paddingLeft: '10px' }}>
                  Assistant
                </div>
              </div>
            )}
          </div>

          {/* Input area */}
          <form
            onSubmit={sendMessage}
            style={{
              padding: '15px',
              backgroundColor: 'transparent',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
              display: 'flex',
              borderTop: '1px solid #555',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Physical AI & Robotics..."
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '18px',
                border: '1px solid #555',
                backgroundColor: 'transparent',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
              }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              style={{
                marginLeft: '10px',
                padding: '10px 15px',
                borderRadius: '18px',
                border: 'none',
                backgroundColor: '#25c19f',
                color: '#000',
                cursor: (!inputValue.trim() || isLoading) ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;