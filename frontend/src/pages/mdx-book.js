import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from '@docusaurus/Head';
import styles from './index.module.css';
import CommonHeader from '../components/CommonHeader';
import CommonFooter from '../components/CommonFooter';
import { initializeHomepageAnimations } from '../utils/homepageAnimations';

// MDX Book Homepage Component
export default function MdxBookHomepage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [counters, setCounters] = useState({
    books: 0,
    students: 0,
    chapters: 0,
    concepts: 0
  });

  // Animate counters on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounters({
        books: 12,
        students: 5000,
        chapters: 24,
        concepts: 150
      });
    }, 500);

    // Initialize homepage animations
    initializeHomepageAnimations();

    return () => clearTimeout(timer);
  }, []);

  const handleBookClick = () => {
    // Navigate to the MDX book introduction
    window.location.href = '/docs/intro';
  };

  // FAQ Data
  const faqs = [
    {
      question: "What topics are covered in the textbook?",
      answer: "Our comprehensive textbook covers robotics fundamentals, AI integration, biomechanics, control systems, and advanced humanoid robotics applications."
    },
    {
      question: "Who is this textbook for?",
      answer: "Engineers, researchers, students, and professionals in robotics, AI, and mechatronics fields who want to understand physical AI and humanoid robotics."
    },
    {
      question: "Are there practical exercises?",
      answer: "Yes, each chapter includes hands-on projects, simulation exercises, and real-world case studies to reinforce concepts."
    },
    {
      question: "Is the content updated regularly?",
      answer: "Our content is continuously updated to reflect the latest research and technological advances in the field."
    }
  ];

  // Features Data
  const features = [
    {
      title: "Advanced AI Integration",
      description: "Learn how modern AI algorithms enable humanoids to perceive, reason, and act in complex environments.",
      icon: "🤖"
    },
    {
      title: "Biomechanical Design",
      description: "Understanding the principles behind creating lifelike movements and natural human-robot interaction.",
      icon: "🦾"
    },
    {
      title: "Control Systems",
      description: "Advanced control algorithms that enable stable, dynamic, and responsive humanoid behavior.",
      icon: "⚙️"
    },
    {
      title: "Real-World Applications",
      description: "Explore practical implementations in healthcare, manufacturing, and assistive technologies.",
      icon: "🏥"
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead Robotics Engineer, Tesla",
      content: "This textbook bridges the gap between theoretical knowledge and practical implementation in humanoid robotics.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Prof. Michael Rodriguez",
      role: "Director of AI Lab, MIT",
      content: "An essential resource that covers the most current developments in physical AI and humanoid systems.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Dr. Aisha Okonkwo",
      role: "Research Scientist, DeepMind",
      content: "The interdisciplinary approach makes complex concepts accessible without sacrificing technical depth.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  // Partner Logos
  const partners = [
    { name: "MIT", logo: "M" },
    { name: "Stanford", logo: "S" },
    { name: "Google AI", logo: "G" },
    { name: "OpenAI", logo: "O" },
    { name: "Tesla", logo: "T" },
    { name: "Boston Dynamics", logo: "B" }
  ];

  // FAQ Toggle Handler
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <CommonHeader onBookClick={handleBookClick} />
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>Physical AI & Humanoid Robotics Textbook - MDX Book</title>
        <meta name="description" content="The definitive MDX textbook on physical AI and humanoid robotics - bridging the gap between artificial intelligence and embodied machines" />
      </Head>

      <div className={styles.homepageContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          {/* Animated Background */}
          <div className={styles.heroBackground}>
            <div className={styles.heroGridPattern}></div>
            <div className={styles.heroFloatingShapes}>
              <div className={`${styles.heroShape} ${styles.heroShape1}`}></div>
              <div className={`${styles.heroShape} ${styles.heroShape2}`}></div>
              <div className={`${styles.heroShape} ${styles.heroShape3}`}></div>
            </div>
          </div>

          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={styles.heroTitle}>
                Physical AI & Humanoid Robotics
              </h1>
              <p className={styles.heroSubtitle}>
                The definitive textbook exploring the convergence of artificial intelligence and embodied machines.
                Master the principles that bring intelligence to physical form.
              </p>
              <div className={styles.heroButtons}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.heroButtonPrimary}
                  onClick={handleBookClick}
                >
                  Open Book
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.heroButtonSecondary}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className={styles.scrollIndicator}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section className={`${styles.section} ${styles.sectionBgGray}`}>
          <div className={styles.sectionContainer}>
            <div className={styles.aboutGrid}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={styles.aboutTextContent}
              >
                <h2 className={styles.aboutHeading}>
                  Bridging Intelligence and Embodiment
                </h2>
                <p className={styles.aboutDescription}>
                  Our textbook delves into the complex intersection of artificial intelligence and physical systems.
                  We explore how AI algorithms can be embodied in mechanical systems to create truly autonomous humanoid robots.
                </p>
                <p className={styles.aboutDescription}>
                  Through rigorous theoretical foundations and practical applications, readers will understand the
                  principles that govern the behavior of intelligent physical systems in complex environments.
                </p>
                <div className="flex gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-700"></div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={styles.aboutVisual}
              >
                <div className={styles.aboutPanel}>
                  <div className={styles.aboutSubGrid}>
                    <div className={styles.aboutSubItem}>
                      <div className={styles.aboutSubIcon}>🧠</div>
                      <h3 className={styles.aboutSubTitle}>Cognitive Systems</h3>
                      <p className={styles.aboutSubDesc}>Intelligent decision-making algorithms</p>
                    </div>
                    <div className={styles.aboutSubItem}>
                      <div className={styles.aboutSubIcon}>🦾</div>
                      <h3 className={styles.aboutSubTitle}>Mechanical Design</h3>
                      <p className={styles.aboutSubDesc}>Optimized for real-world tasks</p>
                    </div>
                    <div className={styles.aboutSubItem}>
                      <div className={styles.aboutSubIcon}>🔄</div>
                      <h3 className={styles.aboutSubTitle}>Adaptive Control</h3>
                      <p className={styles.aboutSubDesc}>Dynamic response systems</p>
                    </div>
                    <div className={styles.aboutSubItem}>
                      <div className={styles.aboutSubIcon}>🌐</div>
                      <h3 className={styles.aboutSubTitle}>Environmental Integration</h3>
                      <p className={styles.aboutSubDesc}>Real-world interaction</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className={`${styles.section} ${styles.sectionBgBlack}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>
                What We Do
              </h2>
              <p className={styles.sectionSubtitle}>
                Comprehensive coverage of the fundamental disciplines that enable next-generation humanoid robotics
              </p>
            </motion.div>

            <div className={styles.whatWeDoGrid}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.serviceCard}
                >
                  <div className={styles.serviceIcon}>{feature.icon}</div>
                  <h3 className={styles.serviceTitle}>{feature.title}</h3>
                  <p className={styles.serviceDescription}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className={`${styles.section} ${styles.sectionBgGray}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>
                Revolutionary Approach
              </h2>
              <p className={styles.sectionSubtitle}>
                Our methodology combines theoretical rigor with practical application to advance the field
              </p>
            </motion.div>

            <div className={styles.featuresGrid}>
              {[
                {
                  title: "Interdisciplinary Learning",
                  description: "Integrate knowledge from robotics, AI, biomechanics, and control systems",
                  icon: "🔄"
                },
                {
                  title: "Practical Applications",
                  description: "Real-world projects and simulations that reinforce theoretical concepts",
                  icon: "🏭"
                },
                {
                  title: "Cutting-Edge Research",
                  description: "Latest developments and future trajectories in humanoid robotics",
                  icon: "🔬"
                }
              ].map((approach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={styles.featureCard}
                >
                  <div className={styles.featureCardIcon}>{approach.icon}</div>
                  <h3 className={styles.featureCardTitle}>{approach.title}</h3>
                  <p className={styles.featureCardDescription}>{approach.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Counter Section */}
        <section className={`${styles.section} ${styles.sectionBgBlack}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>
                By The Numbers
              </h2>
            </motion.div>

            <div className={styles.countersGrid}>
              {[
                { number: counters.books, label: 'Books Sold', suffix: '+' },
                { number: counters.students, label: 'Students', suffix: '+' },
                { number: counters.chapters, label: 'Chapters', suffix: '' },
                { number: counters.concepts, label: 'Concepts', suffix: '+' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={styles.counterItem}
                >
                  <div className={styles.counterNumber}>
                    {stat.number}{stat.suffix}
                  </div>
                  <div className={styles.counterLabel}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={`${styles.section} ${styles.sectionBgGray}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>
                What Experts Say
              </h2>
              <p className={styles.sectionSubtitle}>
                Leading researchers and engineers share their experiences with our comprehensive textbook
              </p>
            </motion.div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={styles.testimonialCard}
                >
                  <div className={styles.testimonialHeader}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.testimonialAvatar}
                    />
                    <div className={styles.testimonialInfo}>
                      <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                      <p className={styles.testimonialRole}>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className={styles.testimonialText}>"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovation Partners */}
        <section className={`${styles.section} ${styles.sectionBgBlack}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>
                Innovation Partners
              </h2>
              <p className={styles.sectionSubtitle}>
                Collaborating with leading institutions and organizations advancing humanoid robotics
              </p>
            </motion.div>

            <div className={styles.partnersGrid}>
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.partnerLogo}
                >
                  {partner.logo}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className={`${styles.section} ${styles.sectionBgGray}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.sectionTitle}>
                Frequently Asked Questions
              </h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to know about the Physical AI & Humanoid Robotics textbook
              </p>
            </motion.div>

            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${styles.faqItem} ${openFaq === index ? styles.active : ''}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={styles.faqQuestion}
                  >
                    <span className={styles.faqQuestionText}>{faq.question}</span>
                    <span className={styles.faqToggle}>▼</span>
                  </button>
                  <div className={`${styles.faqAnswer} ${openFaq === index ? styles.show : ''}`}>
                    <div className={styles.faqAnswerContent}>
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`${styles.section} ${styles.sectionBgBlack}`}>
          <div className={styles.sectionContainer}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2 className={styles.heroTitle}>
                Start Your Journey
              </h2>
              <p className={styles.heroSubtitle}>
                Join thousands of engineers, researchers, and students exploring the future of humanoid robotics
              </p>
              <div className={styles.heroButtons}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.heroButtonPrimary}
                  onClick={handleBookClick}
                >
                  Get Started Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.heroButtonSecondary}
                >
                  Request Sample
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <CommonFooter />
    </>
  );
}