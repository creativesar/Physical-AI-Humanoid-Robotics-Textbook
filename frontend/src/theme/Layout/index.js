import React from 'react';
import Layout from '@theme-original/Layout';
import ChatWidget from '@site/src/components/ChatWidget/ChatWidget';
import Header from '@site/src/components/Header';
import Footer from '@site/src/components/Footer';

export default function LayoutWrapper(props) {
  return (
    <>
      <Header />
      <Layout {...props}>
        {props.children}
        <ChatWidget />
      </Layout>
      <Footer />
    </>
  );
}