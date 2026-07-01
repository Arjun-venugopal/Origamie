'use client';

import React from 'react';
import styles from '@/app/page.module.css';

export default function GridFooter() {
  return (
    <footer id="contact" className={styles.gridFooter}>
      <div className={styles.footerGradientBg} />
      {/* Background watermark text */}
      <div className={styles.footerBgText}>Origamie</div>

      <div className={styles.footerContent}>
        {/* Logo at the top center */}
        <div className={styles.footerLogoWrapper}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.footerLogoIcon}>
            <g stroke="white" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
              <polygon points="55,20 95,15 75,50" fill="white" />
              <polygon points="30,65 70,45 75,50" fill="white" />
              <polygon points="30,65 75,50 72,70" fill="white" />
              <path d="M 75,50 L 90,95 Q 63,83 70,85 Z" fill="white" />
              <polygon points="15,30 40,40 30,65" fill="white" />
              <path d="M 5,45 L 15,30 L 20,42 Q 10,48 5,45 Z" fill="white" />
              <polygon points="30,65 48,15 55,20" fill="#3B5DFE" />
              <polygon points="30,65 55,20 70,45" fill="#4D70FF" />
            </g>
          </svg>
        </div>

        {/* Title */}
        <h2 className={styles.footerTitle}>
          Let's build something <br />
          <span>Pays for itself.</span>
        </h2>

        {/* Description */}
        <p className={styles.footerSubtitle}>
          Book a free 20-minute strategy call. You'll leave with 3 conversion ideas you can <br />
          ship this week — even if we never work together.
        </p>

        {/* CTA Buttons Row */}
        <div className={styles.footerCtaRow}>
          <a href="#call" className={styles.footerPrimaryBtn}>
            Book a free strategy call
          </a>
          <span className={styles.footerEmailLink}>
            or email <a href="mailto:hello@origame.in">hello@origame.in</a>
          </span>
        </div>

        {/* Micro Copy */}
        <p className={styles.footerMicroCopy}>
          No pitch deck. No pressure. Fixed quote within 24 hours.
        </p>
      </div>

      {/* Bottom copyright bar */}
      <div className={styles.footerBottomBar}>
        <span>© {new Date().getFullYear()} Origamie. All rights reserved.</span>
        <span>Design and developed by Origamie</span>
      </div>
    </footer>
  );
}
