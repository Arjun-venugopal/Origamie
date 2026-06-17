'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/page.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <motion.div
        className={styles.footerTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.6, marginBottom: '24px' }}>HAVE ANY PROJECT IN MIND?</p>
          <a href="mailto:hello@boulevard.com" className={styles.footerEmail}>hello@boulevard.com</a>
        </div>
        <a href="mailto:hello@boulevard.com" className="btn btn-dark" style={{ borderRadius: 'var(--radius-full)', padding: '16px 32px' }}>Book a call ↗</a>
      </motion.div>

      <motion.div
        className={styles.footerLinksRow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div style={{ maxWidth: '300px' }}>
          <p style={{ fontSize: '0.875rem', opacity: 0.6, marginBottom: '24px' }}>© {new Date().getFullYear()} Boulevard Creative</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.9 }}>
            Work with our strategists, designers, and developers who deliver high-quality work with passion.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '120px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.5, marginBottom: '24px' }}>NAVIGATE</p>
            <div className={styles.footerLinkGroup} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
              <a href="#">Home</a>
              <a href="#projects">Projects</a>
              <a href="#services">Service</a>
              <a href="#team">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.5, marginBottom: '24px' }}>SOCIAL MEDIA</p>
            <div className={styles.footerLinkGroup} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">Twitter (X)</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={styles.footerBrand}>
        <div>Boulevard™</div>
        <button className={styles.scrollTopBtn} onClick={scrollToTop} aria-label="Scroll to top">↑</button>
      </div>
    </footer>
  );
}
