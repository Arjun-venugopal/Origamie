import React from 'react';
import styles from '@/app/page.module.css';

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>15+</span>
        <span className={styles.statLabel}>Years of Experience</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>50+</span>
        <span className={styles.statLabel}>Projects Completed</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>20+</span>
        <span className={styles.statLabel}>Clients Worldwide</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>100%</span>
        <span className={styles.statLabel}>Customer Satisfaction</span>
      </div>
    </section>
  );
}
