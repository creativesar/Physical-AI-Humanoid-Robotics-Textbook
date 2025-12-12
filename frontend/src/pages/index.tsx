import React, { useState, useEffect, ReactElement, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

import styles from './index.module.css';

import WhatWeDoCompact from '../components/WhatWeDoCompact';
import PremiumHero from '../components/PremiumHero';

interface Module {
  id: string;
  path: string;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
  description: string;
}

// Animated Background with Parallax
function AnimatedBackground({ parallaxOffset = 0 }: { parallaxOffset?: number }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: -1,
    }}>
      {/* Server room background with circuit traces */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
      }}>
        {/* Distant glowing circuit traces */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 15%),
            radial-gradient(circle at 80% 70%, rgba(200, 200, 255, 0.05) 0%, transparent 15%),
            linear-gradient(90deg, transparent 49%, rgba(150, 150, 200, 0.03) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(150, 150, 200, 0.03) 50%, transparent 51%)
          `,
          backgroundSize: '50px 50px, 70px 70px, 30px 30px, 30px 30px',
          opacity: 0.3,
        }} />
      </div>

      {/* Volumetric god rays */}
      <motion.div
        animate={{
          opacity: [0.03, 0.08, 0.03],
          background: [
            'linear-gradient(45deg, transparent 60%, rgba(0, 200, 255, 0.03) 70%, transparent 80%)',
            'linear-gradient(45deg, transparent 40%, rgba(0, 200, 255, 0.03) 50%, transparent 60%)',
            'linear-gradient(45deg, transparent 60%, rgba(0, 200, 255, 0.03) 70%, transparent 80%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          transform: 'rotate(15deg)',
          zIndex: 1,
        }}
      />

      {/* Floating holographic panels in the background */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.05, 0.12, 0.05]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '120px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(0, 200, 255, 0.05), transparent)',
          border: '1px solid rgba(0, 200, 255, 0.08)',
          borderRadius: '4px',
          zIndex: 2,
        }}
      />
      <motion.div
        animate={{
          y: [15, -5, 15],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '90px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(0, 150, 200, 0.05), transparent)',
          border: '1px solid rgba(0, 150, 200, 0.08)',
          borderRadius: '4px',
          zIndex: 2,
        }}
      />

      {/* Plasma droplet animation */}
      <motion.div
        initial={{ top: '10%', opacity: 0 }}
        animate={{
          top: '85%',
          opacity: [0, 1, 0.8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          left: '50%',
          width: '12px',
          height: '12px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(0, 200, 255, 0.8) 70%, rgba(0, 100, 200, 0) 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 20px 5px rgba(0, 200, 255, 0.8), 0 0 40px 10px rgba(0, 150, 255, 0.5)',
          zIndex: 3,
        }}
      />

      {/* Additional plasma/fire effect around the droplet */}
      <motion.div
        initial={{ top: '10%', opacity: 0, scale: 0.5 }}
        animate={{
          top: '85%',
          opacity: [0, 0.7, 0.5, 0],
          scale: [0.5, 1.5, 0.8, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          left: '50%',
          width: '18px',
          height: '18px',
          background: 'radial-gradient(circle, rgba(0, 200, 255, 0.3) 0%, rgba(0, 150, 200, 0.2) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 2,
        }}
      />

      {/* Secondary plasma trails */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          initial={{ top: `${10 + i * 5}%`, opacity: 0, scale: 0 }}
          animate={{
            top: `${85 + i * 2}%`,
            opacity: [0, 0.6, 0.4, 0],
            scale: [0, 1.2, 0.6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5 + i * 0.3
          }}
          style={{
            position: 'absolute',
            left: `${50 + Math.sin(i) * 10}%`,
            width: '8px',
            height: '8px',
            background: `radial-gradient(circle, rgba(0, ${200 - i * 30}, 255, 0.4) 0%, rgba(0, ${150 - i * 20}, 200, 0.2) 70%, transparent)`,
            borderRadius: '50%',
            zIndex: 1,
          }}
        />
      ))}

      {/* Plasma flame wisps */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`wisp-${i}`}
          initial={{ top: '15%', left: '50%', opacity: 0, scale: 0 }}
          animate={{
            top: '80%',
            left: `${50 + Math.sin(i * 0.8) * 20}%`,
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.7 + i * 0.4
          }}
          style={{
            position: 'absolute',
            width: '4px',
            height: '20px',
            background: 'linear-gradient(to bottom, rgba(0, 200, 255, 0.8), rgba(0, 150, 200, 0.4), transparent)',
            borderRadius: '50%',
            zIndex: 1,
            transformOrigin: 'bottom center',
          }}
        />
      ))}

      {/* Glowing trail behind the droplet */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{
          height: '75%',
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '10%',
          width: '1px',
          height: '75%',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 200, 255, 0.1), transparent)',
          zIndex: 2,
        }}
      >
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '3px',
          height: '15%',
          left: '-1px',
          background: 'linear-gradient(to top, transparent, rgba(0, 200, 255, 0.3), transparent)',
          filter: 'blur(1px)',
        }} />
      </motion.div>

      {/* Hexagonal HUD rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '85%',
            left: '50%',
            width: `${60 + i * 40}px`,
            height: `${60 + i * 40}px`,
            border: '1px solid rgba(0, 200, 255, 0.3)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
      ))}

      {/* Shockwave at impact */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.8, 0],
          opacity: [0.4, 0, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          top: '85%',
          left: '50%',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(0, 200, 255, 0.5)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
        }}
      />

      {/* Micro-sparks spreading */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0.8, 0.4, 0],
            x: Math.cos(i * Math.PI / 6) * 80,
            y: Math.sin(i * Math.PI / 6) * 80,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 0.5 + (i * 0.1),
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '85%',
            left: '50%',
            width: '3px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            boxShadow: '0 0 8px 2px rgba(0, 200, 255, 0.8)',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
          }}
        />
      ))}

      {/* Holographic shards */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shard-${i}`}
          initial={{ scale: 0, opacity: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            scale: [0, 0.5, 0],
            opacity: [0.7, 0.3, 0],
            x: Math.cos(i * Math.PI / 4) * 120,
            y: Math.sin(i * Math.PI / 4) * 120,
            rotate: [0, i * 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 0.6 + (i * 0.08),
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '85%',
            left: '50%',
            width: '6px',
            height: '10px',
            background: 'linear-gradient(135deg, rgba(0, 200, 255, 0.8), transparent)',
            borderRadius: '1px',
            boxShadow: '0 0 10px 2px rgba(0, 200, 255, 0.5)',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
          }}
        />
      ))}

      {/* Rising cool cyan mist */}
      <motion.div
        initial={{ height: '0%' }}
        animate={{
          height: '20%',
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5
        }}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '0',
          width: '30%',
          height: '20%',
          background: 'linear-gradient(to top, rgba(0, 200, 200, 0.05), transparent)',
          zIndex: 2,
        }}
      />
    </div>
  );
}

// What We Do Section is now implemented using the premium component

// Services Section - Premium Robotics Lab Interface
function ServicesSection() {
  const services = [
    {
      title: 'Interactive Learning',
      features: [
        'Structured modules',
        'Practical tasks & assessments',
        'Real-time progress analytics'
      ],
      icon: '⚙️',
      color: '#0FE3C0'
    },
    {
      title: 'Expert Support',
      features: [
        'AI research assistant',
        'Instant problem solving',
        '24/7 technical guidance'
      ],
      icon: '🤖',
      color: '#0F96E3'
    },
    {
      title: 'Academic Resources',
      features: [
        'Research references',
        'Verified scientific explanations',
        'Case-based learning models'
      ],
      icon: '📚',
      color: '#A87EE5'
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'transparent',
        padding: '8rem 0',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #b0e0e6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Our Services
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#c0c0c0',
            fontSize: '1.2rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: 400,
          }}>
            Comprehensive solutions for academic excellence and technical innovation in Physical AI and Humanoid Robotics
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              style={{
                background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9), rgba(10, 10, 10, 0.8))',
                backdropFilter: 'blur(20px)',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(176, 224, 230, 0.15)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Top accent line with service color */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${service.color} 0%, transparent 100%)`,
              }} />

              {/* Icon container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${service.color}33 0%, ${service.color}0D 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  border: `1px solid ${service.color}33`,
                  fontSize: '1.8rem'
                }}
              >
                {service.icon}
              </motion.div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                margin: '0 0 1.5rem 0',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: service.color,
                lineHeight: 1.3
              }}>
                {service.title}
              </h3>

              {/* Features List */}
              <ul style={{
                fontFamily: 'Inter, sans-serif',
                color: '#E0E0E0',
                lineHeight: '1.8',
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {service.features.map((feature, i) => (
                  <li key={i} style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    fontSize: '1rem'
                  }}>
                    <span style={{
                      color: service.color,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      minWidth: '1.2rem',
                      marginTop: '0.1rem'
                    }}>✓</span>
                    <span style={{ color: '#c0c0c0', lineHeight: '1.6' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${service.color}14 0%, transparent 70%)`,
                pointerEvents: 'none'
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Trusted Partners Section
function TrustedPartnersSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'transparent',
        padding: '8rem 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Sora, sans-serif',
            color: '#ffffff',
            fontSize: '3rem',
            marginBottom: '3.5rem',
            textAlign: 'center',
            fontWeight: 800,
          }}
        >
          Trusted Partners
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
          {['MIT', 'Stanford', 'Berkeley', 'CMU', 'Oxford', 'ETH'].map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
              }}
            >
              <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#888888' }}>
                {partner}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Testimonial Section - Premium Scholarly Design
function TestimonialSection() {
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Researcher',
      text: 'An essential resource for serious learners of Physical AI. The clarity and depth are unmatched.',
      quotePrefix: '"',
      quoteSuffix: '"',
      avatar: 'SC',
      rating: 5
    },
    {
      name: 'Prof. Marcus Rivera',
      role: 'Robotics Scientist',
      text: 'The curriculum bridges theoretical sophistication with practical robotics engineering.',
      quotePrefix: '"',
      quoteSuffix: '"',
      avatar: 'MR',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'AI Educator',
      text: 'A transformative platform for understanding intelligent embodied systems.',
      quotePrefix: '"',
      quoteSuffix: '"',
      avatar: 'ER',
      rating: 5
    },
  ];

  // Function to render star ratings
  const renderRating = (rating: number) => {
    return (
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              color: i < rating ? '#0FE3C0' : '#444',
              fontSize: '1.2rem',
              marginRight: '0.2rem'
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'radial-gradient(circle at center, rgba(15, 227, 192, 0.05) 0%, transparent 70%)',
        padding: '8rem 0',
        position: 'relative',
      }}
    >
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15, 227, 192, 0.2) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15, 227, 192, 0.15) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'Sora, sans-serif',
              color: '#ffffff',
              fontSize: '3.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            What Users Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              color: '#c0c0c0',
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: 400,
            }}
          >
            Insights from leading researchers, educators, and professionals in Physical AI and robotics
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -12,
                transition: { duration: 0.3 },
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(15, 227, 192, 0.3)'
              }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{
                background: 'linear-gradient(145deg, #0f0f0f, #0a0a0a)',
                backdropFilter: 'blur(25px)',
                padding: '2.5rem',
                borderRadius: '24px',
                border: '1px solid rgba(80, 80, 80, 0.4)',
                textAlign: 'left',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(80, 80, 80, 0.2)',
              }}
            >
              {/* Decorative corner element */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(15, 227, 192, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(15, 227, 192, 0.2)',
              }}>
                <span style={{
                  color: '#0FE3C0',
                  fontSize: '1.5rem',
                  transform: 'rotate(180deg)',
                  display: 'block'
                }}>❝</span>
              </div>

              {/* Avatar and rating */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0FE3C0 0%, #0a8f7a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#000',
                  marginRight: '1rem',
                  boxShadow: '0 5px 15px rgba(15, 227, 192, 0.3)'
                }}>
                  {testimonial.avatar}
                </div>
                <div>
                  {renderRating(testimonial.rating)}
                </div>
              </div>

              <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#e0e0e0',
                fontSize: '1.25rem',
                lineHeight: '1.8',
                marginBottom: '2rem',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 2,
                paddingLeft: '1rem',
                borderLeft: '3px solid #0FE3C0'
              }}>
                {testimonial.quotePrefix}{testimonial.text}{testimonial.quoteSuffix}
              </p>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <p style={{
                  fontFamily: 'Sora, sans-serif',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  margin: '0.2rem 0',
                }}>
                  {testimonial.name}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: '#0FE3C0',
                  fontSize: '1.05rem',
                  margin: '0.3rem 0',
                  fontStyle: 'normal',
                  fontWeight: 500
                }}>
                  {testimonial.role}
                </p>
              </div>

              {/* Subtle animated wave effect at bottom */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  background: 'linear-gradient(90deg, transparent, #0FE3C0, transparent)',
                  opacity: 0.3
                }}
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          style={{
            textAlign: 'center',
            marginTop: '4rem'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #0FE3C0 0%, #0a8f7a 100%)',
              color: '#000',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: '1.1rem',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(15, 227, 192, 0.4)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 15px 30px rgba(15, 227, 192, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Join Our Community
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Hero Section using PremiumHero component
function HeroSection() {
  return <PremiumHero />;
}

// Parallax Section Component
function ParallaxSection({
  children,
  background = 'transparent',
}: {
  children: React.ReactNode;
  background?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'relative',
        background,
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

// About / Academic Excellence Section
function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      style={{
        padding: '6.5rem 0',
        position: 'relative',
        background: '#000000', // Deep black matte background
      }}
    >
      {/* Soft atmospheric shadows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '0',
        boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.9), inset 0 0 80px rgba(0, 0, 0, 0.7)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '7rem',
        }}>
          {/* Left Content - Editorial Layout */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: '2.2rem',
            }}
          >
            {/* Ultra minimal pill label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                display: 'inline-block',
                padding: '0.65rem 1.5rem',
                background: 'rgba(15, 227, 192, 0.03)',
                backdropFilter: 'blur(5px)',
                borderRadius: '30px',
                border: '1px solid rgba(15, 227, 192, 0.1)',
              }}
            >
              <p style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#0FE3C0',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                margin: 0,
              }}>
                Academic Excellence
              </p>
            </motion.div>

            {/* Main Heading - Editorial Display */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '2.8rem',
                fontWeight: 800,
                lineHeight: '1.18',
                color: '#ffffff',
                marginBottom: '1.7rem',
                letterSpacing: '-0.015em',
              }}
            >
              Advancing Physical AI & <br />Humanoid Robotics
            </motion.h2>

            {/* Supporting paragraph - Research-style academic prose */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.1rem',
                lineHeight: '1.75',
                color: '#D8E0DF',
                marginBottom: '2.8rem',
                letterSpacing: '-0.005em',
              }}
            >
              Pioneering research-grade educational resources that bridge theoretical AI frameworks with
              practical humanoid robotics applications. Our curriculum maintains the highest standards of
              academic rigor while fostering technological innovation.
            </motion.p>

            {/* Premium Buttons - Rectangular-rounded shape */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                display: 'flex',
                gap: '1.4rem',
                flexWrap: 'wrap',
              }}
            >
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: 'relative',
                }}
              >
                <Link
                  to="/docs/intro"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 227, 192, 0.08)',
                    color: '#0FE3C0',
                    padding: '1rem 1.8rem',
                    borderRadius: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(15, 227, 192, 0.2)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2, marginRight: '0.6rem' }}>Explore Curriculum</span>
                  <span style={{ position: 'relative', zIndex: 2 }}>→</span>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(15, 227, 192, 0.15), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                      zIndex: 1,
                    }}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: 'relative',
                }}
              >
                <Link
                  to="/modules"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: '#D8E0DF',
                    padding: '1rem 1.8rem',
                    borderRadius: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: 1,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 2, marginRight: '0.6rem' }}>View Modules</span>
                  <span style={{ position: 'relative', zIndex: 2 }}>→</span>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
                      transform: 'translateX(-100%)',
                      transition: 'transform 0.6s ease',
                      zIndex: 1,
                    }}
                  />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - High-End Academic Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.8rem',
          }}>
            {[
              {
                icon: '🔬',
                title: 'Academic Rigor',
                description: 'Peer-reviewed content meeting international standards'
              },
              {
                icon: '⚙️',
                title: 'Precision Engineering',
                description: 'Systematic approach to robotics education'
              },
              {
                icon: '📚',
                title: 'Comprehensive Curriculum',
                description: '19 modules from fundamentals to advanced systems'
              },
              {
                icon: '🧠',
                title: 'Cognitive Systems',
                description: 'Advanced AI and humanoid robotics research'
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                whileHover={{ y: -6 }}
                style={{
                  position: 'relative',
                  background: 'rgba(10, 10, 10, 0.8)',
                  borderRadius: '26px',
                  padding: '2.2rem 1.8rem',
                  border: '1px solid rgba(15, 227, 192, 0.08)',
                  boxShadow: `
                    0 15px 40px rgba(0, 0, 0, 0.6),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.2),
                    0 0 0 1px rgba(15, 227, 192, 0.03)
                  `,
                  transition: 'all 0.2s ease',
                  overflow: 'hidden',
                  zIndex: 2,
                }}
              >
                {/* Subtle radial highlight */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle at 30% 30%, rgba(15, 227, 192, 0.05), transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ type: 'tween', stiffness: 200, damping: 10 }}
                    style={{
                      fontSize: '2.6rem',
                      marginBottom: '1.3rem',
                      color: '#0FE3C0',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {card.icon}
                  </motion.div>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.9rem',
                    lineHeight: '1.3',
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    color: '#B0BEC5',
                    lineHeight: '1.55',
                  }}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Counter Component for animated numbers
const Counter = ({ target, prefix = '', suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let animationFrame;
    if (inView && count < target) {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const updateCount = () => {
        const now = Date.now();
        const elapsed = Math.min(now - startTime, duration);
        const progress = elapsed / duration;

        // Ease-out function
        const easeProgress = 1 - Math.pow(1 - progress, 2);

        const currentValue = Math.floor(easeProgress * target);
        setCount(Math.min(currentValue, target));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, target, duration, count]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

// Statistics Section - Premium Real-time Counters
function StatsSection() {
  const stats = [
    { end: 19, label: 'Comprehensive Modules', description: 'From fundamentals to advanced robotics systems', icon: '📚', prefix: '', suffix: '' },
    { end: 100, label: 'Learning Objectives', description: 'Clear, measurable academic outcomes', icon: '🎯', prefix: '', suffix: '+' },
    { end: 1000, label: 'Technical Concepts', description: 'Documented, visualized, and explained', icon: '⚙️', prefix: '', suffix: '+' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'transparent',
        padding: '8rem 0',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, #b0e0e6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            Platform Overview
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: '#c0c0c0',
            fontSize: '1.2rem',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: 400,
          }}>
            Real-time metrics showcasing our comprehensive educational platform
          </p>
        </motion.div>

        {/* Stats Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              style={{
                background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9), rgba(10, 10, 10, 0.8))',
                backdropFilter: 'blur(20px)',
                padding: '3rem 2.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(176, 224, 230, 0.15)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, rgba(176, 224, 230, 0.5) 0%, transparent 100%)',
              }} />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  fontSize: '3rem',
                  marginBottom: '1.5rem',
                  display: 'inline-block'
                }}
              >
                {stat.icon}
              </motion.div>

              {/* Counter Display */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #b0e0e6 0%, #80c0d0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  lineHeight: 1,
                  letterSpacing: '-0.02em'
                }}
              >
                <Counter target={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
              </motion.div>

              {/* Label */}
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                color: '#ffffff',
                fontSize: '1.4rem',
                marginBottom: '1rem',
                fontWeight: 700,
                lineHeight: 1.3
              }}>
                {stat.label}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: '#b0c0c0',
                fontSize: '1rem',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {stat.description}
              </p>

              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                bottom: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(176, 224, 230, 0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Curriculum Highlights
function CurriculumSection() {
  const highlights = [
    {
      title: 'Foundational Concepts',
      modules: ['Physical AI Fundamentals', 'Robotics & Mechatronics', 'ROS 2 Architecture'],
      color: '#888888',
    },
    {
      title: 'Core Technologies',
      modules: ['Kinematics & Dynamics', 'Sensor Systems', 'Simulation Platforms'],
      color: '#5a8a7b',
    },
    {
      title: 'Advanced Systems',
      modules: ['Humanoid Control', 'Vision-Language Models', 'System Integration'],
      color: '#4a7a6f',
    },
  ];

  return (
    <section
      style={{
        background: 'transparent',
        padding: '8rem 0',
        borderBottom: 'none',
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Sora, sans-serif',
            color: '#fff',
            fontSize: '3rem',
            marginBottom: '3.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #888888 0%, #e0e0e0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          Curriculum Structure
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {highlights.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12, boxShadow: `0 30px 60px ${section.color}25` }}
              style={{
                background: `linear-gradient(135deg, rgba(200, 200, 200, 0.08) 0%, rgba(180, 180, 180, 0.04) 100%)`,
                backdropFilter: 'blur(10px)',
                padding: '2.8rem',
                borderRadius: '16px',
                border: 'none',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: idx * 0.15 + 0.1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: `linear-gradient(90deg, ${section.color} 0%, transparent 100%)`,
                  transformOrigin: 'left',
                }}
              />
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                color: section.color,
                fontSize: '1.6rem',
                marginBottom: '1.8rem',
                fontWeight: 800,
              }}>
                {section.title}
              </h3>
              <ul style={{ fontFamily: 'Inter, sans-serif', color: '#c0c0c0', lineHeight: '2.3', listStyle: 'none', padding: 0 }}>
                {section.modules.map((mod, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 + i * 0.05 }}
                    style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}
                  >
                    <span style={{ color: section.color, fontSize: '1.3rem', fontWeight: 700 }}>✓</span>
                    <span>{mod}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Module Grid with Staggered Animation
function ModuleGrid() {
  const ref = useRef(null);
  const modules = [
    { id: '01', path: '01-introduction-to-physical-ai', title: 'Introduction to Physical AI', description: 'Understanding Physical AI and embodied intelligence fundamentals', icon: '🤖' },
    { id: '02', path: '02-robotics-mechatronics-fundamentals', title: 'Robotics Fundamentals', description: 'Mechanical structures, actuators, and control systems', icon: '⚙️' },
    { id: '03', path: '03-ros2-foundations', title: 'ROS 2 Foundations', description: 'Middleware architecture and communication patterns', icon: '🔌' },
    { id: '04', path: '04-urdf-robot-description-models', title: 'URDF & Robot Models', description: 'Robot description formats and visualization', icon: '📐' },
    { id: '05', path: '05-kinematics', title: 'Kinematics', description: 'Forward/inverse kinematics and transformations', icon: '📏' },
    { id: '06', path: '06-robot-dynamics-humanoid-control', title: 'Dynamics & Control', description: 'Physics-based control and humanoid stability', icon: '⚡' },
  ];

  return (
    <motion.section
      ref={ref}
      style={{
        background: 'transparent',
        padding: '8rem 0',
        borderBottom: 'none',
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Sora, sans-serif',
            color: '#fff',
            fontSize: '3rem',
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #e0e0e0 0%, #cccccc 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          Featured Modules
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'Inter, sans-serif', color: '#a0a0a0', textAlign: 'center', marginBottom: '3rem', fontSize: '1.15rem', fontWeight: 500 }}
        >
          Start with foundational concepts and progress to advanced systems
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2.5rem', marginBottom: '2rem' }}>
          {modules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -14, boxShadow: '0 35px 70px rgba(200, 200, 200, 0.15)' }}
              style={{
                background: 'linear-gradient(135deg, rgba(200, 200, 200, 0.05) 0%, rgba(180, 180, 180, 0.03) 100%)',
                backdropFilter: 'blur(10px)',
                padding: '2.5rem',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 + 0.15 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'linear-gradient(180deg, #888888 0%, transparent 100%)',
                }}
              />
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{module.icon}</div>
              <h3 style={{ fontFamily: 'Sora, sans-serif', color: '#888888', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>
                Module {module.id}
              </h3>
              <h4 style={{ fontFamily: 'Sora, sans-serif', color: '#fff', fontSize: '1.35rem', marginBottom: '1rem', fontWeight: 700, lineHeight: '1.3' }}>
                {module.title}
              </h4>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#a8a8a8', fontSize: '0.98rem', marginBottom: '1.5rem', lineHeight: '1.7', fontWeight: 500 }}>
                {module.description}
              </p>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={`/docs/${module.path}`}
                  style={{
                    color: '#888888',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px',
                  }}
                >
                  Explore →
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/modules"
              className="button button--secondary"
              style={{
                fontFamily: 'Sora, sans-serif',
                background: 'linear-gradient(135deg, #888888 0%, #e0e0e0 100%)',
                borderColor: 'transparent',
                color: '#000',
                fontWeight: 700,
                fontSize: '1.05rem',
                padding: '1rem 2.5rem',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                border: 'none',
                boxShadow: '0 10px 30px rgba(200, 200, 200, 0.15)',
              }}
            >
              View All 19 Modules
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Technology Stack
function TechStackSection() {
  const stacks = [
    {
      title: 'Frontend',
      techs: ['Docusaurus', 'React', 'TypeScript', 'TailwindCSS'],
    },
    {
      title: 'Backend',
      techs: ['FastAPI', 'Python', 'PostgreSQL', 'Qdrant'],
    },
    {
      title: 'AI Integration',
      techs: ['Cohere API', 'RAG', 'Vector Embeddings', 'NLP'],
    },
    {
      title: 'Robotics',
      techs: ['ROS 2', 'Gazebo', 'Isaac Sim', 'URDF'],
    },
  ];

  return (
    <section
      style={{
        background: 'transparent',
        padding: '8rem 0',
        borderBottom: 'none',
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'Sora, sans-serif',
            color: '#fff',
            fontSize: '3rem',
            marginBottom: '3.5rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #888888 0%, #e0e0e0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          Modern Technology Stack
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {stacks.map((stack, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(200, 200, 200, 0.1)' }}
              style={{
                background: `linear-gradient(135deg, rgba(200, 200, 200, 0.08) 0%, rgba(180, 180, 180, 0.04) 100%)`,
                backdropFilter: 'blur(10px)',
                padding: '2.8rem',
                borderRadius: '16px',
                border: 'none',
                transition: 'all 0.4s ease',
              }}
            >
              <h4 style={{ fontFamily: 'Sora, sans-serif', color: '#888888', marginBottom: '2rem', fontSize: '1.35rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                {stack.title}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {stack.techs.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08, y: -3 }}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.95rem',
                      background: 'rgba(200, 200, 200, 0.12)',
                      color: '#c0c0c0',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      fontWeight: 500,
                      display: 'inline-block',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section with Full Parallax Background
function CTASection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'transparent',
        padding: '10rem 0',
        borderBottom: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}>
        <motion.div
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(200, 200, 200, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '-300px',
            right: '-300px',
            y,
          }}
        />
      </div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #e0e0e0 0%, #cccccc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              lineHeight: '1.2',
              letterSpacing: '-1px',
            }}
          >
            Ready to Master Physical AI & Humanoid Robotics?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.25rem',
              color: '#c0c0c0',
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: '2',
              fontWeight: 500,
            }}
          >
            Start your journey with our comprehensive, academically rigorous textbook. Learn from research-grade material designed for students, researchers, and professionals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
                style={{
                  background: 'linear-gradient(135deg, #888888 0%, #e0e0e0 100%)',
                  borderColor: 'transparent',
                  color: '#000',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '1.1rem 3rem',
                  boxShadow: '0 20px 50px rgba(200, 200, 200, 0.15)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  letterSpacing: '0.5px',
                }}
              >
                🚀 Begin Learning Now
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                className="button button--outline button--lg"
                to="/modules"
                style={{
                  borderColor: 'transparent',
                  color: '#888888',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '1.1rem 3rem',
                  background: 'rgba(200, 200, 200, 0.08)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  letterSpacing: '0.5px',
                }}
              >
                Explore All Modules
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home(): ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="Physical AI & Humanoid Robotics Textbook - Academic-grade educational platform"
    >
      <HeroSection />
      <AboutSection />
      <WhatWeDoCompact />
      <ServicesSection />
      <StatsSection />
      <TestimonialSection />
    </Layout>
  );
}