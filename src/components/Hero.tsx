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

const FloatingCrane = ({ style, delay, scale = 1 }: { style: React.CSSProperties, delay: number, scale?: number }) => (
  <motion.div
    style={{ position: 'absolute', zIndex: 1, ...style }}
    animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <svg width={80 * scale} height={80 * scale} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="55,20 95,15 75,50" fill="transparent" />
        <polygon points="30,65 70,45 75,50" fill="transparent" />
        <polygon points="30,65 75,50 72,70" fill="currentColor" />
        <polygon points="75,50 90,95 70,85" fill="transparent" />
        <polygon points="15,30 40,40 30,65" fill="transparent" />
        <polygon points="5,45 15,30 20,42" fill="transparent" />
        <polygon points="30,65 48,15 55,20" fill="currentColor" opacity="0.5" />
        <polygon points="30,65 55,20 70,45" fill="currentColor" opacity="0.5" />
      </g>
    </svg>
  </motion.div>
);

export default function Hero() {
  return (
    <div className={styles.heroWrapper}>
      {/* Background Cranes */}
      <FloatingCrane style={{ top: '35%', left: '10%', color: '#2563EB', opacity: 0.9 }} delay={0} scale={1.2} />
      <FloatingCrane style={{ top: '18%', right: '22%', color: '#1D4ED8', opacity: 0.8 }} delay={1} scale={0.6} />
      <FloatingCrane style={{ top: '55%', left: '2%', color: '#1E3A8A', opacity: 0.8 }} delay={2} scale={0.7} />
      <FloatingCrane style={{ top: '30%', right: '8%', color: '#1E3A8A', opacity: 0.9 }} delay={3} scale={0.8} />
      <FloatingCrane style={{ bottom: '45%', left: '42%', color: '#2563EB', opacity: 0.6 }} delay={1.5} scale={0.5} />
      <FloatingCrane style={{ bottom: '40%', right: '28%', color: '#1E40AF', opacity: 0.8 }} delay={2.5} scale={0.6} />
      <FloatingCrane style={{ top: '48%', right: '-2%', color: '#1E3A8A', opacity: 0.6 }} delay={0.5} scale={1.5} />

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
          Origame is a creative studio for founders and marketing teams who want a <strong>beautiful site that actually sells</strong>. We design, build and grow it — typically <strong>2–4x more qualified leads within 90 days</strong>.
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
          No pitch deck. No pressure. Fixed <strong>quote within 24 hours</strong>.
        </motion.p>
      </section>
    </div>
  );
}
