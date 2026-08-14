'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Box, Layers, Zap } from 'lucide-react';
import styles from './SpatialShowcase.module.css';

const DIMENSIONS = [
  {
    id: '01',
    label: 'Brand Identity',
    tag: 'SPATIAL ART // 01',
    title: 'Sculpted in Crystal Origami Geometry.',
    desc: 'We craft bespoke 3D brand assets, kinetic identities, and editorial typography that capture immediate market attention and convey unmistakable technical authority.',
    image: '/images/3d/origami-crane-3d.jpg',
    imageAlt: '3D Crystal Origami Crane Sculpture',
    imageBadge: 'OCTANE 8K RAY-TRACED SCULPTURE',
    metrics: [
      'Bespoke 3D Creative Direction & Shaders',
      'Editorial Brand Positioning & Guidelines',
      'Awwwards Site-of-the-Day Grade Polish'
    ],
    ctaText: 'Explore Brand Craft',
    ctaLink: '/works'
  },
  {
    id: '02',
    label: 'Web Engineering',
    tag: 'ARCHITECTURE // 02',
    title: 'Next.js 16 & React 19 High-Speed Systems.',
    desc: 'Engineered for extreme performance. We code custom web applications with sub-50ms global TTFB, 100% Core Web Vitals, and buttery smooth 60fps micro-animations.',
    image: '/images/3d/hologram-ui-3d.jpg',
    imageAlt: '3D Spatial Hologram Web Application UI',
    imageBadge: 'NEXT.JS 16 ENTERPRISE RUNTIME',
    metrics: [
      'Sub-50ms Global Edge Server Response',
      'React 19 Server Actions & TypeScript Strict',
      'Frictionless Interactive 3D Canvas Integration'
    ],
    ctaText: 'View Tech Stack',
    ctaLink: '/services'
  },
  {
    id: '03',
    label: 'Conversion Physics',
    tag: 'GROWTH ENGINE // 03',
    title: 'Turning Traffic into Qualified Pipeline.',
    desc: 'Design that directly impacts the bottom line. We pair spatial aesthetics with empirical conversion triggers, turning visitors into high-intent inbound inquiries.',
    image: '/images/3d/kinetic-core-3d.jpg',
    imageAlt: '3D Crystalline Kinetic Conversion Core',
    imageBadge: 'CONVERSION VELOCITY // 4.8X LIFT',
    metrics: [
      '2–4x Increase in Qualified Lead Conversion',
      'Psychological UX & Decision-Flow Architecture',
      'Full-Funnel Organic Search & SEO Authority'
    ],
    ctaText: 'Start a Project',
    ctaLink: '/contact'
  }
];

export default function SpatialShowcase() {
  const [activeDim, setActiveDim] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const tiltX = (y * -7).toFixed(2);
    const tiltY = (x * 7).toFixed(2);

    stageRef.current.style.transform = `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    if (stageRef.current) {
      stageRef.current.style.transform = `perspective(1400px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <section 
      className={styles.spatialSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Atmospheric Background */}
      <div className={styles.spatialGlow1} />
      <div className={styles.spatialGlow2} />
      <div className={styles.isometricGridFloor} />

      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <motion.div 
            className={styles.statusPill}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.pillDot} />
            <span>Origamie • 3D Spatial Digital Agency</span>
          </motion.div>

          <motion.h2 
            className={styles.mainHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Where high-craft design meets <br />
            <span className={styles.serifGradient}>3D spatial engineering.</span>
          </motion.h2>

          <motion.p 
            className={styles.subHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore the three core disciplines behind our award-winning web products — engineered to command authority and convert at scale.
          </motion.p>
        </div>

        {/* 3D Dimension Navigation Switcher */}
        <div className={styles.dimensionNavDock}>
          {DIMENSIONS.map((dim, idx) => {
            const isActive = activeDim === idx;
            return (
              <button
                key={dim.id}
                type="button"
                className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ''}`}
                onClick={() => setActiveDim(idx)}
                aria-label={`Switch to ${dim.label}`}
              >
                <span className={styles.navIndex}>{dim.id}</span>
                <span className={styles.btnLabelText}>{dim.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Perspective Stage */}
        <div 
          ref={stageRef}
          className={styles.stage3DWrapper}
          style={{ transition: 'transform 0.18s ease-out' }}
        >
          {DIMENSIONS.map((dim, idx) => {
            const isActive = activeDim === idx;
            return (
              <div
                key={dim.id}
                className={`${styles.card3DContainer} ${isActive ? styles.card3DActive : ''}`}
              >
                
                {/* 3D Visual Render Window (Left) */}
                <div className={styles.visual3DWindow}>
                  <Image
                    src={dim.image}
                    alt={dim.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.visualImage}
                    priority={idx === 0}
                  />
                  <div className={styles.visualOverlayGlint} />
                  <div className={styles.visualTagOverlay}>
                    <Box size={13} color="#38BDF8" />
                    <span>{dim.imageBadge}</span>
                  </div>
                </div>

                {/* Content Details (Right) */}
                <div className={styles.contentBlock3D}>
                  <div className={styles.phaseBadge}>
                    <Sparkles size={14} />
                    <span>{dim.tag}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{dim.title}</h3>
                  <p className={styles.cardDesc}>{dim.desc}</p>

                  <div className={styles.metricsGrid}>
                    {dim.metrics.map((item, mIdx) => (
                      <div key={mIdx} className={styles.metricItem}>
                        <span className={styles.metricBulletDot} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={dim.ctaLink} className={styles.actionCtaBtn}>
                    <span>{dim.ctaText}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
