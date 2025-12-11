import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';

const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're on the home page
  const isHomePage = pathname === '/' || pathname === '/index.html';

  if (isHomePage) {
    // Don't show header on home page since it has the premium hero
    return null;
  }

  return (
    <header
      className={clsx('navbar', 'navbar--fixed-top', {
        'navbar--dark': true,
        'navbar--primary': true,
        'scrolled': scrolled,
      })}
      style={{
        backgroundColor: scrolled ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.98)',
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid rgba(176, 224, 230, 0.2)' : '1px solid rgba(176, 224, 230, 0.3)',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="navbar__inner">
        <div className="navbar__items">
          <Link className="navbar__brand" to="/" style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            color: '#b0e0e6',
            textDecoration: 'none'
          }}>
            <div className="navbar__title" itemProp="name" style={{
              color: '#b0e0e0',
              fontSize: '1.4rem'
            }}>
              {siteConfig.title}
            </div>
          </Link>
        </div>
        
        <div className="navbar__items navbar__items--right">
          <Link
            className="navbar__item navbar__link"
            style={{
              fontFamily: 'Sora, sans-serif',
              color: scrolled ? '#b0e0e6' : '#d0f0f0',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            to="/docs/intro"
          >
            Textbook
          </Link>
          <Link
            className="navbar__item navbar__link"
            style={{
              fontFamily: 'Sora, sans-serif',
              color: scrolled ? '#b0e0e6' : '#d0f0f0',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            to="/modules"
          >
            Modules
          </Link>
          <Link
            className="navbar__item navbar__link"
            style={{
              fontFamily: 'Sora, sans-serif',
              color: scrolled ? '#b0e0e6' : '#d0f0f0',
              fontWeight: 500,
              transition: 'color 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            href="https://github.com/PhysicalAI/Physical-AI-Humanoid-Robotics-Textbook"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;