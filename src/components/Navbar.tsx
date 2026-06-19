'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from '@/app/page.module.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Service', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
];

const CraneIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
    <g stroke="black" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <polygon points="55,20 95,15 75,50" fill="white" />
      <polygon points="30,65 70,45 75,50" fill="white" />
      <polygon points="30,65 75,50 72,70" fill="black" />
      <polygon points="75,50 90,95 70,85" fill="white" />
      <polygon points="15,30 40,40 30,65" fill="white" />
      <polygon points="5,45 15,30 20,42" fill="white" />
      <polygon points="30,65 48,15 55,20" fill="#5B6EF2" />
      <polygon points="30,65 55,20 70,45" fill="#5B6EF2" />
    </g>
  </svg>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div className={styles.logo}>
            <CraneIcon />
            <span style={{ fontWeight: 400, fontSize: '1.5rem', color: '#1E3A8A' }}>Origamie</span>
          </div>
        </div>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a href="#call" className={styles.navButton}>
          Book a free call
        </a>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: 24, right: 24, color: 'black' }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#call" className={styles.navButton} onClick={() => setMobileOpen(false)}>
              Book a free call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
