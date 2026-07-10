'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Target, ShieldCheck, Zap } from 'lucide-react';
import styles from '@/app/about/about.module.css';

const values = [
  {
    id: 1,
    title: 'Craftsmanship',
    desc: 'We sweat the small stuff. Every pixel, every animation, and every line of code is carefully considered to build a premium experience.',
    icon: <PenTool size={32} strokeWidth={1.5} />
  },
  {
    id: 2,
    title: 'Conversion-Focused',
    desc: 'A beautiful site is useless if it doesn\'t sell. We engineer our designs specifically to guide users toward measurable actions.',
    icon: <Target size={32} strokeWidth={1.5} />
  },
  {
    id: 3,
    title: 'Transparency',
    desc: 'No pitch decks, no hidden fees, no pressure. We offer a fixed quote within 24 hours and maintain clear communication throughout the build.',
    icon: <ShieldCheck size={32} strokeWidth={1.5} />
  },
  {
    id: 4,
    title: 'Speed & Agility',
    desc: 'We move fast without breaking things. Using modern stacks like Next.js and Framer Motion, we deliver high-performance sites quickly.',
    icon: <Zap size={32} strokeWidth={1.5} />
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpCard = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function AboutValues() {
  return (
    <section id="our-values" className={styles.valuesSection}>
      <div className={styles.valuesHeader}>
        <motion.p 
          className={styles.storyPreTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Our Values
        </motion.p>
        <motion.h2 
          className={styles.storyTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          What We <span>Stand For</span>
        </motion.h2>
      </div>

      <motion.div 
        className={styles.valuesGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {values.map((v) => (
          <motion.div key={v.id} className={styles.valueCard} variants={fadeUpCard}>
            <div className={styles.valueIconWrapper}>
              {v.icon}
            </div>
            <h3 className={styles.valueTitle}>{v.title}</h3>
            <p className={styles.valueDesc}>{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
