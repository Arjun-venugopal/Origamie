'use client';

import React, { useState, useEffect } from 'react';
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

const menuVariants = {
  hidden: {
    opacity: 0,
    y: '-100%',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      when: 'afterChildren',
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      when: 'beforeChildren',
      staggerChildren: 0.08,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className={styles.mobileMenuHeader}>
              <a href="#home" className={styles.logo} onClick={() => setMobileOpen(false)}>
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
              <button
                className={styles.mobileCloseBtn}
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.mobileMenuContent}>
              <div className={styles.mobileLinks}>
                {navItems.map((item, index) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <a
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className={styles.mobileNavLinkNum}>0{index + 1}</span>
                      <span className={styles.mobileNavLinkText}>{item.label}</span>
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className={styles.mobileCTAWrapper}>
                <a href="#call" className={styles.mobileNavCTA} onClick={() => setMobileOpen(false)}>
                  Book a free call
                </a>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className={styles.mobileMenuFooter}>
              <div className={styles.mobileContactItem}>
                <span className={styles.mobileContactLabel}>Get in touch</span>
                <a href="mailto:hello@origamie.co" className={styles.mobileContactValue}>
                  hello@origamie.co
                </a>
              </div>
              <div className={styles.mobileSocials}>
                <a href="#" aria-label="LinkedIn" className={styles.mobileSocialLink}>LN</a>
                <a href="#" aria-label="Twitter" className={styles.mobileSocialLink}>TW</a>
                <a href="#" aria-label="Instagram" className={styles.mobileSocialLink}>IG</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
