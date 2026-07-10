'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import styles from '@/app/page.module.css';

const marqueeItems = [
  'Motion Graphics',
  'Web Development',
  'App Development',
  'Google Ads',
  'SEO & Marketing',
  'Brand Strategy',
  'UI/UX Design',
];

interface StepProps {
  index: number;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  scrollYProgress: MotionValue<number>;
}

const Step = ({ index, number, title, subtitle, desc, scrollYProgress }: StepProps) => {
  // Global segment boundaries for this card
  const start = index / 3;
  const end = (index + 1) / 3;

  // Slide timings
  const inStart = Math.max(0, start - 0.05);
  const inEnd = start;
  const outStart = end - 0.05;
  const outEnd = end;

  // Outer Card Motion (Sliding in and out)
  let outerInputRanges: number[];
  let outerYRanges: string[];

  if (index === 0) {
    outerInputRanges = [0, outStart, outEnd];
    outerYRanges = ["0vh", "0vh", "-100vh"];
  } else if (index === 1) {
    outerInputRanges = [inStart, inEnd, outStart, outEnd];
    outerYRanges = ["100vh", "0vh", "0vh", "-100vh"];
  } else {
    outerInputRanges = [inStart, inEnd, 1.0];
    outerYRanges = ["100vh", "0vh", "0vh"];
  }
  
  const y = useTransform(scrollYProgress, outerInputRanges, outerYRanges);

  // Local Progress (0 to 1) while the card is LOCKED in the center
  const lockedLocalProgress = useTransform(
    scrollYProgress,
    [inEnd, outStart],
    [0, 1]
  );

  // Inner Content Animations mapped to local locked progress
  // 0% - 20%: Number scales up and fades in. Glow activates.
  const numberScale = useTransform(lockedLocalProgress, [0, 0.2], [0.8, 1]);
  const numberOpacity = useTransform(lockedLocalProgress, [0, 0.2], [0, 0.08]);
  const glowOpacity = useTransform(lockedLocalProgress, [0, 0.2], [0, 1]);

  // 20% - 40%: Heading slides upward and fades in
  const headingY = useTransform(lockedLocalProgress, [0.2, 0.4], [30, 0]);
  const headingOpacity = useTransform(lockedLocalProgress, [0.2, 0.4], [0, 1]);

  // 40% - 60%: Description fades in and slides upward
  const descY = useTransform(lockedLocalProgress, [0.4, 0.6], [30, 0]);
  const descOpacity = useTransform(lockedLocalProgress, [0.4, 0.6], [0, 1]);

  // 60% - 80%: Accent line fills left-to-right
  const lineWidth = useTransform(lockedLocalProgress, [0.6, 0.8], ["0%", "100%"]);

  // 3D Tilt Logic
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={styles.stepCardWrapper}
      style={{ y }}
    >
      <motion.div 
        ref={cardRef}
        className={styles.stepCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
      >
        {/* Background Radial Glow */}
        <motion.div className={styles.stepGlow} style={{ opacity: glowOpacity }} />

        {/* Watermark Number */}
        <motion.div 
          className={styles.stepNumber} 
          style={{ opacity: numberOpacity, scale: numberScale }}
        >
          {number}
        </motion.div>

        {/* Content Wrapper to ensure z-index above glow */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.h3 
            className={styles.stepTitle}
            style={{ opacity: headingOpacity, y: headingY }}
          >
            {title} <span>{subtitle}</span>
          </motion.h3>
          
          <motion.p 
            className={styles.stepDesc}
            style={{ opacity: descOpacity, y: descY }}
          >
            {desc}
          </motion.p>

          <motion.div className={styles.stepAccentLine} style={{ width: lineWidth }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // "start start" means progress=0 when top of 400vh track hits top of viewport.
    // "end end" means progress=1 when bottom of 400vh track hits bottom of viewport.
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Vertical line fill across the entire 0-1 progress for the left progress bar
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process">
      {/* Full Width Marquee above the track */}
      <div className={styles.marqueeBar} style={{ borderTop: 'none', position: 'relative', zIndex: 30 }}>
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className={styles.marqueeItem}>
              {item} <span className={styles.marqueeBullet}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* The 400vh Track */}
      <div className={styles.processTrack} ref={containerRef}>
        
        {/* The 100vh Sticky Frame */}
        <div className={styles.processFrame}>
          <div className={styles.processContainer}>
            
            {/* Left Content Column (Static inside sticky frame) */}
            <div className={styles.processLeft}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className={styles.processPreTitle}>How we work</div>
                <h2 className={styles.processTitle}>
                  From idea to <span>launch in weeks.</span>
                </h2>
                <p className={styles.processSubtitle}>
                  A tight, transparent process with fixed quotes, weekly demos and one shared channel — designed for teams who hate agency drama.
                </p>
              </motion.div>
            </div>

            {/* Right Steps Column (Absolute Stack) */}
            <div className={styles.processStepsRight}>
              {/* Scroll-linked vertical line */}
              <div className={styles.processLineVerticalBg} />
              <motion.div className={styles.processLineVerticalFill} style={{ height: lineHeight }} />

              <Step
                index={0}
                number="01"
                title="Discover"
                subtitle="& strategize"
                desc="A 60-min deep-dive into your audience, offer and brand. You leave with a clear creative direction, even if we don't work together."
                scrollYProgress={smoothProgress}
              />
              <Step
                index={1}
                number="02"
                title="Design"
                subtitle="& build"
                desc="Weekly demos, live Figma access and a shipping site in 2–6 weeks. No black boxes, no surprise reveals."
                scrollYProgress={smoothProgress}
              />
              <Step
                index={2}
                number="03"
                title="Launch"
                subtitle="& handover"
                desc="We ship with clean code, real SEO foundations and a recorded walkthrough so your team can take it from here."
                scrollYProgress={smoothProgress}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
