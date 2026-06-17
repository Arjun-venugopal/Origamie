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
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const projects = [
  {
    title: 'Chat Genius',
    tags: ['Website Design', 'Development'],
    date: '2024 — Still in prog',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2000&auto=format&fit=crop',
  },
  {
    title: 'Field Type',
    tags: ['Branding', 'Visual Identity'],
    date: '2023 — Jan 2024',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
  },
];

const stats = [
  { number: '15+', label: 'Years of Experience' },
  { number: '50+', label: 'Projects Completed' },
  { number: '20+', label: 'Clients Worldwide' },
  { number: '100%', label: 'Customer Satisfaction' },
];

export default function Work() {
  return (
    <section id="projects" className={styles.work}>
      <motion.h2
        className={`${styles.sectionTitle} ${styles.textGradient}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        Our Work
      </motion.h2>

      <div className={styles.workTop}>
        <div className={styles.sectionLabel}>PROJECT — 03</div>
      </div>

      <div className={styles.workGrid}>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className={styles.workCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={index}
          >
            <div className={styles.workImageWrapper}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.workInfo}>
              <div className={styles.workInfoRow}>
                <h3>{project.title}</h3>
                <div className={styles.workTags}>
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className={styles.workDate}>{project.date}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.workBanner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        <div className={styles.workBannerLeft}>
          <div className={styles.workBannerImageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2000&auto=format&fit=crop"
              alt="Portfolio work"
              fill
              sizes="250px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.workBannerText}>
            We born in a shared studio loft with one mission: <span>create work that doesn&apos;t blend in.</span>
          </div>
        </div>
        <a href="#projects" className="btn btn-primary" style={{ padding: '16px 32px' }}>See All Projects ↗</a>
      </motion.div>

      <div className={styles.statsContainer}>
        <div className={styles.sectionLabel} style={{ marginBottom: '24px' }}>AGENCY MILESTONES</div>
        <motion.div
          className={styles.statsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className={styles.statItem} variants={fadeInUp} custom={0}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
