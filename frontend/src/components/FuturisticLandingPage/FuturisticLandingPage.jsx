import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './FuturisticLandingPage.module.css';

const FuturisticLandingPage = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate particles for background effect
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: Math.random() * 0.5 + 0.1,
        originalSize: Math.random() * 3 + 1,
      });
    }
    setParticles(newParticles);
    setIsLoaded(true);
  }, []);

  // Track mouse position for hover effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;

          // Bounce off edges
          if (newX > 100 || newX < 0) {
            return { ...p, x: newX > 100 ? 0 : 100, speedX: -p.speedX };
          }

          if (newY > 100) {
            return { ...p, y: 0, speedY: Math.random() * 0.5 + 0.1 };
          }

          return { ...p, x: newX, y: newY };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [particles]);

  // Calculate distance for mouse interaction
  const calculateDistance = (element, mouseX, mouseY) => {
    const rect = element.getBoundingClientRect();
    const elemX = rect.left + rect.width / 2;
    const elemY = rect.top + rect.height / 2;
    const distance = Math.sqrt(Math.pow(mouseX - elemX, 2) + Math.pow(mouseY - elemY, 2));
    return distance;
  };

  // Create interactive grid lines between particles
  const drawGridLines = () => {
    if (!isLoaded) return null;

    // Find particles that are close to the mouse
    const nearbyParticles = particles.filter(p =>
      calculateDistance(
        { getBoundingClientRect: () => ({
          left: (p.x * window.innerWidth) / 100,
          top: (p.y * window.innerHeight) / 100,
          width: p.size,
          height: p.size
        })},
        mousePosition.x,
        mousePosition.y
      ) < 150
    );

    // Create lines between nearby particles
    const lines = [];
    for (let i = 0; i < nearbyParticles.length; i++) {
      for (let j = i + 1; j < nearbyParticles.length; j++) {
        const dx = (nearbyParticles[i].x - nearbyParticles[j].x) * window.innerWidth / 100;
        const dy = (nearbyParticles[i].y - nearbyParticles[j].y) * window.innerHeight / 100;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          lines.push({
            id: `${i}-${j}`,
            x1: nearbyParticles[i].x,
            y1: nearbyParticles[i].y,
            x2: nearbyParticles[j].x,
            y2: nearbyParticles[j].y,
            opacity: 1 - (distance / 150),
            length: distance
          });
        }
      }
    }

    return (
      <div className={styles.gridLines}>
        {lines.map((line) => (
          <div
            key={line.id}
            className={styles.gridLine}
            style={{
              left: `${line.x1}%`,
              top: `${line.y1}%`,
              width: `${line.length}px`,
              height: '1px',
              transform: `rotate(${Math.atan2(
                (line.y2 - line.y1) * window.innerHeight / 100,
                (line.x2 - line.x1) * window.innerWidth / 100
              )}rad)`,
              opacity: line.opacity,
              background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={clsx(styles.landingPage, styles.darkTheme)}>
      {/* Animated particle background */}
      <div className={styles.particleBackground}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transform: isLoaded && calculateDistance(
                { getBoundingClientRect: () => ({
                  left: (particle.x * window.innerWidth) / 100,
                  top: (particle.y * window.innerHeight) / 100,
                  width: particle.size,
                  height: particle.size
                })},
                mousePosition.x,
                mousePosition.y
              ) < 100
                ? `scale(${1 + (100 - calculateDistance(
                    { getBoundingClientRect: () => ({
                      left: (particle.x * window.innerWidth) / 100,
                      top: (particle.y * window.innerHeight) / 100,
                      width: particle.size,
                      height: particle.size
                    })},
                    mousePosition.x,
                    mousePosition.y
                  )) / 200})`
                : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          />
        ))}
      </div>

      {/* Interactive grid lines */}
      {drawGridLines()}

      {/* Main content */}
      <div className={clsx(styles.container, isLoaded && styles.loaded)}>
        <header className={styles.header}>
          <h1 className={clsx(styles.mainTitle, isLoaded && styles.animateIn)}>
            <span className={styles.glowText}>PHYSICAL AI</span>
            <br />
            <span className={styles.subtitle}>Humanoid Robotics</span>
          </h1>
          <p className={clsx(styles.tagline, isLoaded && styles.animateIn)}>
            The Future of Intelligent Machines is Here
          </p>
        </header>

        <section className={styles.features}>
          <div
            className={clsx(styles.featureCard, isLoaded && styles.animateIn)}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className={styles.featureIcon}>🤖</div>
            <h3 className={styles.featureTitle}>Advanced AI</h3>
            <p className={styles.featureDescription}>
              Cutting-edge artificial intelligence powering next-generation robotics
            </p>
          </div>

          <div
            className={clsx(styles.featureCard, isLoaded && styles.animateIn)}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className={styles.featureIcon}>🦾</div>
            <h3 className={styles.featureTitle}>Humanoid Design</h3>
            <p className={styles.featureDescription}>
              Biomimetic engineering for natural human-like movement and interaction
            </p>
          </div>

          <div
            className={clsx(styles.featureCard, isLoaded && styles.animateIn)}
            style={{ transitionDelay: '0.6s' }}
          >
            <div className={styles.featureIcon}>🌐</div>
            <h3 className={styles.featureTitle}>Real World</h3>
            <p className={styles.featureDescription}>
              Practical applications in industry, healthcare, and everyday life
            </p>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <button className={clsx(styles.ctaButton, styles.glowButton, isLoaded && styles.animateIn)}>
            <span className={styles.buttonText}>EXPLORE THE FUTURE</span>
          </button>
        </section>

        <footer className={clsx(styles.footer, isLoaded && styles.fadeIn)}>
          <p className={styles.footerText}>© {new Date().getFullYear()} Physical AI & Humanoid Robotics</p>
        </footer>
      </div>
    </div>
  );
};

export default FuturisticLandingPage;