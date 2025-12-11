import React, { useState, useEffect, useRef } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const Chatbot = () => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const messagesEndRef = useRef(null);

  // Function to get selected text from the page
  const getSelectedText = () => {
    const selectedText = window.getSelection()?.toString().trim() || '';
    return selectedText;
  };

  // Handle sending a message to the backend
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Get any currently selected text
    const currentSelectedText = getSelectedText();

    const userMessage = {
      role: 'user',
      content: inputValue,
      id: Date.now(),
      selectedText: currentSelectedText || selectedText // Use either current selection or stored selection
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the backend API
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        id: Date.now() + 1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedText(''); // Clear selected text after sending
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle text selection
  const handleTextSelection = () => {
    const selectedText = getSelectedText();
    if (selectedText) {
      setSelectedText(selectedText);
      if (!isOpen) {
        setIsOpen(true); // Open the chat if it's closed when text is selected
      }
    }
  };

  // Add event listener for text selection
  useEffect(() => {
    const handleMouseUp = () => {
      // Small delay to ensure selection is complete
      setTimeout(handleTextSelection, 100);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
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
                <p>You can also select any text in the textbook and I'll help explain it!</p>
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
                    {message.sources && message.sources.length > 0 && (
                      <div style={{ marginTop: '5px', fontSize: '0.8em', color: '#aaa' }}>
                        Sources: {message.sources.join(', ')}
                      </div>
                    )}
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
            <div ref={messagesEndRef} />
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
              placeholder={selectedText ? "Ask about selected text..." : "Ask about Physical AI & Robotics..."}
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