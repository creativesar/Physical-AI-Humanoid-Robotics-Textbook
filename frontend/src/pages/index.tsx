import React, { useState, useEffect, ReactElement, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { motion, useScroll, useTransform } from 'framer-motion';

import styles from './index.module.css';

import WhatWeDoCompact from '../components/WhatWeDoCompact';

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
            radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.05) 0%, transparent 15%),
            radial-gradient(circle at 80% 70%, rgba(0, 200, 255, 0.05) 0%, transparent 15%),
            linear-gradient(90deg, transparent 49%, rgba(0, 150, 200, 0.03) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(0, 150, 200, 0.03) 50%, transparent 51%)
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
            background: `radial-gradient(circle, rgba(0, ${200 - i*30}, 255, 0.4) 0%, rgba(0, ${150 - i*20}, 200, 0.2) 70%, transparent)`,
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

// Services Section
function ServicesSection() {
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
          Our Services
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {[
            { title: 'Interactive Learning', features: ['19 structured modules', 'Interactive exercises', 'Progress tracking'] },
            { title: 'Expert Support', features: ['AI-powered chatbot', 'Instant answers', '24/7 availability'] },
            { title: 'Academic Resources', features: ['Peer-reviewed content', 'Research references', 'Case studies'] },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(20px)',
                padding: '2.8rem',
                borderRadius: '16px',
                transition: 'all 0.4s ease',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.08)',
              }}
            >
              <h3 style={{ fontFamily: 'Sora, sans-serif', color: '#ffffff', fontSize: '1.6rem', marginBottom: '1.8rem', fontWeight: 800 }}>
                {service.title}
              </h3>
              <ul style={{ fontFamily: 'Inter, sans-serif', color: '#c0c0c0', lineHeight: '2.3', listStyle: 'none', padding: 0 }}>
                {service.features.map((feature, i) => (
                  <li key={i} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 500 }}>
                    <span style={{ color: '#888888', fontSize: '1.3rem', fontWeight: 700 }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
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

// Testimonial Section
function TestimonialSection() {
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
          What Users Say
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {[
            { name: 'Dr. Sarah Chen', role: 'AI Researcher', text: 'The most comprehensive resource for Physical AI education. Highly recommended for students and professionals.' },
            { name: 'Prof. James Wilson', role: 'Robotics Professor', text: 'Excellent pedagogy and up-to-date content. Our students consistently praise the clarity and depth.' },
            { name: 'Emma Rodriguez', role: 'Graduate Student', text: 'Finally, a textbook that bridges theory and practice. The AI assistant is incredibly helpful!' },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(20px)',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.08)',
              }}
            >
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#c0c0c0', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{testimonial.text}"
              </p>
              <div>
                <p style={{ fontFamily: 'Sora, sans-serif', color: '#ffffff', fontSize: '1rem', fontWeight: 700, margin: '0' }}>
                  {testimonial.name}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#888888', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// Hero Section with BLACK HOLE VORTEX background effect
function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  
  useEffect(() => {
    // Dynamically load Three.js and required modules
    const loadScripts = async () => {
      // Create script elements
      const scripts = [
        'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.min.js',
        'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/js/postprocessing/EffectComposer.js',
        'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/js/postprocessing/RenderPass.js',
        'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/js/postprocessing/ShaderPass.js',
        'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/js/shaders/CopyShader.js',
        'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/js/shaders/DotScreenShader.js'
      ];
      
      // Load scripts sequentially
      for (const src of scripts) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      
      // Wait a bit more for all to initialize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Initialize Three.js scene after scripts load
      initScene();
    };
    
    const initScene = () => {
      // Check if THREE is available
      if (!(window as any).THREE) {
        console.error('THREE.js not loaded');
        return;
      }
      
      const c = document.getElementById('blackHoleCanvas') as HTMLCanvasElement;
      if (!c) {
        console.error('Canvas element not found');
        return;
      }
      
      try {
        const r = new (window as any).THREE.WebGLRenderer({canvas:c, alpha:true, antialias:true});
        r.setSize(window.innerWidth, window.innerHeight); 
        r.setPixelRatio(window.devicePixelRatio);
        
        const scene = new (window as any).THREE.Scene();
        const cam = new (window as any).THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        cam.position.z = 10;
        
        const geo = new (window as any).THREE.TorusKnotGeometry(4,1.3,300,16);
        const mat = new (window as any).THREE.MeshBasicMaterial({color:0x00ffff, wireframe:true});
        const knot = new (window as any).THREE.Mesh(geo,mat);
        scene.add(knot);
        
        function animate(){
          knot.rotation.x += 0.01; 
          knot.rotation.y += 0.02;
          knot.scale.setScalar(1 + Math.sin(Date.now()*0.002)*0.1);
          r.render(scene,cam);
          requestAnimationFrame(animate);
        }
        
        animate();
        
        const handleResize = () => {
          cam.aspect = window.innerWidth/window.innerHeight; 
          cam.updateProjectionMatrix(); 
          r.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          r.dispose();
        };
      } catch (error) {
        console.error('Error initializing Three.js scene:', error);
      }
    };
    
    // Start loading scripts
    loadScripts().catch(error => {
      console.error('Failed to load Three.js scripts:', error);
    });
    
    return () => {
      // Clean up if needed
    };
  }, []);
  
  return (
    <div
      className="hero"
      style={{
        position: 'relative',
        background: '#000000',
        padding: '6rem 0',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* BLACK HOLE VORTEX Background */}
      <title>BLACK HOLE VORTEX</title>
      <canvas 
        id="blackHoleCanvas" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
      
      <div
        className="container"
        style={{ 
          position: 'relative', 
          zIndex: 2,
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '16px',
          padding: '2rem',
          animation: 'fadeIn 1.2s ease-in-out',
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(8px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
        <div style={{
          textAlign: 'center',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}>
          <div
            style={{
              display: 'inline-block',
              marginBottom: '3rem',
              animation: 'fadeIn 0.8s ease-in-out 0.2s both',
            }}
          >
            <span
              style={{
                fontFamily: 'Syncopate, sans-serif',
                fontSize: '0.8rem',
                color: '#888888',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.6rem 1.6rem',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              Academic Excellence
            </span>
          </div>
          
          <h1
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: '1.8rem',
              lineHeight: '1.15',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
              animation: 'fadeIn 0.8s ease-in-out 0.3s both',
            }}
          >
            Physical AI & Humanoid Robotics Textbook
          </h1>
          
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)',
              color: '#a8a8a8',
              maxWidth: '700px',
              margin: '0 auto 2.8rem',
              lineHeight: '1.8',
              fontWeight: 400,
              textAlign: 'center',
              animation: 'fadeIn 0.8s ease-in-out 0.4s both',
            }}
          >
            <p style={{ marginBottom: '1.5rem' }}>
              A comprehensive, research-driven learning system unifying physical intelligence, humanoid robotics, and advanced automation.
            </p>
            <p>
              Master the foundational principles, technical frameworks, and real-world implementations of modern intelligent robotics.
            </p>
          </div>
          
          <div
            style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              animation: 'fadeIn 0.8s ease-in-out 0.5s both',
            }}
          >
            <div
              style={{
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.3)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
            >
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
                style={{
                  background: 'linear-gradient(135deg, #333333 0%, #222222 100%)',
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  padding: '1.2rem 2.8rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                Start Learning
              </Link>
            </div>
          </div>
          
          <div
            style={{
              marginTop: '4.5rem',
              color: '#666666',
              fontSize: '0.9rem',
              animation: 'float 2.5s ease-in-out infinite',
            }}
          >
            <div style={{ marginBottom: '0.5rem' }}>Explore</div>
            <div style={{ fontSize: '1.5rem' }}>↓</div>
          </div>
        </div>
      </div>
    </div>
  );
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

// Statistics Section
function StatsSection() {
  const stats = [
    { number: '19', label: 'Comprehensive Modules', description: 'From fundamentals to advanced systems', color: '#888888', icon: '📚' },
    { number: '100+', label: 'Learning Objectives', description: 'Clear, measurable outcomes', color: '#5a8a7b', icon: '🎯' },
    { number: '1000+', label: 'Technical Concepts', description: 'Thoroughly documented', color: '#4a7a6f', icon: '⚙️' },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <motion.section
      ref={ref}
      style={{
        background: 'transparent',
        padding: '8rem 0',
        borderBottom: 'none',
        position: 'relative',
        scale,
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
          Platform Overview
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -12, boxShadow: `0 30px 60px ${stat.color}25` }}
              style={{
                background: `linear-gradient(135deg, rgba(200, 200, 200, 0.08) 0%, rgba(180, 180, 180, 0.04) 100%)`,
                backdropFilter: 'blur(10px)',
                padding: '3rem 2.5rem',
                borderRadius: '16px',
                border: 'none',
                textAlign: 'center',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: `linear-gradient(90deg, ${stat.color} 0%, transparent 100%)`,
              }} />
              <div style={{ fontSize: '3rem', marginBottom: '1.2rem' }}>{stat.icon}</div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.15 + 0.1 }}
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '3.8rem',
                  color: '#888888',
                  fontWeight: 800,
                  marginBottom: '0.5rem',
                }}
              >
                {stat.number}
              </motion.div>
              <h3 style={{ fontFamily: 'Sora, sans-serif', color: '#fff', fontSize: '1.35rem', marginBottom: '0.8rem', fontWeight: 700 }}>
                {stat.label}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#a8a8a8', fontSize: '1rem', fontWeight: 500 }}>
                {stat.description}
              </p>
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