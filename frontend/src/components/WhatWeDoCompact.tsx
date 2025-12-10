import React from 'react';
import clsx from 'clsx';
import styles from './WhatWeDoCompact.module.css';
import { motion } from 'framer-motion';

const WhatWeDoPremium = () => {
  const features = [
    {
      title: "Applied Humanoid Engineering",
      description: "Hands-on development methods for locomotion, perception, control, and robot embodiment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      title: "Physical AI Systems",
      description: "Frameworks for sensorimotor intelligence, embodied cognition, and adaptive robotic behavior.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "AI-Native Learning Tools",
      description: "Intelligent textbooks, interactive modules, and automated learning systems for robotics education.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Research-Aligned Curriculum",
      description: "Peer-reviewed modules structured for university-level robotics and advanced research programs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      title: "Hardware & System Integration",
      description: "Real-world robotics workflows, hardware interfacing, sensors, actuators, and embedded systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Innovation & Lab Applications",
      description: "Cutting-edge robotics experiments, engineering patterns, and applied implementation guides.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <section className={clsx(styles.section, 'margin-vert--lg')}>
      <div className="container padding-horiz--md">
        <div className="row">
          <div className="col col--12 text--center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h2 style={{ 
                  fontFamily: 'Sora, sans-serif', 
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #ffffff 0%, #a0f0e0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                  position: 'relative',
                  zIndex: 2
                }}>
                  What We Do
                </h2>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(15, 227, 192, 0.15) 0%, transparent 70%)',
                  zIndex: 1,
                  borderRadius: '50%',
                  filter: 'blur(20px)'
                }} />
              </div>
              
              <div style={{ 
                maxWidth: '800px', 
                margin: '0 auto 4rem',
                position: 'relative',
                zIndex: 2
              }}>
                <motion.p 
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    color: '#c9d6d6',
                    lineHeight: '1.8',
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    margin: 0
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  We structure academically rigorous, research-driven frameworks that bridge theoretical AI, embodied intelligence, and practical humanoid robotics engineering. Our work combines deep scientific foundations with real-world robotic implementations.
                </motion.p>
              </div>
            </motion.div>
            
            <div className="row">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="col col--4 padding--sm"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                >
                  <motion.div
                    style={{
                      padding: '2.5rem 2rem',
                      borderRadius: '28px',
                      backgroundColor: 'rgba(10, 20, 30, 0.6)',
                      height: '100%',
                      backdropFilter: 'blur(12px)',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    }}
                    whileHover={{ 
                      y: -12,
                      boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(15, 227, 192, 0.3)'
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div style={{ 
                      position: 'absolute',
                      top: '-1px',
                      left: '-1px',
                      right: '-1px',
                      bottom: '-1px',
                      borderRadius: '28px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      zIndex: -1
                    }} />
                    
                    <div style={{ 
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(15, 227, 192, 0.15) 0%, transparent 70%)',
                      zIndex: 0
                    }} />
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      marginBottom: '1.5rem',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <motion.div 
                        style={{ 
                          color: '#0fe3c0', 
                          marginRight: '1.5rem', 
                          flexShrink: 0,
                          padding: '12px',
                          borderRadius: '16px',
                          background: 'rgba(15, 227, 192, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 style={{ 
                        fontFamily: 'Sora, sans-serif', 
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.3
                      }}>
                        {feature.title}
                      </h3>
                    </div>
                    <p style={{ 
                      fontFamily: 'Inter, sans-serif', 
                      fontSize: '1.05rem', 
                      color: '#b0c0c0', 
                      margin: 0,
                      lineHeight: '1.7',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      {feature.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoPremium;