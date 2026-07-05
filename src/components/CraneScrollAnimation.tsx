'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/app/page.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 30;

// Helper function to get step from frame
function getStepFromFrame(frame: number): number {
  if (frame < 10) return 1;
  if (frame < 20) return 2;
  return 3;
}

export default function CraneScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const [stepDirection, setStepDirection] = useState<'left' | 'right'>('left');

  // Refs for scroll locking and drawing without re-binding listeners
  const activeFrameRef = useRef(0);

  // Preload all 30 frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const checkAllLoaded = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      if (loadedCount === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/images/frames/ezgif-frame-${frameNum}.png`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;
  }, []);

  // Main canvas drawing logic (cover sizing)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas ratio, match canvas height
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
    } else {
      // Image is taller than canvas ratio, match canvas width
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Canvas resize handler
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      drawFrame(activeFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // Handle scroll to draw the corresponding frame using GSAP
  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%', // Amount of scroll distance the animation spans
        pin: true,
        pinSpacing: true, // Wait until animation completes before next section scrolls in
        onUpdate: (self) => {
          // Progress goes from 0 to 1 over the duration of the pin
          const targetFrame = Math.min(
            Math.floor(self.progress * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
          );
          
          activeFrameRef.current = targetFrame;
          setActiveFrame(targetFrame);
          
          const currentStep = getStepFromFrame(targetFrame);
          const newDirection = currentStep % 2 === 0 ? 'right' : 'left';
          setStepDirection(newDirection);

          drawFrame(targetFrame);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);


  // Define steps copy mapping based on the frame index
  const getStepInfo = (frame: number) => {
    const step = getStepFromFrame(frame);

    const stepsData = {
      1: {
        tag: "01 / Precision",
        title: <>Crafted with <span>surgical precision.</span></>,
        desc: "We align every folding line of the creative layout to lead your user's eyes to the core message."
      },
      2: {
        tag: "02 / Alignment",
        title: <>Where art meets <span>conversion science.</span></>,
        desc: "Not just aesthetic grids, but layout hierarchies optimized for engagement, retention and conversion."
      },
      3: {
        tag: "03 / Unfold",
        title: <>Your digital presence, <span>fully realized.</span></>,
        desc: "Watch your brand unfold seamlessly into high-performance web pages that drive growth."
      }
    };

    return { step, ...stepsData[step as keyof typeof stepsData] };
  };

  const stepInfo = getStepInfo(activeFrame);

  // Normalize progress to value between 0 and 1
  const progressRatio = activeFrame / (TOTAL_FRAMES - 1);

  // Animation variants - Framer motion variants for the text box
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 80
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease out
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  // Child element variants - FIXED: Added Variants type
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <div ref={containerRef} className={styles.scrollAnimationSection}>
      <div className={styles.scrollAnimationSticky}>
        {/* Subtle background design grid */}
        <div className={styles.scrollBgGrid} />

        {/* Loading Spinner */}
        {!isLoaded && (
          <div className={styles.loaderContainer}>
            <div className={styles.loaderSpinner} />
            <span className={styles.loaderText}>Loading Experience {loadProgress}%</span>
          </div>
        )}

        {/* Canvas viewport background */}
        <div className={styles.canvasContainer} style={{ opacity: isLoaded ? 1 : 0 }}>
          <canvas ref={canvasRef} className={styles.scrollCanvas} />
        </div>

        {/* Centered Glassmorphic Text Overlay */}
        {isLoaded && (
          <div className={styles.animationTextContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={stepInfo.step}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className={styles.animationCaption}
                style={{
                  left: stepDirection === 'left' ? '10%' : 'auto',
                  right: stepDirection === 'right' ? '10%' : 'auto',
                }}
              >
                <motion.span
                  className={styles.captionTag}
                  variants={childVariants}
                  custom={0.05}
                >
                  {stepInfo.tag}
                </motion.span>

                <motion.h2
                  className={styles.captionTitle}
                  variants={childVariants}
                  custom={0.15}
                >
                  {stepInfo.title}
                </motion.h2>

                <motion.p
                  className={styles.captionDesc}
                  variants={childVariants}
                  custom={0.25}
                >
                  {stepInfo.desc}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Scroll Progress Indicator on Left */}
        {isLoaded && (
          <div className={styles.scrollProgressIndicator}>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ height: `${progressRatio * 100}%` }}
              />
            </div>
            <div className={styles.indicatorSteps}>
              <div
                className={styles.indicatorStep}
                style={{ opacity: stepInfo.step === 1 ? 1 : 0.35 }}
              >
                01
              </div>
              <div
                className={styles.indicatorStep}
                style={{ opacity: stepInfo.step === 2 ? 1 : 0.35 }}
              >
                02
              </div>
              <div
                className={styles.indicatorStep}
                style={{ opacity: stepInfo.step === 3 ? 1 : 0.35 }}
              >
                03
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}