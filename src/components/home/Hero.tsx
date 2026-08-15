'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  Star
} from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax & Spotlight tracking
  const [mousePos, setMousePos] = useState({ normX: 0, normY: 0, rawX: 0, rawY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const normX = (rawX - rect.width / 2) / (rect.width / 2);
    const normY = (rawY - rect.height / 2) / (rect.height / 2);
    setMousePos({ normX, normY, rawX, rawY });
  };

  const handleMouseLeave = () => {
    setMousePos({ normX: 0, normY: 0, rawX: 0, rawY: 0 });
  };

  const bgParallaxX = useSpring(mousePos.normX * -25, { stiffness: 100, damping: 30 });
  const bgParallaxY = useSpring(mousePos.normY * -25, { stiffness: 100, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroScrollY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      className={styles.heroSection}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Theme-Based Grid Gradient Backdrop */}
      <div className={styles.minimalBackdrop}>
        {/* Layer 1: Animated Aurora Color Blobs (Brand Deep Blue, Electric Indigo, Violet) */}
        <div className={styles.auroraMesh1} />
        <div className={styles.auroraMesh2} />
        <div className={styles.auroraMesh3} />

        {/* Layer 2: Geometric Perspective Grid with Radial Gradient Fade */}
        <motion.div
          className={styles.themeGridLines}
          style={{ x: bgParallaxX, y: bgParallaxY }}
        />

        {/* Layer 3: Micro Alignment Grid */}
        <div className={styles.themeMicroGrid} />

        {/* Layer 4: Interactive Cursor Spotlight Glow */}
        {mousePos.rawX > 0 && (
          <div
            className={styles.cursorSpotlight}
            style={{
              background: `radial-gradient(550px circle at ${mousePos.rawX}px ${mousePos.rawY}px, rgba(59, 82, 255, 0.14), transparent 80%)`
            }}
          />
        )}

        {/* Layer 5: Seamless Bottom Vignette Gradient */}
        <div className={styles.bottomVignetteGradient} />
      </div>

      <motion.div
        className={styles.heroContainer}
        style={{ y: heroScrollY, opacity: heroOpacity }}
      >

        {/* 1. Status Indicator Tag */}
        <motion.div
          className={styles.minimalTagPill}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.liveIndicatorDot} />
          <span>Origamie • Creative Studio &amp; Web Engineering</span>
        </motion.div>

        {/* 2. Crystal Clear Headline */}
        <motion.h1
          className={styles.masterHeadline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          Folding ideas into <br />
          digital <span className={styles.serifWord}>masterpieces.</span>
        </motion.h1>

        {/* 3. Concise Value Proposition */}
        <motion.p
          className={styles.leadText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Origamie blends editorial brand design with conversion engineering for founders and tech teams — typically delivering <strong>2–4x more qualified pipeline in 90 days.</strong>
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div
          className={styles.actionRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <Link href="/contact" className={styles.primaryBtn}>
            <span>Start a Project</span>
            <ArrowUpRight size={16} className={styles.btnArrow} />
          </Link>
          <Link href="/works" className={styles.secondaryBtn}>
            <span>See Selected Work (4+)</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
