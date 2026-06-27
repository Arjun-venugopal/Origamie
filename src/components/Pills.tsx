'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Megaphone, Search, Infinity, MousePointer2, PenTool, Video, Globe, Smartphone, Wrench } from 'lucide-react';
import styles from '@/app/page.module.css';

const services = [
  {
    id: 1,
    titleBlack: 'Digital',
    titleBlue: 'marketing',
    desc: 'Grow online with targeted campaigns, social media marketing, and lead generation.',
    icon: <Megaphone size={48} strokeWidth={1.5} />
  },
  {
    id: 2,
    titleBlack: 'Se',
    titleBlue: 'o',
    desc: 'Improve Google rankings, website visibility, organic traffic, and business enquiries.',
    icon: <Search size={48} strokeWidth={1.5} />
  },
  {
    id: 3,
    titleBlack: 'Meta',
    titleBlue: 'ads',
    desc: 'Reach customers through Facebook and Instagram ads that generate quality leads.',
    icon: <Infinity size={48} strokeWidth={1.5} />
  },
  {
    id: 4,
    titleBlack: 'Google',
    titleBlue: 'ads',
    desc: 'Drive instant traffic and enquiries with high-performing Google ads campaigns.',
    icon: <MousePointer2 size={48} strokeWidth={1.5} />
  },
  {
    id: 5,
    titleBlack: 'Graphics',
    titleBlue: 'Designing',
    desc: 'Visually stunning branding, social media posters, and marketing design materials.',
    icon: <PenTool size={48} strokeWidth={1.5} />
  },
  {
    id: 6,
    titleBlack: 'Motion',
    titleBlue: 'Graphics',
    desc: 'Engage your audience with animated videos, motion ads, and visual creations.',
    icon: <Video size={48} strokeWidth={1.5} />
  },
  {
    id: 7,
    titleBlack: 'Web',
    titleBlue: 'development',
    desc: 'Build fast, responsive, SEO-friendly websites that support your business growth online.',
    icon: <Globe size={48} strokeWidth={1.5} />
  },
  {
    id: 8,
    titleBlack: 'App',
    titleBlue: 'development',
    desc: 'Develop custom, user-friendly mobile apps with profitable business-focused features.',
    icon: <Smartphone size={48} strokeWidth={1.5} />
  },
  {
    id: 9,
    titleBlack: 'Computer',
    titleBlue: 'services',
    desc: 'Reliable computer repairs, maintenance, software support, and technical assistance services.',
    icon: <Wrench size={48} strokeWidth={1.5} />
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const }
  })
};

export default function Pills() {
  return (
    <section id="services" className={styles.aboutSection}>
      <div className={styles.aboutHeader}>
        <motion.h2 
          className={styles.aboutTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What we craft, fold,<br />
          and ship for <span>#you.</span>
        </motion.h2>
        
        <motion.p 
          className={styles.aboutDesc}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A full spectrum of digital craft — from first sketch to live experience, plus on-the-ground tech support.
        </motion.p>
      </div>

      <div className={styles.pillsSection}>
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            className={styles.pillCard}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className={styles.pillIconWrapper}>
              {s.icon}
            </div>
            <h3 className={styles.pillTitle}>
              {s.titleBlack} <span>{s.titleBlue}</span>
            </h3>
            <p className={styles.pillDesc}>{s.desc}</p>
            <button className={styles.pillButton}>
              <ArrowDownRight size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
