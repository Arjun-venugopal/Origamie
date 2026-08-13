'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Award, Zap } from 'lucide-react';
import styles from './Hero.module.css';
import FloatingBird from './FloatingBird';

const textReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }
  })
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.04;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.04;
    setMousePos({ x, y });
  };

  const springX = useSpring(mousePos.x, { stiffness: 120, damping: 20 });
  const springY = useSpring(mousePos.y, { stiffness: 120, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      className={styles.heroSection}
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Background Orbs & Mesh */}
      <div className={styles.heroMeshGrid} />
      <motion.div
        className={styles.heroAuroraOrb1}
        style={{ x: springX, y: springY }}
      />
      <div className={styles.heroAuroraOrb2} />

      {/* Floating Crane Birds */}
      <FloatingBird style={{ top: '12%', left: '8%', opacity: 0.65 }} delay={0} scale={0.35} />
      <FloatingBird style={{ top: '18%', right: '10%', opacity: 0.85 }} delay={2} scale={0.55} />
      <FloatingBird style={{ top: '42%', left: '48%', opacity: 0.45 }} delay={1.5} scale={0.3} />
      <FloatingBird style={{ top: '65%', right: '6%', opacity: 0.9 }} delay={3} scale={0.65} />

      <motion.div
        className={styles.heroContainer}
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Left Column: Headline, Bio & CTAs */}
        <div className={styles.heroLeftCol}>
          {/* Status Badge */}
          <motion.div
            className={styles.heroStatusBadge}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.badgePulseDot} />
            <span>NOW ACCEPTING NEW PROJECTS • Q3/Q4</span>
          </motion.div>

          {/* Headline */}
          <h1 className={styles.heroHeadline}>
            <div className={styles.headlineMask}>
              <motion.div initial="hidden" animate="visible" variants={textReveal} custom={0}>
                Folding ideas into
              </motion.div>
            </div>
            <div className={styles.headlineMask}>
              <motion.div initial="hidden" animate="visible" variants={textReveal} custom={1}>
                digital <span className={styles.highlightSerif}>masterpieces.</span>
              </motion.div>
            </div>
          </h1>

          {/* Description */}
          <motion.p
            className={styles.heroDescription}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            Origamie is a boutique digital studio. We combine editorial craft with conversion science to engineer websites that win awards and deliver <strong>2–4x lead growth.</strong>
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className={styles.heroCtaGroup}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <a href="/contact" className={styles.primaryCtaBtn}>
              <span>Book a free strategy call</span>
              <ArrowUpRight size={18} className={styles.ctaIcon} />
            </a>
            <a href="/works" className={styles.secondaryCtaBtn}>
              <span>Explore selected works</span>
              <ArrowUpRight size={18} className={styles.ctaIconSec} />
            </a>
          </motion.div>

          {/* Mobile Trust Proof Badges */}
          <motion.div
            className={styles.mobileTrustGroup}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
          >
            <div className={styles.trustBadgeItem}>
              <Zap size={13} className={styles.trustBadgeIcon} />
              <span>99/100 Speed</span>
            </div>
            <div className={styles.trustBadgeItem}>
              <TrendingUp size={13} className={styles.trustBadgeIcon} />
              <span>2–4x Lead Growth</span>
            </div>
            <div className={styles.trustBadgeItem}>
              <Award size={13} className={styles.trustBadgeIcon} />
              <span>Award Craft</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Glass Showcase Card */}
        <motion.div
          className={styles.heroRightCol}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ x: springX, y: springY }}
        >
          <div className={styles.stageGlassCard}>
            {/* Background Glow inside Card */}
            <div className={styles.cardInternalGlow} />

            {/* Top Floating Badge */}
            <div className={styles.stageTopBadge}>
              <Zap size={14} className={styles.stageBadgeIcon} />
              <span>99/100 Lighthouse Performance</span>
            </div>

            {/* Central Graphic Element */}
            <div className={styles.stageGraphicWrapper}>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={styles.logoStageCircle}
              >
                <Image
                  src="/crane-logo.png"
                  alt="Origamie Crane"
                  width={140}
                  height={140}
                  priority
                  className={styles.craneGraphic}
                />
              </motion.div>

              <div className={styles.stageTagline}>
                <h3>Crafted for Impact</h3>
                <p>Tailored Webflow &amp; Next.js Engineering</p>
              </div>
            </div>

            {/* Bottom Floating Badge */}
            <div className={styles.stageBottomPill}>
              <TrendingUp size={16} className={styles.pillTrendIcon} />
              <div className={styles.pillTextGroup}>
                <span className={styles.pillValue}>+240% Lead Spike</span>
                <span className={styles.pillSub}>90-Day Proven Result</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
