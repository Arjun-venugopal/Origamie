'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import styles from './layout.module.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Works', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const Wordmark = () => (
  <span className={styles.navWordmark}>
    Origam<span className={styles.wordmarkAccent}>ie</span>
  </span>
);

const curtainVariants = {
  hidden: {
    y: '-100%',
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      when: 'afterChildren',
    }
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      when: 'beforeChildren',
      staggerChildren: 0.06,
    }
  }
};

const linkRevealVariants = {
  hidden: { opacity: 0, y: 50, rotate: 1.5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }
  }
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* 1. Floating Glassmorphic Pill Dock Header */}
      <motion.header
        className={`${styles.minimalHeader} ${scrolled ? styles.minimalHeaderScrolled : ''} ${menuOpen ? styles.minimalHeaderHidden : ''}`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Brand Logo */}
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.minimalLogo}>
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={styles.logoIconWrapper}
            >
              <Image
                src="/crane-logo.png"
                alt="Origamie crane logo"
                width={26}
                height={26}
                className={styles.navbarIcon}
                priority
              />
            </motion.div>
            <Wordmark />
          </Link>
        </div>

        {/* Center Desktop Navigation Pill Bar */}
        <div className={styles.headerCenter}>
          <nav className={styles.desktopNavDock} aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navDockItem} ${isActive ? styles.navDockItemActive : ''}`}
                >
                  <span className={styles.navDockLabel}>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className={styles.activePillBackground}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right CTA & Menu Trigger */}
        <div className={styles.headerRight}>
          <Link href="/contact" className={styles.navButtonPrimary}>
            <span>Let's Talk</span>
            <ArrowUpRight size={16} className={styles.navCtaIcon} />
          </Link>

          <button
            className={styles.menuTriggerBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Open full menu"
          >
            <span className={styles.menuDotsIcon}>
              <span className={styles.dot} />
              <span className={styles.dot} />
            </span>
            <span className={styles.menuText}>Menu</span>
          </button>
        </div>
      </motion.header>

      {/* 2. Full-Screen Kinetic Curtain Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.fullScreenCurtain}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={curtainVariants}
          >
            {/* Curtain Header */}
            <div className={styles.curtainHeader}>
              <Link href="/" className={styles.minimalLogo} onClick={() => setMenuOpen(false)}>
                <Image
                  src="/crane-logo.png"
                  alt="Origamie logo"
                  width={28}
                  height={28}
                  className={styles.navbarIcon}
                />
                <Wordmark />
              </Link>

              <button
                className={styles.closeCurtainBtn}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span>Close</span>
                <span className={styles.closeCross}>✕</span>
              </button>
            </div>

            {/* Split Screen Content */}
            <div className={styles.curtainBody}>
              
              {/* Left Column: Kinetic Links */}
              <div className={styles.curtainNavLinks}>
                {navItems.map((item, index) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname?.startsWith(item.href);

                  return (
                    <div className={styles.kineticLinkWrapper} key={item.label}>
                      <motion.div variants={linkRevealVariants}>
                        <Link
                          href={item.href}
                          className={`${styles.kineticLink} ${isActive ? styles.kineticLinkActive : ''}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className={styles.kineticLinkIndex}>0{index + 1}</span>
                          <span className={styles.kineticLinkText}>{item.label}</span>
                          {isActive && <Sparkles size={20} className={styles.activeSparkle} />}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Information & Dispatch */}
              <motion.div variants={fadeVariants} className={styles.curtainInfoPanel}>
                <div className={styles.infoBlock}>
                  <h4 className={styles.infoLabel}>Studio Status</h4>
                  <div className={styles.navLiveStatus}>
                    <span className={styles.badgePulseDot} />
                    <span>AVAILABLE Q3/Q4</span>
                  </div>
                </div>

                <div className={styles.infoBlock}>
                  <h4 className={styles.infoLabel}>General Inquiries</h4>
                  <a href="mailto:hello@origamie.in" className={styles.infoValue}>
                    hello@origamie.in
                  </a>
                </div>

                <div className={styles.infoBlock}>
                  <h4 className={styles.infoLabel}>Direct Connect</h4>
                  <a href="https://wa.me/919544639774" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
                    +91 9544 639 774
                  </a>
                </div>

                <div className={styles.curtainSocials}>
                  <a href="#" className={styles.socialLink}>Instagram</a>
                  <a href="#" className={styles.socialLink}>LinkedIn</a>
                  <a href="#" className={styles.socialLink}>Behance</a>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

