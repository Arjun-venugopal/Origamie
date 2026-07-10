'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Search, Infinity as InfinityIcon, MousePointer2, PenTool, Video, Globe, Smartphone, Wrench } from 'lucide-react';
import styles from '@/app/services/services.module.css';

const services = [
  {
    id: 1,
    title: 'Digital Marketing',
    desc: 'Grow online with targeted campaigns, social media marketing, and lead generation.',
    icon: <Megaphone size={32} strokeWidth={1.5} />
  },
  {
    id: 2,
    title: 'Search Engine Optimization',
    desc: 'Improve Google rankings, website visibility, organic traffic, and business enquiries.',
    icon: <Search size={32} strokeWidth={1.5} />
  },
  {
    id: 3,
    title: 'Meta Ads',
    desc: 'Reach customers through Facebook and Instagram ads that generate quality leads.',
    icon: <InfinityIcon size={32} strokeWidth={1.5} />
  },
  {
    id: 4,
    title: 'Google Ads',
    desc: 'Drive instant traffic and enquiries with high-performing Google ads campaigns.',
    icon: <MousePointer2 size={32} strokeWidth={1.5} />
  },
  {
    id: 5,
    title: 'Graphics Designing',
    desc: 'Visually stunning branding, social media posters, and marketing design materials.',
    icon: <PenTool size={32} strokeWidth={1.5} />
  },
  {
    id: 6,
    title: 'Motion Graphics',
    desc: 'Engage your audience with animated videos, motion ads, and visual creations.',
    icon: <Video size={32} strokeWidth={1.5} />
  },
  {
    id: 7,
    title: 'Web Development',
    desc: 'Build fast, responsive, SEO-friendly websites that support your business growth online.',
    icon: <Globe size={32} strokeWidth={1.5} />
  },
  {
    id: 8,
    title: 'App Development',
    desc: 'Develop custom, user-friendly mobile apps with profitable business-focused features.',
    icon: <Smartphone size={32} strokeWidth={1.5} />
  },
  {
    id: 9,
    title: 'Computer Services',
    desc: 'Reliable computer repairs, maintenance, software support, and technical assistance services.',
    icon: <Wrench size={32} strokeWidth={1.5} />
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

export default function ServicesList() {
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
          Our Offerings
        </motion.p>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Comprehensive <span>Capabilities</span>
        </motion.h2>
      </div>

      <motion.div 
        className={styles.gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {services.map((service) => (
          <motion.div key={service.id} className={styles.card} variants={fadeUpCard}>
            <div className={styles.cardIcon}>
              {service.icon}
            </div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{service.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
