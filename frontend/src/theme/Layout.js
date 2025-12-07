import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ChatbotProvider from '../components/Chatbot/ChatbotProvider';
import { UserProvider } from '../components/Auth/UserContext';
import MdxBookWrapper from '../components/MdxBookWrapper';
import { useLocation } from '@docusaurus/router';

export default function Layout(props) {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith('/docs/');

  return (
    <UserProvider>
      {isDocsPage ? (
        <MdxBookWrapper>
          <OriginalLayout {...props} />
        </MdxBookWrapper>
      ) : (
        <>
          <OriginalLayout {...props} />
          <ChatbotProvider />
        </>
      )}
    </UserProvider>
  );
}