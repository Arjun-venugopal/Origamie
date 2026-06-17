'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import styles from '@/app/page.module.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Service', href: '#services' },
  { label: 'Project', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <div className={styles.logo}>Boulevard™</div>
          <div style={{ opacity: 0.8, fontSize: '0.8rem' }}>France, +33 47 796 (GMT+2)</div>
        </div>

        <div className={styles.navLinks}>
          {navItems.map((item, i) => (
            <a key={item.label} href={item.href}>
              {item.label}{i < navItems.length - 1 ? ',' : ''}
            </a>
          ))}
        </div>

        <a href="#contact" className={styles.navConnect}>
          Let&apos;s Connect ↗
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
              style={{ position: 'absolute', top: 24, right: 24, color: 'white' }}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              Let&apos;s Connect ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
