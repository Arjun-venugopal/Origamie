'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Sparkles, Zap } from 'lucide-react';
import styles from './Hero.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pixel coordinates for the spotlight
  const mouseRawX = useMotionValue(0);
  const mouseRawY = useMotionValue(0);

  const [isInside, setIsInside] = useState(false);

  // Smooth springs for fluid, organic motion
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const smoothRawX = useSpring(mouseRawX, { stiffness: 180, damping: 24 });
  const smoothRawY = useSpring(mouseRawY, { stiffness: 180, damping: 24 });

  // 3D Tilt perspective on hero content
  const tiltRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const tiltRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  // Subtle grid parallax
  const gridX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const gridY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  // Floating badges opposing parallax
  const badge1X = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const badge2X = useTransform(smoothX, [-0.5, 0.5], [26, -26]);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], [18, -18]);

  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;
    const normX = rawX / rect.width - 0.5;
    const normY = rawY / rect.height - 0.5;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      mouseX.set(normX);
      mouseY.set(normY);
      mouseRawX.set(rawX);
      mouseRawY.set(rawY);
      if (!isInside) setIsInside(true);
    });
  };

  const handleMouseLeave = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    mouseX.set(0);
    mouseY.set(0);
    setIsInside(false);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yPos = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div
      id="home"
      className={styles.heroWrapper}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Background with Cursor Spotlight & Geometric Grid */}
      <div className={styles.interactiveBackdrop}>
        <motion.div
          className={styles.interactiveGrid}
          style={{ x: gridX, y: gridY }}
        />
        <div className={styles.ambientGlowOrb} />
        <motion.div
          className={styles.cursorSpotlight}
          style={{
            x: smoothRawX,
            y: smoothRawY,
            opacity: isInside ? 1 : 0.35,
          }}
          transition={{ opacity: { duration: 0.4 } }}
        />
      </div>

      {/* Floating Interactive Badge (Top Left) */}
      <motion.div
        className={styles.floatingBadgeLeft}
        style={{ x: badge1X, y: badge1Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        <Sparkles size={14} className={styles.badgeSparkle} />
        <span>Bespoke Architecture</span>
      </motion.div>

      {/* Floating Interactive Badge (Bottom Right) */}
      <motion.div
        className={styles.floatingBadgeRight}
        style={{ x: badge2X, y: badge2Y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.96 }}
      >
        <Zap size={14} className={styles.badgeZap} />
        <span>Ultra-Fast 60fps</span>
      </motion.div>

      <motion.section
        className={styles.heroContentMain}
        style={{
          y: yPos,
          opacity,
          scale,
          rotateX: tiltRotateX,
          rotateY: tiltRotateY,
          transformPerspective: 1000
        }}
      >
        {/* Top Studio Badge Pill */}
        <motion.div
          className={styles.heroTopBadge}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <span className={styles.topBadgePulseDot} />
          <Sparkles size={13} className={styles.topBadgeIcon} />
          <span>Digital Design & Growth Studio</span>
        </motion.div>

        <motion.h1
          className={styles.mainTitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <span className={styles.titleLineOne}>Folding ideas into</span>
          <span className={styles.titleLineTwo}>
            digital{' '}
            <motion.span
              className={styles.highlightWord}
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            >
              #masterpieces.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          className={styles.mainSubtitle}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          Origamie blends editorial brand design with conversion engineering for founders and tech teams — typically delivering <strong>2–4x more qualified pipeline in 90 days.</strong>
        </motion.p>

        <motion.div
          className={styles.actionRow}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <motion.div
            className={styles.actionBtnWrapper}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link href="/contact" className={styles.primaryBtn}>
              <span>Start a Project</span>
              <ArrowUpRight size={16} className={styles.btnArrow} />
            </Link>
          </motion.div>
          <motion.div
            className={styles.actionBtnWrapper}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Link href="/works" className={styles.secondaryBtn}>
              <span>See Selected Work (4+)</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
