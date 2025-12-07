import React from 'react';
import ChatbotProvider from './Chatbot/ChatbotProvider';

// This component will be loaded on the client side only
const ClientLayout = ({ children }) => {
  return (
    <>
      {children}
      <ChatbotProvider />
    </>
  );
};

export default ClientLayout;