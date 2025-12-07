import React, { useState, useEffect } from 'react';
import Chatbot, { ChatbotButton } from './Chatbot';

const ChatbotProvider = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // Function to handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text.length > 0 && text.length < 500) { // Limit selection length
      // Check if the selection is within text content (not UI elements)
      const anchor = selection.anchorNode;
      const focus = selection.focusNode;

      // Simple check to ensure text is selected in content areas
      if ((anchor?.parentElement?.matches('.markdown, .container, .col') ||
           focus?.parentElement?.matches('.markdown, .container, .col')) &&
          text.length > 5) { // Minimum length to avoid single words
        setSelectedText(text);
        setIsChatbotOpen(true);
      }
    }
  };

  // Set up event listeners for text selection
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => handleTextSelection(), 100); // Slight delay to allow selection to complete
    };

    // Also add double click handler for mobile/touch devices
    const handleDoubleClick = () => {
      setTimeout(() => handleTextSelection(), 50);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('dblclick', handleDoubleClick);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
    setSelectedText('');
  };

  return (
    <>
      <ChatbotButton
        onClick={toggleChatbot}
        isOpen={isChatbotOpen}
      />
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={closeChatbot}
        onToggle={toggleChatbot}
        selectedText={selectedText}
        onTextClear={() => setSelectedText('')}
      />
    </>
  );
};

export default ChatbotProvider;