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



export default function Testimonials() {
  return (
    <section id="reviews" className={styles.testimonials}>
      <div className={styles.sectionLabel} style={{ marginBottom: '24px' }}>REVIEWS — 05</div>

      <motion.div
        className={styles.testimonialsHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
      >
        <h2 className={`${styles.sectionTitle} ${styles.textGradient}`} style={{ marginBottom: 0 }}>Testimonials</h2>
        <div className={styles.testimonialsNav}>
          <button className={styles.testimonialsNavBtn} aria-label="Previous testimonial">←</button>
          <button className={styles.testimonialsNavBtn} aria-label="Next testimonial">→</button>
        </div>
      </motion.div>

      <motion.div
        className={styles.testimonialsGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        <motion.div variants={fadeInUp} custom={0}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.5, marginBottom: '48px' }}>BRANDS FROM THE ONES<br />WHO KNOW US BEST</p>
          <h3 className={styles.textGradient} style={{ fontSize: '4.5rem', margin: 0, lineHeight: 1 }}>+80%</h3>
          <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '8px' }}>Conversion Rate</p>
        </motion.div>

        <motion.div variants={fadeInUp} custom={1}>
          <h3 className={styles.testiQuote}>
            &quot;Working with Boulevard felt less like building with a creative partner. Every visual, every word—just hit right.&quot;
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Image
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
              width={48}
              height={48}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              alt="Guy Hawkins"
            />
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Guy Hawkins</p>
              <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Head of Product at Webflow</p>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }} variants={fadeInUp} custom={2}>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '2rem' }}>W</span> Webflow
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
