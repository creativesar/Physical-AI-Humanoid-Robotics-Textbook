import React from 'react';
import Layout from '@theme-original/Layout';
import Header from '@site/src/components/Header';
import Footer from '@site/src/components/Footer';
import Chatbot from '@site/src/components/Chatbot';
import { AuthProvider } from '@site/src/hooks/useAuth';

export default function LayoutWrapper(props) {
  return (
    <AuthProvider>
      <AuthProvider>
        <Header />
        <Layout {...props}>
          {props.children}
          <Chatbot />
        </Layout>
        <Footer />
      </AuthProvider>
    </AuthProvider>
  );
}