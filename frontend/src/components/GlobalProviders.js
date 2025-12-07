import React from 'react';
import ChatbotProvider from './Chatbot/ChatbotProvider';
import { AuthProvider } from './Auth/BetterAuth';

export default function GlobalProviders({ children }) {
  return (
    <AuthProvider>
      {children}
      <ChatbotProvider />
    </AuthProvider>
  );
}