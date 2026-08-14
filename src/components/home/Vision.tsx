'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Sparkles, Cpu, Layers, ShieldCheck } from 'lucide-react';
import styles from './Vision.module.css';
import FloatingBird from './FloatingBird';

const TECH_BADGES = [
  { name: 'Next.js 16 (App Router)', tag: 'Engine' },
  { name: 'React 19 Server Actions', tag: 'Core' },
  { name: 'Framer Motion 12 & GSAP', tag: 'Physics' },
  { name: 'TypeScript Strict', tag: 'Architecture' },
  { name: 'Global Edge TTFB <50ms', tag: 'Performance' },
  { name: '100% Core Web Vitals', tag: 'SEO' },
];

const GRAPH_DATA = [
  { label: 'Q1 Initial', height: '35%', value: '1.2x', active: false },
  { label: 'Q2 Redesign', height: '55%', value: '2.1x', active: false },
  { label: 'Q3 3D Polish', height: '75%', value: '3.4x', active: false },
  { label: 'Q4 Origami Engine', height: '100%', value: '4.8x Lift', active: true },
];

export default function Vision() {
  return (
    <section id="about" className={styles.visionSection}>
      {/* Ambient 3D Spatial Lighting */}
      <div className={styles.ambientGlowPrimary} />
      <div className={styles.ambientGlowSecondary} />

      <div className={styles.visionContainer}>
        
        {/* Section Header */}
        <div className={styles.visionHeader}>
          <motion.div 
            className={styles.preTitleBadge}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.badgePulseDot} />
            <span>Why Founders Choose Origamie</span>
          </motion.div>

          <motion.h2 
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Websites designed to <span className={styles.serifWord}>pay for themselves.</span>
          </motion.h2>

          <motion.p 
            className={styles.mainSubtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Pretty isn&apos;t a strategy. We fuse editorial typography, interactive 3D spatial depth, and conversion science so every scroll and interaction drives real pipeline revenue.
          </motion.p>
        </div>

        {/* 3D Bento Grid System */}
        <div className={styles.bentoGrid3D}>
          
          {/* Card 1: 3D Conversion Velocity Engine (Large Left) */}
          <motion.div 
            className={`${styles.card3DBase} ${styles.cardConversionVelocity}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className={styles.cardCategoryLabel}>
                <TrendingUp size={14} />
                <span>Conversion Physics</span>
              </span>

              <h3 className={styles.cardHeadline}>
                Engineered for 2–4x Qualified Pipeline Lift
              </h3>

              <p className={styles.cardParagraph}>
                Every layout hierarchy, CTA placement, and micro-interaction is mapped against user cognitive patterns to turn casual page visitors into high-intent inbound inquiries.
              </p>
            </div>

            {/* 3D Visual Graph Widget */}
            <div className={styles.visual3DGraphStage}>
              {GRAPH_DATA.map((bar, idx) => (
                <div key={idx} className={styles.graphBarGroup}>
                  <div 
                    className={`${styles.graphBarFill} ${bar.active ? styles.graphBarFillActive : ''}`} 
                    style={{ height: bar.height }}
                  >
                    <span className={styles.barValueTag}>{bar.value}</span>
                  </div>
                  <span className={styles.barLabelText}>{bar.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Interactive 3D Spatial Portal (Right Top) */}
          <motion.div 
            className={`${styles.card3DBase} ${styles.cardSpatialPortal}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div>
              <span className={styles.cardCategoryLabel}>
                <Sparkles size={14} />
                <span>3D Spatial Direction</span>
              </span>

              <h3 className={styles.cardHeadline}>
                Award-Winning Craft &amp; Interactive Polish
              </h3>

              <p className={styles.cardParagraph}>
                We create digital artifacts that capture immediate industry attention and elevate brand authority.
              </p>
            </div>

            {/* Floating Origami 3D Stage */}
            <div className={styles.floatingBirdStage}>
              <FloatingBird style={{ top: '30%', left: '15%' }} delay={0} scale={0.65} />
              <FloatingBird style={{ top: '20%', right: '20%' }} delay={1.2} scale={0.85} />
              <FloatingBird style={{ bottom: '20%', left: '45%' }} delay={2.4} scale={0.5} />
            </div>

            <div>
              <Link href="/contact" className={styles.portalCtaBtn}>
                <span>Start a Project</span>
                <ArrowUpRight size={18} />
              </Link>
              <div className={styles.portalGuarantee}>
                Guaranteed 24h Discovery • Fixed Quote • Founder Led
              </div>
            </div>
          </motion.div>

          {/* Card 3: 3D Technology Matrix (Left Bottom) */}
          <motion.div 
            className={`${styles.card3DBase} ${styles.cardTechMatrix}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={styles.cardCategoryLabel}>
              <Cpu size={14} />
              <span>Modern Architecture</span>
            </span>

            <h3 className={styles.cardHeadline}>
              Zero Bloat. Sub-50ms Global Edge Response.
            </h3>

            <p className={styles.cardParagraph}>
              Built natively on Next.js 16 with React 19 Server Actions and Turbopack for maximum SEO indexation and flawless 60fps fluidity.
            </p>

            <div className={TECH_BADGES.length > 0 ? styles.techBadgesGrid : ''}>
              {TECH_BADGES.map((item, idx) => (
                <div key={idx} className={styles.techPillBadge}>
                  <span className={styles.techDot} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Measurable ROI Guarantee (Right Bottom) */}
          <motion.div 
            className={`${styles.card3DBase} ${styles.cardRoiGuarantee}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className={styles.cardCategoryLabel}>
              <ShieldCheck size={14} />
              <span>Measurable ROI</span>
            </span>

            <h3 className={styles.cardHeadline}>
              Guaranteed Client Satisfaction
            </h3>

            <p className={styles.cardParagraph}>
              Audience research, positioning, and measurable revenue benchmarks — established before writing a single line of code.
            </p>

            <div className={styles.roiStatBox}>
              <span className={styles.roiNumber}>4.8x</span>
              <span className={styles.roiLabel}>Average Client Revenue &amp; Pipeline ROI</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
