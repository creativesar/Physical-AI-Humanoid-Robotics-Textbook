import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';
import styles from './PremiumHero.module.css';

function PremiumHero() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <HeroBackground>
        <motion.div
          className={styles.textContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={clsx('hero__title', styles.heroTitle)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {siteConfig.title}
          </motion.h1>
          <motion.p
            className={clsx('hero__subtitle', styles.heroSubtitle)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {siteConfig.tagline}
          </motion.p>
          <motion.div
            className={styles.buttonContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Begin Your Journey
            </Link>
          </motion.div>
        </motion.div>
      </HeroBackground>
    </header>
  );
}

export default PremiumHero;