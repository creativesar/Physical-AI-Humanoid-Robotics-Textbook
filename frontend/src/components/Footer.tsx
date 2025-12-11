import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Footer = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <footer
      className="footer"
      style={{
        backgroundColor: '#000000',
        borderTop: '1px solid rgba(176, 224, 230, 0.2)',
        color: '#e0f0f0',
        padding: '4rem 0 2rem',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="container container--fluid padding-horiz--md">
        <div className="row">
          {/* Textbook Section */}
          <div className="col col--3">
            <h4 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#b0e0e6',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Textbook
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  to="/docs/intro"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  Introduction
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  to="/docs/robotics-mechatronics-fundamentals"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  Robotics Fundamentals
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  to="/docs/ros2-foundations"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  ROS 2 Foundations
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col col--3">
            <h4 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#b0e0e6',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  href="https://docs.ros.org/en/humble/"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  ROS 2 Documentation
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  href="https://gazebosim.org/"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  Gazebo Simulator
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  href="https://developer.nvidia.com/isaac"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  NVIDIA Isaac
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="col col--3">
            <h4 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#b0e0e6',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Community
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  href="https://robotics.stackexchange.com/"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  Robotics Stack Exchange
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  href="https://discourse.ros.org/"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  ROS Discourse
                </Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link
                  href="https://discord.gg/robotics"
                  style={{
                    color: '#e0f0f0',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#b0e0e6'}
                  onMouseOut={(e) => e.target.style.color = '#e0f0f0'}
                >
                  AI & Robotics Discord
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="col col--3">
            <h4 style={{
              fontFamily: 'Sora, sans-serif',
              color: '#b0e0e6',
              marginBottom: '1rem',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Connect
            </h4>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ 
                color: '#e0f0f0',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Join our community of researchers and engineers advancing Physical AI and Humanoid Robotics.
              </p>
              <Link
                href="mailto:contact@physicalai-textbook.org"
                style={{
                  color: '#b0e0e6',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  border: '1px solid #b0e0e6',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#b0e0e6';
                  e.target.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#b0e0e6';
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom text--center" style={{
          borderTop: '1px solid rgba(176, 224, 230, 0.1)',
          paddingTop: '2rem',
          marginTop: '2rem',
          color: 'rgba(224, 240, 240, 0.7)',
          fontSize: '0.85rem'
        }}>
          <div className="footer__copyright" style={{
            fontFamily: 'Sora, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '0.5rem'
          }}>
            {siteConfig.title}
          </div>
          <div>
            {`Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;