'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from '@/app/works/works.module.css';

const works = [
  {
    id: 1,
    title: 'Fintech Dashboard',
    category: 'Web Application',
    image: '/hand.jpg',
    link: '#'
  },
  {
    id: 2,
    title: 'Fitness Apparel E-commerce',
    category: 'E-Commerce',
    image: '/runner.jpg',
    link: '#'
  },
  {
    id: 3,
    title: 'Agency Rebrand',
    category: 'Brand Identity',
    image: '/people.jpg',
    link: '#'
  },
  {
    id: 4,
    title: 'SaaS Landing Page',
    category: 'Web Design',
    image: '/hand.jpg', // Reusing for placeholder
    link: '#'
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

export default function WorksGrid() {
  return (
    <section className={styles.gridSection}>
      <div className={styles.gridSectionHeader}>
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
      </div>

      <motion.div 
        className={styles.gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {works.map((work) => (
          <motion.a 
            href={work.link}
            key={work.id} 
            className={styles.worksCard} 
            variants={fadeUpCard}
          >
            <div className={styles.worksImageContainer}>
              <Image 
                src={work.image} 
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.worksImage}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className={styles.worksContent}>
              <p className={styles.worksCategory}>
                {work.category}
              </p>
              <h3 className={styles.worksTitle}>
                {work.title}
                <ArrowUpRight className={styles.worksIcon} size={24} />
              </h3>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
