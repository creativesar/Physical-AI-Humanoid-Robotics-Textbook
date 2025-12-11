import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion, easeOut } from 'framer-motion';
import HeroBackground from './HeroBackground';
import styles from './PremiumHero.module.css';

function PremiumHero() {
  const { siteConfig } = useDocusaurusContext();

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <HeroBackground>
        <motion.div
          className={styles.textContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className={clsx('hero__title', styles.heroTitle)}
            variants={itemVariants}
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontSize: '4rem',
              lineHeight: 1.1,
              textShadow: '0 0 20px rgba(176, 224, 230, 0.7)',
              background: 'linear-gradient(90deg, #b0e0e6, #ffffff, #b0e0e6)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shine 3s linear infinite',
            }}
          >
            {siteConfig.title}
          </motion.h1>
          <motion.p
            className={clsx('hero__subtitle', styles.heroSubtitle)}
            variants={itemVariants}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.4rem',
              lineHeight: '1.6',
              color: '#e0f0f0',
              textShadow: '0 0 10px rgba(176, 224, 230, 0.5)',
              maxWidth: '700px',
              margin: '1.5rem auto',
            }}
          >
            {siteConfig.tagline}
          </motion.p>
          <motion.div
            className={styles.buttonContainer}
            variants={itemVariants}
          >
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  className="button button--secondary button--lg"
                  to="/#module-grid"
                  data-text="Explore Content"
                  style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 20,
                    textDecoration: 'none',
                  }}
                >
                  Explore Content
                </Link>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/intro"
                  data-text="Read Book"
                  style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 20,
                    textDecoration: 'none',
                  }}
                >
                  Read Book
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            className={styles.scrollIndicator}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 20
            }}
          >
            <motion.div
              animate={{
                y: [0, 10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: easeOut
              }}
              style={{
                width: '2px',
                height: '40px',
                background: 'linear-gradient(to bottom, transparent, #b0e0e6, transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      </HeroBackground>
    </header>
  );
}

export default PremiumHero;