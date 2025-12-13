import React, { ReactNode } from 'react';
import type { Props as LayoutProps } from '@theme/Layout';
import Layout from '@theme-original/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import { AuthProvider } from '../../hooks/useAuth';

interface Props extends LayoutProps {
  children: ReactNode;
}

export default function LayoutWrapper(props: Props): React.ReactElement {
  return (
    <AuthProvider>
      <Header />
      <Layout {...props}>
        {props.children}
        <Chatbot />
      </Layout>
      <Footer />
    </AuthProvider>
  );
}