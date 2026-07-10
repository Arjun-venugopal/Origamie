'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/app/page.module.css';
import FloatingBird from './FloatingBird';

const lineReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.8], [0.8, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div id="home" className={styles.heroWrapper} ref={containerRef}>
      {/* Background elements */}
      <FloatingBird style={{ top: '15%', left: '15%', opacity: 0.6 }} delay={0} scale={0.3} />
      <FloatingBird style={{ top: '25%', right: '15%', opacity: 0.85 }} delay={2} scale={0.55} />
      <FloatingBird style={{ top: '35%', right: '5%', opacity: 0.7 }} delay={1.5} scale={0.4} />
      <FloatingBird style={{ top: '55%', left: '5%', opacity: 0.9 }} delay={3} scale={0.65} />
      <FloatingBird style={{ top: '50%', left: '45%', opacity: 0.4 }} delay={4} scale={0.25} />
      <FloatingBird style={{ top: '60%', right: '25%', opacity: 0.75 }} delay={5} scale={0.48} />
      <FloatingBird style={{ top: '55%', right: '5%', opacity: 0.95 }} delay={1} scale={0.85} />

      <motion.div 
        className={styles.heroBgText}
        style={{ y: bgTextY, opacity: bgTextOpacity }}
      >
        Origamie
      </motion.div>

      <motion.section 
        className={styles.heroContentMain}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <h1 className={styles.mainTitle}>
          <div style={{ overflow: 'hidden' }}>
            <motion.div initial="hidden" animate="visible" variants={lineReveal} custom={0}>
              Websites &amp; brands
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.div initial="hidden" animate="visible" variants={lineReveal} custom={1}>
              engineered to{' '}
              <span className={styles.convertHash}>#</span>
              <span className={styles.convertWord}>convert.</span>
            </motion.div>
          </div>
        </h1>

        <motion.p
          className={styles.mainSubtitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          Origamie is a creative studio for founders and marketing teams who want a <strong>beautiful site that actually sells</strong>. We design, build and grow it — typically <strong>2–4x more qualified leads within 90 days.</strong>
        </motion.p>

        <motion.div
          className={styles.heroButtons}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <a href="/contact" className={styles.primaryBtn}>
            Book a free strategy call
          </a>
          <a href="/works" className={styles.secondaryBtn}>
            View Our Works
          </a>
        </motion.div>

        <motion.p
          className={styles.heroMicroCopy}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
        >
          No pitch deck. No pressure. Fixed quote within 24 hours.
        </motion.p>
      </motion.section>
    </div>
  );
}
