'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/app/page.module.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export default function Hero() {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroTopRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>AGENCY THAT MOVES CULTURE</p>
            <h2>Design studio that not only creates digital products but also experiences.</h2>
            <a href="#contact" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '16px' }}>
              Let&apos;s Collaborate ↗
            </a>
          </div>
          <div className={styles.heroScrollText}>Scroll for more</div>
        </motion.div>

        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Boulevard
        </motion.h1>
      </section>

      <section className={styles.heroWhiteSection}>
        <motion.div
          className={styles.heroMidRow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            className={styles.heroSubtitle}
            variants={fadeInUp}
            custom={0}
          >
            Reshaping what exists, we&apos;re here to help you stand out
            <span className={styles.heroSubtitleFade}>—with clarity, creativity, and edge.</span>
          </motion.h2>
          <motion.a
            href="#services"
            className={styles.scrollBtn}
            variants={fadeInUp}
            custom={1}
            whileHover={{ y: 4 }}
            aria-label="Scroll to services"
          >
            ↓
          </motion.a>
        </motion.div>

        <motion.div
          className={styles.heroCards}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div className={`${styles.card} ${styles.cardBlue}`} variants={fadeInUp} custom={0}>
            <div style={{ color: 'var(--color-accent-yellow)', fontSize: '1.5rem', fontWeight: 700 }}>✖</div>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.8, marginBottom: '16px' }}>MADE FOR THE BOLD</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.3, fontFamily: 'var(--font-outfit)' }}>Design experiences, not just screens. Tell stories, not just taglines.</h3>
            </div>
          </motion.div>

          <motion.div className={`${styles.card} ${styles.cardBlack}`} variants={fadeInUp} custom={1}>
            <Image
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
              alt="Abstract art"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover', opacity: 0.5 }}
            />
            <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Est. 2018</p>
            </div>
          </motion.div>

          <motion.div className={`${styles.card} ${styles.cardWhite}`} variants={fadeInUp} custom={2}>
            <div className="flex-between">
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.5 }}>GROWTH</p>
              <h2 className={styles.textGradient} style={{ fontSize: '3.5rem', margin: 0, lineHeight: 1 }}>+32%</h2>
            </div>
            <div className="flex-between" style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '0.875rem', maxWidth: '140px', opacity: 0.8 }}>Design experiences, not just screens.</p>
              <div style={{ display: 'flex' }}>
                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" width={36} height={36} style={{ borderRadius: '50%', marginLeft: '-12px', border: '2px solid white' }} alt="Team member" />
                <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" width={36} height={36} style={{ borderRadius: '50%', marginLeft: '-12px', border: '2px solid white' }} alt="Team member" />
                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" width={36} height={36} style={{ borderRadius: '50%', marginLeft: '-12px', border: '2px solid white' }} alt="Team member" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className={styles.heroBottomRow}>
          <div>ABOUT — 01</div>
          <div className={styles.heroBottomText}>
            We help you to dream and ideas into visuals that currently disrupt spaces.
          </div>
          <a href="#contact" className={styles.bookCallLink}>Book a Call Now</a>
        </div>
      </section>
    </div>
  );
}
