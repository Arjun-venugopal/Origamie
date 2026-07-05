'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/app/page.module.css';

export default function GridFooter() {
  return (
    <footer id="contact" className={styles.gridFooter}>
      {/* === DESIGN SYSTEM: Layered Background & Wave Elements === */}

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
            fill="#FFFFFF"
            opacity="0.05"
          />
          {/* Wave 2 */}
          <path
            d="M0,220 C480,90 960,320 1440,160 L1440,400 L0,400 Z"
            fill="#FFFFFF"
            opacity="0.07"
          />
          {/* Wave 3 */}
          <path
            d="M0,180 C360,60 1080,300 1440,120 L1440,400 L0,400 Z"
            fill="#FFFFFF"
            opacity="0.04"
          />
        </svg>
      </div>

      {/* 2. Overlay: Semi-transparent dark overlay to ensure readability */}
      <div className={styles.footerOverlay} />

      {/* Background watermark text (subtle opacity) */}
      <div className={styles.footerBgText}>Origamie</div>

      {/* === Main Content (z-indexed above overlay) === */}
      <div className={styles.footerContent}>
        {/* Logo Icon */}
        <div className={styles.footerLogoWrapper}>
          <Image
            src="/crane-logo.png"
            alt="Origamie crane logo"
            width={80}
            height={80}
            className={styles.footerLogoIcon}
          />
        </div>

        {/* Heading */}
        <h2 className={styles.footerTitle}>
          Let&apos;s build something <br />
          <span>Pays for itself.</span>
        </h2>

        {/* Description */}
        <p className={styles.footerSubtitle}>
          Book a free 20-minute strategy call. You&apos;ll leave with 3 conversion ideas you can
          ship this week — even if we never work together.
        </p>

        {/* CTA Button & Links */}
        <div className={styles.footerCtaRow}>
          <a href="#call" className={styles.footerPrimaryBtn}>
            Book a free strategy call
          </a>
          <span className={styles.footerEmailLink}>
            or email <a href="mailto:hello@origamie.in">hello@origamie.in</a>
          </span>
        </div>

        {/* Trust text */}
        <p className={styles.footerMicroCopy}>
          No pitch deck. No pressure. Fixed quote within 24 hours.
        </p>
      </div>

      {/* === Bottom Bar === */}
      <div className={styles.footerBottomBar}>
        <span className={styles.footerCopyright}>
          © {new Date().getFullYear()} Origamie. All rights reserved.
        </span>
        <div className={styles.footerBottomLinks}>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <span className={styles.footerDesigner}>
          Design and developed by Origamie
        </span>
      </div>
    </footer>
  );
}
