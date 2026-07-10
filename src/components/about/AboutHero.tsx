'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/app/about/about.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className={styles.heroWrapper} ref={containerRef}>
      <motion.section 
        className={styles.heroContentMain}
        style={{ y: yPos, opacity, scale }}
      >
        <motion.h1
          className={styles.mainTitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          We build brands that<br />
          people actually <span className={styles.highlightWord}>#love.</span>
        </motion.h1>

        <motion.p
          className={styles.mainSubtitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          We are a digital studio focused on high-conversion design, bridging the gap between beautiful aesthetics and profitable business outcomes.
        </motion.p>
      </motion.section>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0.5, 0]) }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </div>
  );
}
