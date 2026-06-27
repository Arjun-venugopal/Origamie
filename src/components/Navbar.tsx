'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

/* Origamie wordmark */
const Wordmark = () => (
  <span style={{ fontWeight: 400, fontSize: '1.75rem', color: '#111827', letterSpacing: '-0.03em', display: 'inline-flex', alignItems: 'center' }}>
    Origam<span style={{ color: '#5773FF' }}>ie</span>
  </span>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <a href="#home" className={styles.logo}>
            <Image
              src="/crane-logo.png"
              alt="Origamie crane logo"
              width={42}
              height={42}
              style={{ marginRight: '6px' }}
              priority
            />
            <Wordmark />
          </a>
        </div>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a href="#call" className={styles.navButtonPrimary}>
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
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <Image
                src="/crane-logo.png"
                alt="Origamie crane logo"
                width={52}
                height={52}
                style={{ marginRight: '8px' }}
              />
              <Wordmark />
            </div>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#call" className={styles.navButtonPrimary} onClick={() => setMobileOpen(false)}>
              Book a free call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
