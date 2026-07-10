'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/app/contact/contact.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function ContactHero() {
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
        <motion.div 
          className={styles.breadcrumb}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Contact Us</span>
        </motion.div>

        <motion.h1
          className={styles.mainTitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Let&apos;s talk about <span className={styles.highlightWord}>#growth.</span>
        </motion.h1>

        <motion.p
          className={styles.mainSubtitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          style={{ marginBottom: 0 }}
        >
          Ready to fold your ideas into reality? Reach out below and we&apos;ll get back to you within 24 hours.
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
