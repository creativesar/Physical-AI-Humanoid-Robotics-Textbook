import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './professionalSlider.module.css';

const ProfessionalSlider = ({ children, autoPlay = false, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const intervalId = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(intervalId);
  }, [autoPlay, interval, isPaused]);

  return (
    <div 
      className={styles.sliderContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.slider}>
        <button 
          className={clsx(styles.navButton, styles.prevButton)}
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        <div className={styles.slidesContainer}>
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className={clsx(
                styles.slide,
                { [styles.active]: index === currentIndex }
              )}
            >
              {child}
            </div>
          ))}
        </div>
        
        <button 
          className={clsx(styles.navButton, styles.nextButton)}
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      
      <div className={styles.indicators}>
        {React.Children.map(children, (_, index) => (
          <button
            key={index}
            className={clsx(
              styles.indicator,
              { [styles.active]: index === currentIndex }
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSlider;