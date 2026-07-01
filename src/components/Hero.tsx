'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/app/page.module.css';
import FloatingBird from './FloatingBird';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  }),
};


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
          Websites &amp; brands<br />
          engineered to{' '}
          <span className={styles.convertHash}>#</span>
          <span className={styles.convertWord}>convert.</span>
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
