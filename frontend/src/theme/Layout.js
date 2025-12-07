import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ChatbotProvider from '../components/Chatbot/ChatbotProvider';
import { UserProvider } from '../components/Auth/UserContext';

export default function Layout(props) {
  return (
    <UserProvider>
      <OriginalLayout {...props} />
      <ChatbotProvider />
    </UserProvider>
  );
}