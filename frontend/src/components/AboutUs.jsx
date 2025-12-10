import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutUs.module.css';

const AboutUs = () => {
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Principal Researcher & Content Lead",
      bio: "PhD in Robotics from MIT with 15+ years of experience in Physical AI and embodied intelligence research.",
      image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Technical Architect & Simulation Specialist",
      bio: "Former NVIDIA engineer specializing in simulation environments and high-performance computing for robotics.",
      image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=MR"
    },
    {
      name: "Dr. Kenji Tanaka",
      role: "AI/ML Integration & RAG System Developer",
      bio: "Expert in machine learning and retrieval-augmented generation systems for robotics applications.",
      image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=KT"
    },
    {
      name: "Emma Johnson",
      role: "Frontend & User Experience Designer",
      bio: "Design specialist with focus on creating intuitive learning platforms for complex technical content.",
      image: "https://via.placeholder.com/150x150/4F46E5/FFFFFF?text=EJ"
    }
  ];

  const stats = [
    { number: "19", label: "Modules" },
    { number: "500+", label: "Pages of Content" },
    { number: "10", label: "Simulation Environments" },
    { number: "∞", label: "Learning Possibilities" }
  ];

  return (
    <motion.div 
      className={styles.aboutUsContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.heroSection}>
        <motion.h1 
          className={styles.title}
          variants={itemVariants}
        >
          About <span className={styles.highlight}>Our Mission</span>
        </motion.h1>
        <motion.p 
          className={styles.description}
          variants={itemVariants}
        >
          We are a dedicated team of researchers, engineers, and educators passionate about 
          advancing the field of Physical AI and Humanoid Robotics. Our goal is to create 
          the most comprehensive and accessible educational resource for the next generation 
          of roboticists and AI researchers.
        </motion.p>
      </motion.div>

      <motion.div 
        className={styles.statsSection}
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            className={styles.statCard}
            variants={cardVariants}
          >
            <div className={styles.statNumber}>{stat.number}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className={styles.missionSection}
        variants={itemVariants}
      >
        <h2>Our <span className={styles.highlight}>Vision</span></h2>
        <div className={styles.missionContent}>
          <div className={styles.missionText}>
            <p>
              The future of artificial intelligence lies not in purely digital systems, but in embodied 
              intelligence that learns through physical interaction with the world. Our textbook 
              represents the cutting-edge intersection of AI and robotics, where digital intelligence 
              meets the physical world through embodied systems.
            </p>
            <p>
              We believe that true understanding comes from the integration of theoretical foundations, 
              practical implementation, real-world application, and interdisciplinary thinking. 
              Our mission is to bridge the gap between complex robotics research and accessible 
              educational content.
            </p>
          </div>
          <motion.div 
            className={styles.missionImage}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.imagePlaceholder}>🤖</div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className={styles.teamSection}
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants}
        >
          Meet Our <span className={styles.highlight}>Team</span>
        </motion.h2>
        <motion.div 
          className={styles.teamGrid}
          variants={containerVariants}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className={styles.teamCard}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.teamImage}>
                <img src={member.image} alt={member.name} />
              </div>
              <div className={styles.teamInfo}>
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.valuesSection}
        variants={itemVariants}
      >
        <h2>Core <span className={styles.highlight}>Values</span></h2>
        <motion.div 
          className={styles.valuesGrid}
          variants={containerVariants}
        >
          {[
            {
              title: "Excellence",
              description: "We pursue the highest standards in both research and education."
            },
            {
              title: "Accessibility",
              description: "We believe advanced robotics education should be available to all."
            },
            {
              title: "Innovation",
              description: "We embrace cutting-edge techniques and emerging technologies."
            },
            {
              title: "Collaboration",
              description: "We foster a community of researchers, educators, and learners."
            }
          ].map((value, index) => (
            <motion.div 
              key={index}
              className={styles.valueCard}
              variants={cardVariants}
            >
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.ctaSection}
        variants={itemVariants}
      >
        <h2>Join Our <span className={styles.highlight}>Mission</span></h2>
        <p>
          Building the most comprehensive textbook on Physical AI and Humanoid Robotics.
        </p>
        <motion.button 
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contribute to Our Project
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AboutUs;