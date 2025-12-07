import React from 'react';
import CommonHeader from './CommonHeader';
import CommonFooter from './CommonFooter';

const MdxBookWrapper = ({ children }) => {
  const handleBookClick = () => {
    // Stay within the book structure, navigate to the introduction
    window.location.href = '/docs/intro';
  };

  return (
    <>
      <CommonHeader onBookClick={handleBookClick} isBookMode={true} />
      <main style={{ flex: 1, width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        {children}
      </main>
      <CommonFooter />
    </>
  );
};

export default MdxBookWrapper;