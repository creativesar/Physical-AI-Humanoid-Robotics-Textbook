import React, { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './CommonHeader.module.css';

const CommonHeader = ({ onBookClick, isBookMode = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side to ensure proper rendering
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Only render interactive elements on client side
  const MenuButton = ExecutionEnvironment.canUseDOM ? (
    <button
      className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
      type="button"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  ) : null;

  const BookButtonMobile = ExecutionEnvironment.canUseDOM ? (
    <button
      className={styles.bookButtonMobile}
      onClick={onBookClick}
      type="button"
    >
      📚
    </button>
  ) : null;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>Physical AI & Humanoid Robotics</h1>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen && ExecutionEnvironment.canUseDOM ? styles.navOpen : ''}`}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/docs/intro" className={styles.navLink}>Textbook</a>
          <a href="/blog" className={styles.navLink}>Blog</a>
          <a href="https://github.com/facebook/docusaurus" className={styles.navLink}>GitHub</a>
          <button
            className={styles.bookButton}
            onClick={onBookClick}
            type="button"
          >
            Open Book
          </button>
        </nav>

        <div className={styles.headerActions}>
          {BookButtonMobile}
          {MenuButton}
        </div>
      </div>
    </header>
  );
};

export default CommonHeader;