'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/app/page.module.css';
import FloatingBird from './FloatingBird';



export default function Vision() {
  return (
    <section id="about" className={styles.visionSection}>
      <motion.div 
        className={styles.visionHeader}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={styles.visionPreTitle}>
          Why teams pick <span>Origamie</span>
        </div>
        <h2 className={styles.visionTitle}>
          Design that <span>Pays for itself.</span>
        </h2>
      </motion.div>

      <motion.p 
        className={styles.visionSubtitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Pretty isn't a strategy. We pair editorial design with conversion science so every scroll, click and form move the revenue needle.
      </motion.p>

      <div className={styles.visionGrid}>
        {/* Card 1 (Left) */}
        <motion.div 
          className={styles.cardLeft}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Image 
            src="/hand.jpg" 
            alt="Hand pointing"
            fill
            className={styles.cardImage}
            style={{ mixBlendMode: 'overlay' }}
          />
          <div className={styles.cardOverlay} style={{ background: 'linear-gradient(to top, rgba(37,99,235,1) 0%, rgba(37,99,235,0.2) 50%, rgba(37,99,235,0) 100%)' }} />
          
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Conversion-<br/>first design</h3>
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardDesc}>
              Every page is wireframed against a clear KPI — qualified leads, signups, sales — then beautified. The result: sites that look premium and outperform.
            </p>
          </div>
        </motion.div>
        
        {/* Card 2 (Top Middle) */}
        <motion.div 
          className={styles.cardTopMiddle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Image 
            src="/runner.jpg" 
            alt="Running person blur"
            fill
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay} />
          
          <div className={styles.cardContent}>
            <div className={styles.cardLabel}>Promise</div>
            <h3 className={styles.cardTitle}>A site that <span>earns</span> its budget — or we keep iterating until it does.</h3>
          </div>
        </motion.div>

        {/* Card 3 (Top Right) */}
        <motion.div 
          className={styles.cardTopRight}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <FloatingBird style={{ top: '20%', left: '10%' }} delay={0} scale={0.4} />
          <FloatingBird style={{ top: '15%', right: '15%' }} delay={1} scale={0.6} />
          <FloatingBird style={{ bottom: '25%', left: '20%' }} delay={2} scale={0.5} />
          <FloatingBird style={{ bottom: '20%', right: '25%' }} delay={0.5} scale={0.4} />

          <button className={styles.enquireBtn}>Enquire Now</button>
          <span className={styles.enquireSub}>Replies within 24 hours · Fixed quote · No pressure</span>
        </motion.div>
        
        {/* Card 4 (Bottom Right - Wide) */}
        <motion.div 
          className={styles.cardBottomRight}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Image 
            src="/people.jpg" 
            alt="People walking"
            fill
            className={styles.cardImage}
          />
          <div className={styles.cardOverlay} />
          
          <div className={styles.cardContent}>
            <div className={styles.cardLabel}>Strategy that ships</div>
            <h3 className={styles.cardTitle}>Audience research, positioning and a measurable goal — before a single pixel.</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
