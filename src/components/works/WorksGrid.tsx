'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, TrendingUp, Layers, Clock } from 'lucide-react';
import styles from '@/app/works/works.module.css';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  metric?: string;
  metricLabel?: string;
  image: string;
  link: string;
  year: string;
  deliverable: string;
  tags?: string[];
  isComingSoon?: boolean;
}

const categories = ['All Projects', 'Healthcare', 'Web Applications', 'E-Commerce', 'Brand Identity', 'Web Design'];

const works: WorkItem[] = [
  {
    id: 1,
    title: 'HealFort Hospital',
    category: 'Healthcare',
    metric: '+240%',
    metricLabel: 'Online Patient Inquiries',
    image: '/images/healfort-hospital.jpg',
    link: 'https://healforthospital.com/',
    year: '2025',
    deliverable: 'Advanced Orthopaedic & Trauma Care Platform',
    tags: ['Web Applications', 'Web Design'],
    isComingSoon: false
  },
  {
    id: 2,
    title: 'Apex Fintech Dashboard',
    category: 'Web Applications',
    image: '/hand.jpg',
    link: '#',
    year: '2026',
    deliverable: 'Web App & Design System',
    tags: ['Web Design'],
    isComingSoon: true
  },
  {
    id: 3,
    title: 'Veloce Athletic Gear',
    category: 'E-Commerce',
    image: '/runner.jpg',
    link: '#',
    year: '2026',
    deliverable: 'Headless E-Commerce & CRO',
    isComingSoon: true
  },
  {
    id: 4,
    title: 'Aura Studio Rebrand',
    category: 'Brand Identity',
    image: '/people.jpg',
    link: '#',
    year: '2025',
    deliverable: 'Brand Strategy & 3D Experience',
    isComingSoon: true
  },
  {
    id: 5,
    title: 'Pulse AI SaaS Platform',
    category: 'Web Design',
    image: '/hand.jpg',
    link: '#',
    year: '2025',
    deliverable: 'High-Converting Web Design',
    tags: ['Web Applications'],
    isComingSoon: true
  }
];

export default function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  const filteredWorks = activeCategory === 'All Projects' 
    ? works 
    : works.filter(w => w.category === activeCategory || (w.tags && w.tags.includes(activeCategory)));

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
              href={work.isComingSoon ? undefined : work.link}
              key={work.id} 
              target={!work.isComingSoon && work.link.startsWith('http') ? '_blank' : undefined}
              rel={!work.isComingSoon && work.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (work.isComingSoon || !work.link || work.link === '#') {
                  e.preventDefault();
                }
              }}
              className={`${styles.worksCard} ${work.isComingSoon ? styles.worksCardComingSoon : ''}`}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={work.isComingSoon ? { y: -4 } : { y: -8 }}
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
                  <div className={styles.badgeGroupLeft}>
                    <span className={styles.worksCategoryBadge}>{work.category}</span>
                    {work.isComingSoon ? (
                      <span className={styles.worksComingSoonBadge}>Coming Soon</span>
                    ) : (
                      work.link.startsWith('http') && (
                        <span className={styles.worksLiveBadge}>
                          <span className={styles.liveDot} /> Live Site
                        </span>
                      )
                    )}
                  </div>
                  <span className={styles.worksYearBadge}>{work.year}</span>
                </div>

                {/* Metric / Status Badge Pill */}
                {work.isComingSoon ? (
                  <div className={styles.worksComingSoonPill}>
                    <Clock size={16} className={styles.comingSoonIcon} />
                    <div className={styles.comingSoonTextGroup}>
                      <span className={styles.comingSoonValue}>Coming Soon</span>
                      <span className={styles.comingSoonLabel}>Case Study In Development</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.worksMetricPill}>
                    <TrendingUp size={16} className={styles.metricIcon} />
                    <div className={styles.metricTextGroup}>
                      <span className={styles.metricValue}>{work.metric}</span>
                      <span className={styles.metricLabel}>{work.metricLabel}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Content */}
              <div className={styles.worksContent}>
                <div className={styles.worksDeliverableRow}>
                  <Layers size={14} className={styles.deliverableIcon} />
                  <span>{work.deliverable}</span>
                  {work.isComingSoon && (
                    <span className={styles.comingSoonDeliverableTag}>• Coming Soon</span>
                  )}
                </div>
                
                <h3 className={styles.worksTitle}>
                  <span>{work.title}</span>
                  <div className={`${styles.worksArrowCircle} ${work.isComingSoon ? styles.arrowCircleSoon : ''}`}>
                    {work.isComingSoon ? (
                      <Clock className={styles.worksIcon} size={18} />
                    ) : (
                      <ArrowUpRight className={styles.worksIcon} size={20} />
                    )}
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
