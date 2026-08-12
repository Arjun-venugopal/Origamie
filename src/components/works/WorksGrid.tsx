'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, TrendingUp, Layers } from 'lucide-react';
import styles from '@/app/works/works.module.css';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  image: string;
  link: string;
  year: string;
  deliverable: string;
}

const categories = ['All Projects', 'Web Applications', 'E-Commerce', 'Brand Identity', 'Web Design'];

const works: WorkItem[] = [
  {
    id: 1,
    title: 'Apex Fintech Dashboard',
    category: 'Web Applications',
    metric: '+185%',
    metricLabel: 'User Activation Rate',
    image: '/hand.jpg',
    link: '#',
    year: '2026',
    deliverable: 'Web App & Design System'
  },
  {
    id: 2,
    title: 'Veloce Athletic Gear',
    category: 'E-Commerce',
    metric: '2.4x',
    metricLabel: 'Checkout Conversion Boost',
    image: '/runner.jpg',
    link: '#',
    year: '2026',
    deliverable: 'Headless E-Commerce & CRO'
  },
  {
    id: 3,
    title: 'Aura Studio Rebrand',
    category: 'Brand Identity',
    metric: 'Awwwards',
    metricLabel: 'Site of the Month Winner',
    image: '/people.jpg',
    link: '#',
    year: '2025',
    deliverable: 'Brand Strategy & 3D Experience'
  },
  {
    id: 4,
    title: 'Pulse AI SaaS Platform',
    category: 'Web Design',
    metric: '+310%',
    metricLabel: 'Qualified Lead Growth',
    image: '/hand.jpg',
    link: '#',
    year: '2025',
    deliverable: 'High-Converting Web Design'
  }
];

export default function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  const filteredWorks = activeCategory === 'All Projects' 
    ? works 
    : works.filter(w => w.category === activeCategory);

  return (
    <section className={styles.gridSection}>
      <div className={styles.gridSectionHeader}>
        <motion.div 
          className={styles.worksHeaderBadge}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={14} className={styles.badgeSparkleIcon} />
          <span>AWARD-WINNING PORTFOLIO</span>
        </motion.div>

        <motion.p 
          className={styles.sectionPreTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected Works
        </motion.p>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Featured <span>Case Studies</span>
        </motion.h2>

        {/* Category Filter Pills */}
        <motion.div 
          className={styles.categoryFiltersWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeCategory === category ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div className={styles.gridContainer} layout>
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.a 
              href={work.link}
              key={work.id} 
              className={styles.worksCard}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              {/* Image & Metric Overlay */}
              <div className={styles.worksImageContainer}>
                <Image 
                  src={work.image} 
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.worksImage}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.worksImageOverlay} />

                {/* Top Badge: Category & Year */}
                <div className={styles.worksTopBadges}>
                  <span className={styles.worksCategoryBadge}>{work.category}</span>
                  <span className={styles.worksYearBadge}>{work.year}</span>
                </div>

                {/* Metric Badge Pill */}
                <div className={styles.worksMetricPill}>
                  <TrendingUp size={16} className={styles.metricIcon} />
                  <div className={styles.metricTextGroup}>
                    <span className={styles.metricValue}>{work.metric}</span>
                    <span className={styles.metricLabel}>{work.metricLabel}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className={styles.worksContent}>
                <div className={styles.worksDeliverableRow}>
                  <Layers size={14} className={styles.deliverableIcon} />
                  <span>{work.deliverable}</span>
                </div>
                
                <h3 className={styles.worksTitle}>
                  <span>{work.title}</span>
                  <div className={styles.worksArrowCircle}>
                    <ArrowUpRight className={styles.worksIcon} size={20} />
                  </div>
                </h3>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
