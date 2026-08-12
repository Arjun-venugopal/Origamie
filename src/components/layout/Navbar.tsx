'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import styles from './layout.module.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Works', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
];

/* Origamie Wordmark */
const Wordmark = () => (
  <span className={styles.navWordmark}>
    Origam<span className={styles.wordmarkAccent}>ie</span>
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.navbarLeft}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoBadgeCircle}>
              <Image
                src="/crane-logo.png"
                alt="Origamie crane logo"
                width={28}
                height={28}
                className={styles.navbarIcon}
                priority
              />
            </div>
            <Wordmark />
          </Link>
        </div>

        {/* Desktop Navigation Link Pills */}
        <div className={styles.navLinks}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`${styles.navLinkItem} ${isActive ? styles.activeNavLink : ''}`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className={styles.activePillBackground}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className={styles.navbarRight}>
          <a href="/contact" className={styles.navButtonPrimary}>
            <span>Book a free call</span>
            <ArrowUpRight size={16} className={styles.navCtaIcon} />
          </a>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
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
              <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
                <Image
                  src="/crane-logo.png"
                  alt="Origamie crane logo"
                  width={32}
                  height={32}
                  className={styles.mobileNavIcon}
                  priority
                />
                <Wordmark />
              </Link>
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
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div key={item.label} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={`${styles.mobileNavLink} ${isActive ? styles.activeMobileNavLink : ''}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className={styles.mobileNavLinkNum}>0{index + 1}</span>
                        <span className={styles.mobileNavLinkText}>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div variants={itemVariants} className={styles.mobileCTAWrapper}>
                <a href="/contact" className={styles.mobileNavCTA} onClick={() => setMobileOpen(false)}>
                  <span>Book a free call</span>
                  <ArrowUpRight size={20} />
                </a>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className={styles.mobileMenuFooter}>
              <div className={styles.mobileContactItem}>
                <span className={styles.mobileContactLabel}>Get in touch</span>
                <a href="mailto:hello@origamie.in" className={styles.mobileContactValue}>
                  hello@origamie.in
                </a>
              </div>
              <div className={styles.mobileSocials}>
                <a href="https://wa.me/919544639774" target="_blank" rel="noopener noreferrer" className={styles.mobileSocialLink}>WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
