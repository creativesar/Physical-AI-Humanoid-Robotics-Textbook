import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './mdxBook.module.css';

const MDXBook = ({ onClose }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sample book chapters data
  const chapters = [
    { id: 1, title: 'Introduction to Physical AI', content: 'Physical AI combines artificial intelligence with physical systems to create machines that can interact with the real world intelligently, learning and adapting to their environment through sensors and actuators.' },
    { id: 2, title: 'Humanoid Robotics Fundamentals', content: 'Humanoid robots represent the pinnacle of robotics research, combining advanced AI, mechanics, and perception to create machines that can navigate and interact in human environments seamlessly.' },
    { id: 3, title: 'ROS 2 Integration', content: 'Robot Operating System (ROS) 2 provides a flexible framework for writing robot software, offering communication between processes, hardware abstraction, and device drivers.' },
    { id: 4, title: 'Simulation Environments', content: 'Gazebo and Unity provide powerful simulation environments for testing and developing humanoid robots before deployment in real-world scenarios.' },
    { id: 5, title: 'NVIDIA Isaac Framework', content: 'The Isaac platform accelerates the development and deployment of production-ready robotics applications with advanced AI capabilities.' },
    { id: 6, title: 'Vision-Language-Action Models', content: 'Modern AI models that integrate visual perception, language understanding, and action selection for humanoid robots.' },
    { id: 7, title: 'Advanced Control Systems', content: 'Advanced control algorithms for precise movement and interaction in humanoid robotics.' },
    { id: 8, title: 'Future of Physical AI', content: 'Exploring the future possibilities and challenges in Physical AI and humanoid robotics.' }
  ];

  const handleChapterChange = (index) => {
    setCurrentChapter(index);
    setIsMenuOpen(false);
  };

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        nextChapter();
      } else if (e.key === 'ArrowLeft') {
        prevChapter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapter, onClose]);

  return (
    <div className={styles.bookContainer}>
      {/* Header */}
      <header className={styles.bookHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.bookTitle}>Physical AI Humanoid Robotics</h1>
          <div className={styles.headerActions}>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close book"
            >
              ✕
            </button>
            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={styles.bookLayout}>
        {/* Table of Contents */}
        <nav className={clsx(styles.tableOfContents, {[styles.menuOpen]: isMenuOpen})}>
          <h3 className={styles.tocTitle}>Table of Contents</h3>
          <ul className={styles.tocList}>
            {chapters.map((chapter, index) => (
              <li
                key={chapter.id}
                className={clsx(styles.tocItem, {[styles.active]: currentChapter === index})}
                onClick={() => handleChapterChange(index)}
              >
                <span className={styles.chapterNumber}>{index + 1}.</span>
                <span className={styles.chapterTitle}>{chapter.title}</span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Chapter Content */}
        <main className={styles.chapterContent}>
          <div className={styles.chapterHeader}>
            <div className={styles.chapterInfo}>
              <span className={styles.chapterBadge}>Chapter {currentChapter + 1}</span>
              <h2 className={styles.chapterTitle}>{chapters[currentChapter].title}</h2>
            </div>
            <div className={styles.chapterProgress}>
              <span>{currentChapter + 1} of {chapters.length}</span>
            </div>
          </div>

          <div className={styles.chapterBody}>
            <p className={styles.chapterText}>{chapters[currentChapter].content}</p>
          </div>

          <div className={styles.chapterNavigation}>
            <button
              className={clsx(styles.navButton, styles.prevButton)}
              onClick={prevChapter}
              disabled={currentChapter === 0}
            >
              ← Previous
            </button>
            <button
              className={clsx(styles.navButton, styles.nextButton)}
              onClick={nextChapter}
              disabled={currentChapter === chapters.length - 1}
            >
              Next →
            </button>
          </div>
        </main>
      </div>

      {/* Progress indicator */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MDXBook;