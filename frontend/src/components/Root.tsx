import React from 'react';
import Chatbot from './Chatbot';

// Root is the main component that wraps the entire app
export default function Root({children}) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}