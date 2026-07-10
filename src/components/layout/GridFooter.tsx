'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './layout.module.css';

const textReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function GridFooter() {
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });


  // Inner content parallax (simulates the curtain reveal)
  const contentY = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerGradientSpill} />
      <footer id="contact" className={styles.gridFooter} ref={footerRef}>
        {/* 0. Aurora Gradient Flow Background */}
        <div className={styles.auroraContainer}>
          <div className={styles.auroraBlob1} />
          <div className={styles.auroraBlob2} />
          <div className={styles.auroraBlob3} />
        </div>

        {/* 1. Curved Wave Backdrop (Layered SVG waves with opacity variations) */}
        <div className={styles.footerWaveLayers}>
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wave 1 */}
            <path
              d="M0,150 C360,280 720,100 1080,240 C1260,310 1380,240 1440,200 L1440,400 L0,400 Z"
              fill="#006affff"
              opacity="0.05"
            />
            {/* Wave 2 */}
            <path
              d="M0,220 C480,90 960,320 1440,160 L1440,400 L0,400 Z"
              fill="#330791ff"
              opacity="0.07"
            />
            {/* Wave 3 */}
            <path
              d="M0,180 C360,60 1080,300 1440,120 L1440,400 L0,400 Z"
              fill="#07c1ffff"
              opacity="0.04"
            />
          </svg>
        </div>

        {/* 2. Overlay: Semi-transparent dark overlay to ensure readability */}
        <div className={styles.footerOverlay} />


        {/* === Main Content (z-indexed above overlay) === */}
        <motion.div
          className={styles.footerContent}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Logo Icon */}
          <motion.div
            className={styles.footerLogoWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={0}
          >
            <Image
              src="/crane-logo.png"
              alt="Origamie crane logo"
              width={80}
              height={80}
              style={{ width: 'auto', height: 'auto' }}
              className={styles.footerLogoIcon}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className={styles.footerTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={1}
          >
            Let&apos;s build something <br />
            <span>Pays for itself.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            className={styles.footerSubtitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={2}
          >
            Book a free 20-minute strategy call. You&apos;ll leave with 3 conversion ideas you can
            ship this week — even if we never work together.
          </motion.p>

          {/* CTA Button & Links */}
          <motion.div
            className={styles.footerCtaRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={3}
          >
            <motion.a
              href="/contact"
              className={styles.footerPrimaryBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a free strategy call
              <ArrowRight size={20} />
            </motion.a>
            <span className={styles.footerEmailLink}>
              or email <a href="mailto:hello@origamie.in">hello@origamie.in</a>
            </span>
          </motion.div>

          {/* Trust text */}
          <motion.p
            className={styles.footerMicroCopy}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={4}
          >
            No pitch deck. No pressure. Fixed quote within 24 hours.
          </motion.p>
        </motion.div>

        {/* === Bottom Bar === */}
        <motion.div
          className={styles.footerBottomBar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textReveal}
          custom={5}
        >
          <span className={styles.footerCopyright}>
            © {new Date().getFullYear()} Origamie. All rights reserved.
          </span>

          <div className={styles.footerBottomLinks}>
            <Link href="/works">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.footerSocials}>
            {/* TODO: Replace with real social media URLs */}
            <a href="#" className={styles.footerSocialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className={styles.footerSocialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="#" className={styles.footerSocialLink} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
