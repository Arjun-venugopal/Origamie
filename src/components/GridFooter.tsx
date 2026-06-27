'use client';

import React from 'react';
import styles from '@/app/page.module.css';

import { motion } from 'framer-motion';
import FloatingBird from './FloatingBird';

export default function GridFooter() {
  return (
    <div id="contact" className={styles.gridFooter}>
      <FloatingBird style={{ top: '20%', left: '10%' }} delay={0} scale={0.5} />
      <FloatingBird style={{ bottom: '30%', right: '15%' }} delay={1} scale={0.6} />

      <div className={styles.gridFooterContent}>
        <h2>Let's work together</h2>
        <a href="#strategy" className={styles.aboutBtn} style={{ marginTop: '32px' }}>
          Book a free strategy call
        </a>
      </div>
      
      <div className={styles.centerSquare}>
        <div className={styles.centerSquareInner} />
      </div>
    </div>
  );
}
