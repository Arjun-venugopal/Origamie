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

export default function About() {
  return (
    <section id="team" className={styles.about}>
      <motion.h2
        className={`${styles.sectionTitle} ${styles.textGradient}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        Man Behind<br />The Work
      </motion.h2>

      <motion.div
        className={styles.aboutTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        <div className={styles.sectionLabel}>TEAM — 04</div>
        <div className={styles.aboutQuote}>
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" width={32} height={32} style={{ borderRadius: '50%', border: '2px solid white' }} alt="Team member" />
            <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" width={32} height={32} style={{ borderRadius: '50%', marginLeft: '-8px', border: '2px solid white' }} alt="Team member" />
            <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" width={32} height={32} style={{ borderRadius: '50%', marginLeft: '-8px', border: '2px solid white' }} alt="Team member" />
          </div>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: 1.5 }}>
            From digital campaigns to full-stack brand systems, our small team shipped big things. Every single day, from home.
          </p>
        </div>
      </motion.div>

      <motion.div
        className={styles.aboutGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div className={styles.aboutPhoto} variants={fadeInUp} custom={0}>
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
            alt="Founder portrait"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        <motion.div
          className={styles.cardBlue}
          style={{ borderRadius: 'var(--radius-xl)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          variants={fadeInUp}
          custom={1}
        >
          <div style={{ fontSize: '2rem', color: 'var(--color-accent-yellow)' }}>✦</div>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.8, marginBottom: '16px' }}>GLOBAL RECOGNITION</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 500, lineHeight: 1.2 }}>We thrive to create design that make impact—not just impressions.</h3>
          </div>
        </motion.div>

        <motion.div className={styles.reviewCard} variants={fadeInUp} custom={2}>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, opacity: 0.5, marginBottom: '8px' }}>Review</p>
            <h2 className={styles.textGradient} style={{ fontSize: '5rem', margin: 0, lineHeight: 1 }}>4.9/5</h2>
          </div>
          <div className="flex-between" style={{ alignItems: 'flex-end', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '24px' }}>
            <p style={{ fontSize: '0.875rem', opacity: 0.6, lineHeight: 1.5 }}>by 400+ reviews<br />on Trustpilot</p>
            <div style={{ color: '#00b67a', fontWeight: 700, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>★</span> Trustpilot
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.aboutBottom}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        <p style={{ fontSize: '0.875rem', maxWidth: '400px', opacity: 0.6 }}>
          Whether you&apos;re launching something new or reshaping what exists, we&apos;re here to help you stand out—with clarity, creativity, and edge.
        </p>
        <a href="#contact" className="btn btn-primary">Start Your Project ↗</a>
      </motion.div>
    </section>
  );
}
