import React from 'react';
import styles from './CommonFooter.module.css';

const CommonFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSections}>
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Docs</h3>
            <ul className={styles.sectionList}>
              <li><a href="/docs/intro" className={styles.sectionLink}>Textbook</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Community</h3>
            <ul className={styles.sectionList}>
              <li><a href="https://stackoverflow.com/questions/tagged/docusaurus" className={styles.sectionLink}>Stack Overflow</a></li>
              <li><a href="https://discordapp.com/invite/docusaurus" className={styles.sectionLink}>Discord</a></li>
              <li><a href="https://twitter.com/docusaurus" className={styles.sectionLink}>Twitter</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>More</h3>
            <ul className={styles.sectionList}>
              <li><a href="/blog" className={styles.sectionLink}>Blog</a></li>
              <li><a href="https://github.com/facebook/docusaurus" className={styles.sectionLink}>GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            Copyright © {currentYear} Physical AI Humanoid Robotics Textbook, Built with Docusaurus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CommonFooter;