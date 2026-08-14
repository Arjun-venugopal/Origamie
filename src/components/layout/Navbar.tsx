'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  MessageCircle, 
  Mail, 
  Phone, 
  ExternalLink,
  ChevronRight,
  Zap,
  Globe
} from 'lucide-react';
import styles from './Navbar.module.css';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  previewTitle: string;
  previewDesc: string;
  tag: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    previewTitle: 'Origamie Creative Studio',
    previewDesc: 'High-conversion digital experiences and engineering designed for scale.',
    tag: 'STUDIO OVERVIEW'
  },
  {
    label: 'Works',
    href: '/works',
    badge: '4+ Cases',
    previewTitle: 'Selected Case Studies',
    previewDesc: 'Discover how we drove 2–4x lead conversion increases for ambitious brands.',
    tag: 'FEATURED PORTFOLIO'
  },
  {
    label: 'Services',
    href: '/services',
    previewTitle: 'Core Capabilities',
    previewDesc: 'Web Engineering, Brand Identity, Conversion Optimization & High-Velocity UI/UX.',
    tag: 'WHAT WE DO'
  },
  {
    label: 'About',
    href: '/about',
    previewTitle: 'Our Philosophy & Craft',
    previewDesc: 'Merging Japanese origami precision with world-class interactive engineering.',
    tag: 'THE COLLECTIVE'
  },
  {
    label: 'Contact',
    href: '/contact',
    previewTitle: 'Start a Project',
    previewDesc: 'Schedule an intake consultation or get a guaranteed 24-hour fixed quote.',
    tag: 'DIRECT DISPATCH'
  }
];

// Motion Variants for Curtain Menu
const curtainVariants = {
  hidden: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      when: 'afterChildren'
    }
  },
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      when: 'beforeChildren',
      staggerChildren: 0.08
    }
  }
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

const infoPanelVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [timeString, setTimeString] = useState('');
  const lastScrollY = useRef(0);

  // Handle scroll effect & scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Determine scroll direction
      if (currentScrollY > 60) {
        if (currentScrollY > lastScrollY.current + 4) {
          // Scrolling DOWN: collapse into logo & menu icon
          setIsScrollingDown(true);
        } else if (currentScrollY < lastScrollY.current - 4) {
          // Scrolling UP: reveal full navigation
          setIsScrollingDown(false);
        }
      } else {
        // At or near top: always reveal full navbar
        setIsScrollingDown(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update IST Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when curtain menu is open
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

  // Keyboard shortcut: Escape to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Find active item preview on mount or route change
  useEffect(() => {
    const currentIndex = NAV_ITEMS.findIndex(item => 
      item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
    );
    if (currentIndex !== -1) {
      setActivePreviewIndex(currentIndex);
    }
  }, [pathname]);

  const currentPreview = NAV_ITEMS[activePreviewIndex] || NAV_ITEMS[0];

  return (
    <>
      {/* ====================================================================
          1. FLOATING GLASSMORPHIC CAPSULE DOCK
          ==================================================================== */}
      <header 
        className={`${styles.headerWrapper} ${scrolled ? styles.headerWrapperScrolled : ''}`}
      >
        <motion.div
          layout
          className={`${styles.floatingDock} ${scrolled ? styles.floatingDockScrolled : ''} ${isScrollingDown ? styles.floatingDockCompact : ''} ${menuOpen ? styles.headerHidden : ''}`}
          initial={{ opacity: 0, y: -25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            duration: 0.7, 
            ease: [0.16, 1, 0.3, 1], 
            delay: 0.1 
          }}
        >
          {/* Left: Brand Logo & Interactive Crane Badge */}
          <Link href="/" className={styles.logoGroup} aria-label="Origamie Home">
            <motion.div 
              className={styles.logoIconBadge}
              whileHover={{ scale: 1.08, rotate: 6 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Image
                src="/crane-logo.png"
                alt="Origamie crane emblem"
                width={24}
                height={24}
                className={styles.craneLogoImg}
                priority
              />
            </motion.div>
            
            <div className={styles.logoTypography}>
              <span className={styles.brandName}>origamie</span>
              <span className={styles.brandDot}>.</span>
              <span className={styles.brandSuffix}>studio</span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Dock (Smoothly hidden when scrolling down) */}
          <AnimatePresence mode="wait">
            {!isScrollingDown && (
              <motion.nav 
                className={styles.centerDock} 
                aria-label="Main Navigation"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div 
                  className={styles.navPillContainer}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  {NAV_ITEMS.map((item) => {
                    const isActive = item.href === '/' 
                      ? pathname === '/' 
                      : pathname?.startsWith(item.href);

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                        onMouseEnter={() => setHoveredNav(item.label)}
                      >
                        <span className={styles.navLabel}>{item.label}</span>

                        {item.badge && (
                          <span className={styles.navItemBadge}>{item.badge}</span>
                        )}

                        {/* Active Sliding Background */}
                        {isActive && (
                          <motion.span
                            layoutId="activeNavIndicator"
                            className={styles.navActiveBackground}
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                        )}

                        {/* Hover Highlight */}
                        {hoveredNav === item.label && !isActive && (
                          <motion.span
                            layoutId="hoverNavIndicator"
                            className={styles.navHoverBackground}
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Right: Studio Status, Primary CTA & Kinetic Menu Trigger */}
          <div className={styles.rightActions}>
            <AnimatePresence>
              {!isScrollingDown && (
                <motion.div 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Live Availability Badge */}
                  <div className={styles.liveStatusPill} title="Studio is accepting select projects">
                    <span className={styles.statusDotPulse} />
                    <span>OPEN FOR WORK</span>
                  </div>

                  {/* Quick Action Primary Button */}
                  <Link href="/contact" className={styles.ctaButton}>
                    <span>Let's Talk</span>
                    <ArrowUpRight size={16} className={styles.ctaIcon} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kinetic Curtain Menu Button (Always visible) */}
            <button
              className={styles.menuTrigger}
              onClick={() => setMenuOpen(true)}
              aria-label="Open Full Studio Menu"
              aria-expanded={menuOpen}
            >
              <div className={styles.burgerLines}>
                <span className={`${styles.burgerLine} ${styles.burgerLineTop}`} />
                <span className={`${styles.burgerLine} ${styles.burgerLineBottom}`} />
              </div>
              <span>Menu</span>
            </button>
          </div>
        </motion.div>
      </header>

      {/* ====================================================================
          2. FULL-SCREEN KINETIC CURTAIN MENU
          ==================================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.curtainBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={curtainVariants}
          >
            {/* Ambient Aurora Glows & Isometric Grid */}
            <div className={styles.auroraGlowContainer}>
              <div className={styles.auroraGlow1} />
              <div className={styles.auroraGlow2} />
              <div className={styles.curtainGridPattern} />
            </div>

            {/* Curtain Header */}
            <div className={styles.curtainHeader}>
              <Link 
                href="/" 
                className={styles.curtainLogo}
                onClick={() => setMenuOpen(false)}
              >
                <div className={styles.logoIconBadge}>
                  <Image
                    src="/crane-logo.png"
                    alt="Origamie logo"
                    width={24}
                    height={24}
                    className={styles.craneLogoImg}
                  />
                </div>
                <div className={styles.logoTypography}>
                  <span className={styles.brandName}>origamie</span>
                  <span className={styles.brandDot}>.</span>
                  <span className={styles.brandSuffix}>studio</span>
                </div>
              </Link>

              <button
                className={styles.curtainCloseBtn}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <span>Close</span>
                <span className={styles.closeIcon}>✕</span>
              </button>
            </div>

            {/* Main Curtain Content (Dual-Pane Kinetic Grid) */}
            <div className={styles.curtainContent}>
              
              {/* Left Pane: Kinetic Nav Links */}
              <nav className={styles.kineticLinksNav} aria-label="Full Screen Navigation">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = item.href === '/' 
                    ? pathname === '/' 
                    : pathname?.startsWith(item.href);

                  return (
                    <div key={item.label} className={styles.linkRevealMask}>
                      <motion.div variants={linkItemVariants}>
                        <Link
                          href={item.href}
                          className={`${styles.kineticNavLink} ${isActive ? styles.kineticNavLinkActive : ''}`}
                          onClick={() => setMenuOpen(false)}
                          onMouseEnter={() => setActivePreviewIndex(index)}
                        >
                          <span className={styles.kineticLinkIndex}>0{index + 1}</span>
                          <span className={styles.kineticLinkTitle}>
                            {item.label}
                            {isActive && (
                              <Sparkles size={24} className={styles.activeSparkleIcon} />
                            )}
                          </span>
                          <ChevronRight size={28} className={styles.linkHoverArrow} />
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </nav>

              {/* Right Pane: Interactive Live Preview & Dispatch Column */}
              <motion.div variants={infoPanelVariants} className={styles.curtainInfoColumn}>
                
                {/* Dynamic Preview Card reflecting hovered link */}
                <div className={styles.previewFeatureCard}>
                  <div className={styles.previewTag}>{currentPreview.tag}</div>
                  <h3 className={styles.previewHeading}>{currentPreview.previewTitle}</h3>
                  <p className={styles.previewDesc}>{currentPreview.previewDesc}</p>
                </div>

                {/* Dispatch & Live Studio Details */}
                <div className={styles.curtainDetailsGrid}>
                  <div className={styles.detailBlock}>
                    <span className={styles.detailHeading}>Studio Time & Base</span>
                    <div className={styles.liveClockDisplay}>
                      <Clock size={15} />
                      <span>{timeString || 'CALICUT, IN'}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Kerala, India (IST)</span>
                  </div>

                  <div className={styles.detailBlock}>
                    <span className={styles.detailHeading}>Direct Dispatch</span>
                    <a href="mailto:hello@origamie.in" className={styles.detailLink}>
                      <Mail size={16} />
                      <span>hello@origamie.in</span>
                    </a>
                  </div>

                  <div className={styles.detailBlock}>
                    <span className={styles.detailHeading}>Fast Track</span>
                    <a 
                      href="https://wa.me/919544639774" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.detailLink}
                    >
                      <MessageCircle size={16} />
                      <span>+91 9544 639 774</span>
                    </a>
                  </div>

                  <div className={styles.detailBlock}>
                    <span className={styles.detailHeading}>Current Availability</span>
                    <div className={styles.liveStatusPill} style={{ width: 'fit-content' }}>
                      <span className={styles.statusDotPulse} />
                      <span>ACCEPTING Q3/Q4</span>
                    </div>
                  </div>
                </div>

                {/* Social Networks Footer */}
                <div className={styles.curtainSocialRow}>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.curtainSocialBtn}
                  >
                    Instagram ↗
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.curtainSocialBtn}
                  >
                    LinkedIn ↗
                  </a>
                  <a 
                    href="https://behance.net" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.curtainSocialBtn}
                  >
                    Behance ↗
                  </a>
                  <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.curtainSocialBtn}
                  >
                    Twitter / X ↗
                  </a>
                </div>

              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
