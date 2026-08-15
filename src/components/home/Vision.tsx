'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './Vision.module.css';
import FloatingBird from './FloatingBird';

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  // Subtle asymmetric parallax for visual depth
  const yLeft = useTransform(smoothProgress, [0, 1], [40, -40]);
  const yRight = useTransform(smoothProgress, [0, 1], [20, -20]);

  return (
    <section id="about" className={styles.visionSection} ref={containerRef}>
      <div className={styles.visionContainer}>
        
        {/* Section Header */}
        <motion.div
          className={styles.visionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.visionPreTitle}>
            WHY TEAMS PICK <span>ORIGAMIE</span>
          </div>
          
          <h2 className={styles.visionTitle}>
            Design that <span>Pays for itself.</span>
          </h2>

          <p className={styles.visionSubtitle}>
            Pretty isn&apos;t a strategy. We pair editorial design with conversion science so every scroll, click and form move the revenue needle.
          </p>
        </motion.div>

        {/* Bento Grid System matching screenshot */}
        <div className={styles.visionGrid}>
          
          {/* Card 1 (Left Tall) — Conversion-first design */}
          <motion.div
            className={`${styles.visionCard} ${styles.cardLeft}`}
            style={{ y: yLeft }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/hand.jpg"
              alt="Conversion first design"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className={styles.cardImage}
              style={{ mixBlendMode: 'overlay', opacity: 0.85 }}
            />
            <div 
              className={styles.cardOverlay} 
              style={{
                background: 'linear-gradient(180deg, rgba(0,71,255,0.92) 0%, rgba(0,71,255,0.4) 50%, rgba(0,71,255,0.95) 100%)'
              }} 
            />

            <h3 className={styles.cardLeftTopTitle}>
              Conversion-<br />first design
            </h3>

            <p className={styles.cardLeftBottomDesc}>
              Every page is wireframed against a clear KPI — qualified leads, signups, sales — then beautified. The result: sites that look premium and outperform.
            </p>
          </motion.div>

          {/* Card 2 (Top Middle) — Promise */}
          <motion.div
            className={`${styles.visionCard} ${styles.cardTopMiddle}`}
            style={{ y: yRight }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src="/runner.jpg"
              alt="Running person promise"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className={styles.cardImage}
              style={{ mixBlendMode: 'overlay', opacity: 0.75 }}
            />
            <div 
              className={styles.cardOverlay} 
              style={{
                background: 'linear-gradient(135deg, rgba(0,23,141,0.95) 0%, rgba(0,23,141,0.7) 100%)'
              }} 
            />

            <div className={styles.cardTagLabel}>PROMISE</div>

            <h3 className={styles.cardTitlePromise}>
              A site that <span>earns</span> its budget — or we keep iterating until it does.
            </h3>
          </motion.div>

          {/* Card 3 (Top Right) — Enquire Now with Floating Birds */}
          <motion.div
            className={`${styles.visionCard} ${styles.cardTopRight}`}
            style={{ y: yRight }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloatingBird style={{ top: '18%', left: '12%' }} delay={0} scale={0.45} />
            <FloatingBird style={{ top: '15%', right: '14%' }} delay={1.2} scale={0.6} />
            <FloatingBird style={{ bottom: '22%', left: '18%' }} delay={2} scale={0.48} />
            <FloatingBird style={{ bottom: '18%', right: '20%' }} delay={0.6} scale={0.42} />

            <Link href="/contact" className={styles.enquireBtn}>
              Enquire Now
            </Link>

            <span className={styles.enquireSub}>
              Replies within 24 hours · Fixed quote · No pressure
            </span>
          </motion.div>

          {/* Card 4 (Bottom Wide) — Strategy That Ships */}
          <motion.div
            className={`${styles.visionCard} ${styles.cardBottomWide}`}
            style={{ y: yLeft }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Image
              src="/people.jpg"
              alt="People walking strategy"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className={styles.cardImage}
              style={{ mixBlendMode: 'overlay', opacity: 0.65 }}
            />
            <div 
              className={styles.cardOverlay} 
              style={{
                background: 'linear-gradient(90deg, rgba(0,23,141,0.96) 0%, rgba(0,71,255,0.85) 100%)'
              }} 
            />

            <div className={styles.cardTagLabel}>STRATEGY THAT SHIPS</div>

            <h3 className={styles.cardTitleStrategy}>
              Audience research, positioning and a measurable goal — before a single pixel.
            </h3>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
