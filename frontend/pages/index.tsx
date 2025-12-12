import React, { type ReactElement } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { motion } from 'framer-motion';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Chatbot from '@site/src/components/Chatbot';
import WhatWeDoPremium from '@site/src/components/WhatWeDoCompact';
import PremiumHero from '@site/src/components/PremiumHero';

import styles from './index.module.css';

function HomepageHeader() {
  return <PremiumHero />;
}

// Additional sections that are not in HomepageFeatures
function ModuleGridSection() {
  return (
    <section className={clsx(styles.section, 'margin-vert--lg')} id="module-grid">
      <div className="container padding-horiz--md">
        <div className="row">
          <div className="col col--12">
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              textAlign: 'center',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)' // Responsive font size
            }}>Textbook Modules</h2>
            <div className="text--center">
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' // Responsive font size
              }}>Explore the complete 19-module curriculum</p>
            </div>
            <div className="row">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="col col--6 col--md-4 col--lg-2 padding--sm"> {/* Responsive columns */}
                  <div
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #555',
                      borderRadius: '8px',
                      padding: '15px',
                      textAlign: 'center',
                      minHeight: '120px', // Changed from fixed height to min-height
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Sora, sans-serif',
                      margin: 0,
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' // Responsive font size
                    }}>Module {idx + 1}</h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 'clamp(0.7rem, 2vw, 0.8em)', // Responsive font size
                      margin: '5px 0 0'
                    }}>Intro to Physical AI</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterSection() {
  return (
    <section className={clsx(styles.section, 'margin-vert--lg', 'padding-vert--md')}
             style={{ backgroundColor: 'transparent', borderRadius: '8px', margin: '20px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col col--6 col--md-3 text--center"> {/* Made responsive - 2 cols on mobile, 3 on medium, 3 on large */}
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#25c19f',
              margin: 0,
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' // Responsive font size
            }}>19</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              fontSize: 'clamp(0.8rem, 2vw, 1rem)' // Responsive font size
            }}>Modules</p>
          </div>
          <div className="col col--6 col--md-3 text--center"> {/* Made responsive - 2 cols on mobile, 3 on medium, 3 on large */}
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#25c19f',
              margin: 0,
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' // Responsive font size
            }}>50+</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              fontSize: 'clamp(0.8rem, 2vw, 1rem)' // Responsive font size
            }}>Subpages</p>
          </div>
          <div className="col col--6 col--md-3 text--center"> {/* Made responsive - 2 cols on mobile, 3 on medium, 3 on large */}
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#25c19f',
              margin: 0,
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' // Responsive font size
            }}>10k+</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              fontSize: 'clamp(0.8rem, 2vw, 1rem)' // Responsive font size
            }}>Students</p>
          </div>
          <div className="col col--6 col--md-3 text--center"> {/* Made responsive - 2 cols on mobile, 3 on medium, 3 on large */}
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#25c19f',
              margin: 0,
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' // Responsive font size
            }}>24/7</h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              fontSize: 'clamp(0.8rem, 2vw, 1rem)' // Responsive font size
            }}>Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className={clsx(styles.section, 'margin-vert--lg')}>
      <div className="container padding-horiz--md">
        <div className="row">
          <div className="col col--12">
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              textAlign: 'center',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)' // Responsive font size
            }}>What Our Users Say</h2>
            <div className="row">
              <div className="col col--12 col--md-4"> {/* Responsive: full width on mobile, 4 cols on medium+ */}
                <div style={{
                  padding: '20px',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  height: '100%',
                  margin: '10px 0' // Add margin for mobile spacing
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)' // Responsive font size
                  }}>"This textbook provided the comprehensive foundation I needed to start my robotics research."</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', // Responsive font size
                    marginTop: '10px'
                  }}><em>- Graduate Student</em></p>
                </div>
              </div>
              <div className="col col--12 col--md-4"> {/* Responsive: full width on mobile, 4 cols on medium+ */}
                <div style={{
                  padding: '20px',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  height: '100%',
                  margin: '10px 0' // Add margin for mobile spacing
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)' // Responsive font size
                  }}>"The practical examples and theoretical background perfectly complement each other."</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', // Responsive font size
                    marginTop: '10px'
                  }}><em>- Robotics Engineer</em></p>
                </div>
              </div>
              <div className="col col--12 col--md-4"> {/* Responsive: full width on mobile, 4 cols on medium+ */}
                <div style={{
                  padding: '20px',
                  border: '1px solid #555',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  height: '100%',
                  margin: '10px 0' // Add margin for mobile spacing
                }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)' // Responsive font size
                  }}>"An invaluable resource for anyone serious about Physical AI and Humanoid Robotics."</p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', // Responsive font size
                    marginTop: '10px'
                  }}><em>- Professor</em></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedPartnersSection() {
  return (
    <section className={clsx(styles.section, 'margin-vert--lg')}>
      <div className="container padding-horiz--md">
        <div className="row">
          <div className="col col--12">
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              textAlign: 'center',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)' // Responsive font size
            }}>Trusted By</h2>
            <div className="text--center">
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' // Responsive font size
              }}>Academic and Industry Partners</p>
              <div className="row padding-vert--md">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="col col--6 col--md-3"> {/* Responsive: 2 cols on mobile, 3 on medium+ */}
                    <div style={{
                      padding: '15px',
                      border: '1px solid #555',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      minHeight: '80px', // Changed to min-height for content flexibility
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '10px 0' // Add margin for mobile spacing
                    }}>
                      <span style={{
                        fontSize: 'clamp(0.8rem, 2vw, 1rem)' // Responsive font size
                      }}>Partner {idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "Who is this textbook for?",
      answer: "This textbook is designed for students, researchers, and professionals working in robotics, AI, or related fields who want to understand the principles of Physical AI and Humanoid Robotics."
    },
    {
      question: "Do I need prior robotics experience?",
      answer: "While some background in programming and basic robotics concepts is helpful, this textbook is structured to be accessible to motivated learners at various levels."
    },
    {
      question: "How is this textbook different?",
      answer: "Unlike traditional robotics textbooks, this resource specifically focuses on the intersection of AI and physical systems, with emphasis on embodied intelligence and humanoid systems."
    },
    {
      question: "Can I interact with the content?",
      answer: "Yes! Our platform includes an AI-powered chatbot that can answer your questions based on the textbook content, providing personalized learning experiences."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={clsx(styles.section, 'margin-vert--lg')}>
      <div className="container padding-horiz--md">
        <div className="row">
          <div className="col col--12">
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              textAlign: 'center',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)' // Responsive font size
            }}>Frequently Asked Questions</h2>
            <div className="padding-vert--md">
              {faqs.map((faq, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <div
                    style={{
                      padding: '20px',
                      border: '1px solid #555',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 style={{
                      margin: 0,
                      fontFamily: 'Sora, sans-serif',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' // Responsive font size
                    }}>
                      {faq.question}
                      <span style={{
                        fontSize: 'clamp(1rem, 3vw, 1.5rem)' // Responsive font size for the +/- sign
                      }}>{openIndex === index ? '−' : '+'}</span>
                    </h3>
                    {openIndex === index && (
                      <p style={{
                        marginTop: '10px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#aaa',
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)' // Responsive font size
                      }}>
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GetConnectSection() {
  return (
    <section className={clsx(styles.section, 'margin-vert--lg', 'padding-vert--xl')}>
      <div className="container padding-horiz--md">
        <div className="row">
          <div className="col col--12 text--center">
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)' // Responsive font size
            }}>Get Connected</h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1rem, 3vw, 1.2em)', // Responsive font size
              marginBottom: '30px'
            }}>
              Join our community of researchers and engineers advancing Physical AI and Humanoid Robotics
            </p>
            <div className="row">
              <div className="col col--12 col--md-4"> {/* Responsive: full width on mobile, 4 cols on medium+ */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' // Responsive font size
                  }}>Contact Us</h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' // Responsive font size
                  }}>
                    Have questions? Reach out to our team for more information about the textbook.
                  </p>
                  <Link
                    className="button button--secondary button--md"
                    style={{
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', // Responsive font size
                      padding: '0.5rem 1rem', // Adjust padding for mobile
                      display: 'inline-block', // Ensure proper display on mobile
                      margin: '5px' // Add margin for mobile
                    }}
                    to="mailto:contact@physicalai-textbook.org">
                    Email Us
                  </Link>
                </div>
              </div>
              <div className="col col--12 col--md-4"> {/* Responsive: full width on mobile, 4 cols on medium+ */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' // Responsive font size
                  }}>Join Community</h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' // Responsive font size
                  }}>
                    Connect with other students and researchers in our community forums.
                  </p>
                  <Link
                    className="button button--secondary button--md"
                    style={{
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', // Responsive font size
                      padding: '0.5rem 1rem', // Adjust padding for mobile
                      display: 'inline-block', // Ensure proper display on mobile
                      margin: '5px' // Add margin for mobile
                    }}
                    to="https://discord.gg/robotics">
                    Join Discord
                  </Link>
                </div>
              </div>
              <div className="col col--12 col--md-4"> {/* Responsive: full width on mobile, 4 cols on medium+ */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' // Responsive font size
                  }}>Follow Updates</h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' // Responsive font size
                  }}>
                    Stay up to date with the latest content updates and research insights.
                  </p>
                  <Link
                    className="button button--secondary button--md"
                    style={{
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', // Responsive font size
                      padding: '0.5rem 1rem', // Adjust padding for mobile
                      display: 'inline-block', // Ensure proper display on mobile
                      margin: '5px' // Add margin for mobile
                    }}
                    to="https://twitter.com/PhysicalAI_Textbk">
                    Follow on Twitter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactElement {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Comprehensive textbook covering Physical AI and Humanoid Robotics">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <WhatWeDoPremium />
        <ModuleGridSection />
        <CounterSection />
        <TestimonialsSection />
        <TrustedPartnersSection />
        <FAQSection />
        <GetConnectSection />
        <Chatbot />
      </main>
    </Layout>
  );
}