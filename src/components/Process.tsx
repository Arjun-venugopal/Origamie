'use client';

import React from 'react';
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

const marqueeItems = [
  'Motion Graphics',
  'Web Development',
  'App Development',
  'Google Ads',
  'SEO & Marketing',
  'Brand Strategy',
  'UI/UX Design',
];

export default function Process() {
  return (
    <section id="process" className={styles.processSection}>
      <div className={styles.processContainer}>
        {/* Left Content Column */}
        <div className={styles.processLeft}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0}
          >
            <div className={styles.processPreTitle}>How we work</div>
            <h2 className={styles.processTitle}>
              From idea to <span>launch in weeks.</span>
            </h2>
            <p className={styles.processSubtitle}>
              A tight, transparent process with fixed quotes, weekly demos and one shared channel — designed for teams who hate agency drama.
            </p>
          </motion.div>

          {/* Three steps */}
          <div className={styles.processSteps}>
            <motion.div
              className={styles.stepItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={1}
            >
              <div className={styles.stepNumber}>01</div>
              <h3 className={styles.stepTitle}>
                Discover <span>& strategize</span>
              </h3>
              <p className={styles.stepDesc}>
                A 60-min deep-dive into your audience, offer and brand. You leave with a clear creative direction, even if we don't work together.
              </p>
            </motion.div>

            <motion.div
              className={styles.stepItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={2}
            >
              <div className={styles.stepNumber}>02</div>
              <h3 className={styles.stepTitle}>
                Design <span>& build</span>
              </h3>
              <p className={styles.stepDesc}>
                Weekly demos, live Figma access and a shipping site in 2–6 weeks. No black boxes, no surprise reveals.
              </p>
            </motion.div>

            <motion.div
              className={styles.stepItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={3}
            >
              <div className={styles.stepNumber}>03</div>
              <h3 className={styles.stepTitle}>
                Launch <span>& handover</span>
              </h3>
              <p className={styles.stepDesc}>
                We ship with clean code, real SEO foundations and a recorded walkthrough so your team can take it from here.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Graphic Column */}
        <motion.div
          className={styles.processRight}
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.largeCraneWrapper}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.largeCraneSvg}>
              <g stroke="black" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
                {/* Back wing */}
                <polygon points="55,20 95,15 75,50" fill="white" />
                
                {/* White strip between blue wing and shadow */}
                <polygon points="30,65 70,45 75,50" fill="white" />
                
                {/* Underbelly/Shadow (white in the logo design) */}
                <polygon points="30,65 75,50 72,70" fill="white" />
                
                {/* Tail (with curved left edge) */}
                <path d="M 75,50 L 90,95 Q 63,83 70,85 Z" fill="white" />
                
                {/* Neck */}
                <polygon points="15,30 40,40 30,65" fill="white" />
                
                {/* Beak (with curved bottom edge) */}
                <path d="M 5,45 L 15,30 L 20,42 Q 10,48 5,45 Z" fill="white" />
                
                {/* Front blue wing left (darker blue/shadowed) */}
                <polygon points="30,65 48,15 55,20" fill="#3B5DFE" />
                
                {/* Front blue wing right (lighter/main blue) */}
                <polygon points="30,65 55,20 70,45" fill="#4D70FF" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Full-width Marquee Bar */}
      <div className={styles.marqueeBar}>
        <div className={styles.marqueeTrack}>
          {/* Double array of items for infinite loop rendering */}
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className={styles.marqueeItem}>
              <span>{item}</span>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.marqueeIcon}>
                <g stroke="white" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
                  <polygon points="55,20 95,15 75,50" fill="white" />
                  <polygon points="30,65 70,45 75,50" fill="white" />
                  <polygon points="30,65 75,50 72,70" fill="white" opacity="0.3" />
                  <polygon points="75,50 90,95 70,85" fill="white" />
                  <polygon points="15,30 40,40 30,65" fill="white" />
                  <polygon points="5,45 15,30 20,42" fill="white" />
                  <polygon points="30,65 48,15 55,20" fill="white" opacity="0.8" />
                  <polygon points="30,65 55,20 70,45" fill="white" opacity="0.9" />
                </g>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
