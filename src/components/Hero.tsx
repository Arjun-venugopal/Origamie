'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/page.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const FloatingBird = ({ style, delay, scale = 1 }: { style: React.CSSProperties, delay: number, scale?: number }) => (
  <motion.div
    style={{ position: 'absolute', zIndex: 1, ...style }}
    animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <svg width={80 * scale} height={80 * scale} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      {/* Blue wing */}
      <polygon points="55,15 95,35 75,70 45,55" fill="#5773FF" opacity="0.9" />
      <polygon points="55,15 75,25 75,70 45,55" fill="#4060E0" opacity="0.9" />
      {/* Outline */}
      <polyline points="55,15 95,35 75,70 55,105 25,80 45,55 55,15" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="45" y1="55" x2="75" y2="70" stroke="#1a1a1a" strokeWidth="2" />
      {/* Head */}
      <polyline points="25,80 10,75 5,65" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tail */}
      <polyline points="55,105 40,115 30,110" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="55,105 50,118 38,118" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

export default function Hero() {
  return (
    <div id="home" className={styles.heroWrapper}>
      {/* Background elements */}
      <FloatingBird style={{ top: '15%', left: '15%', opacity: 0.8 }} delay={0} scale={0.4} />
      <FloatingBird style={{ top: '25%', right: '15%', opacity: 0.9 }} delay={2} scale={0.4} />
      <FloatingBird style={{ top: '35%', right: '5%', opacity: 0.8 }} delay={1.5} scale={0.4} />
      <FloatingBird style={{ top: '55%', left: '5%', opacity: 0.9 }} delay={3} scale={0.4} />
      <FloatingBird style={{ top: '50%', left: '45%', opacity: 0.6 }} delay={4} scale={0.3} />
      <FloatingBird style={{ top: '60%', right: '25%', opacity: 0.7 }} delay={5} scale={0.4} />
      <FloatingBird style={{ top: '55%', right: '5%', opacity: 0.9 }} delay={1} scale={0.8} />

      <div className={styles.heroBgText}>Origamie</div>

      <section className={styles.heroContentMain}>
        <motion.h1
          className={styles.mainTitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          Websites & brands<br />
          engineered to <span className={styles.italicHighlight}>#convert.</span>
        </motion.h1>

        <motion.p
          className={styles.mainSubtitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Origamie is a creative studio for founders and marketing teams who want a <strong>beautiful site that actually sells</strong>. We design, build and grow it — typically <strong>2–4x more qualified leads within 90 days.</strong>
        </motion.p>

        <motion.div
          className={styles.heroButtons}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          <a href="#strategy" className={styles.primaryBtn}>
            Book a free strategy call
          </a>
          <a href="#works" className={styles.secondaryBtn}>
            View Our Works
          </a>
        </motion.div>

        <motion.p
          className={styles.heroMicroCopy}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          No pitch deck. No pressure. Fixed quote within 24 hours.
        </motion.p>
      </section>
    </div>
  );
}
