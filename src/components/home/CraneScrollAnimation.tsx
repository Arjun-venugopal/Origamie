'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CraneScrollAnimation.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 30;

const panelsData = [
  {
    step: '01',
    label: 'Precision',
    title: 'Crafted with',
    highlight: 'surgical precision.',
    desc: 'Every layout fold is engineered to guide user attention directly toward your core value proposition.',
    features: ['Pixel-perfect alignment', 'Fluid motion design', 'Kinetic typography']
  },
  {
    step: '02',
    label: 'Alignment',
    title: 'Where art meets',
    highlight: 'conversion science.',
    desc: 'We combine aesthetics with data-driven UX patterns to turn casual visitors into loyal customers.',
    features: ['High-conversion UX', 'Seamless interactions', 'Sub-second load speeds']
  },
  {
    step: '03',
    label: 'Unfold',
    title: 'Your digital presence,',
    highlight: 'fully realized.',
    desc: 'Watch your brand unfold into a memorable digital experience that sets you apart from competitors.',
    features: ['Scalable architecture', 'Mobile-first optimization', 'Bespoke web engineering']
  }
];

export default function CraneScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeFrameRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Draw frame helper on canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let drawX = 0;
    let drawY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Preload PNG frames
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

  // Canvas Resizing
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        drawFrame(activeFrameRef.current);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const timer = setTimeout(() => {
      resizeCanvas();
      drawFrame(0);
    }, 50);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timer);
    };
  }, [isLoaded, drawFrame]);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      drawFrame(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            const frameIndex = Math.min(
              Math.floor(progress * (TOTAL_FRAMES - 1)),
              TOTAL_FRAMES - 1
            );

            if (activeFrameRef.current !== frameIndex) {
              activeFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }

            if (progress < 0.33) {
              setActiveStep(0);
            } else if (progress < 0.66) {
              setActiveStep(1);
            } else {
              setActiveStep(2);
            }
          }
        }
      });

      tl.to(trackRef.current, {
        xPercent: -66.666,
        ease: 'none'
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  // Smooth scroll to specific step
  const jumpToStep = (index: number) => {
    if (!containerRef.current) return;
    const st = ScrollTrigger.getAll().find(s => s.trigger === containerRef.current);
    if (st) {
      const targetProgress = index * 0.5; // 0, 0.5, 1.0
      const targetY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className={styles.scrollSection}>
      <div className={styles.stickyContainer}>

        {/* Minimal Subtle Ambient Background Glow */}
        <div className={styles.ambientGlow} />

        {/* Clean Loader */}
        {!isLoaded && (
          <div className={styles.minimalLoader}>
            <span className={styles.loaderValue}>{loadProgress}%</span>
            <div className={styles.loaderProgressTrack}>
              <div className={styles.loaderProgressFill} style={{ width: `${loadProgress}%` }} />
            </div>
            <span className={styles.loaderSubtitle}>Loading 3D Experience</span>
          </div>
        )}

        {/* Background Canvas */}
        <div className={styles.canvasWrapper} style={{ opacity: isLoaded ? 1 : 0 }}>
          <canvas ref={canvasRef} className={styles.canvasElement} />
          <div className={styles.vignetteOverlay} />
        </div>

        {/* Minimal Top Brand Bar */}
        {isLoaded && (
          <div className={styles.topHeader}>
            <span className={styles.brandTag}>Origamie Studio</span>
            <span className={styles.stepIndicator}>
              Step {activeStep + 1} of {panelsData.length}
            </span>
          </div>
        )}

        {/* Horizontal Track of Minimal Cards */}
        {isLoaded && (
          <div ref={trackRef} className={styles.horizontalTrack}>
            {panelsData.map((panel, idx) => {
              const isActive = activeStep === idx;
              return (
                <div key={panel.step} className={styles.slidePanel}>
                  <div className={`${styles.minimalCard} ${isActive ? styles.activeCard : ''}`}>
                    
                    <div className={styles.cardStepHeader}>
                      <span className={styles.stepBadge}>{panel.step}</span>
                      <span className={styles.stepName}>{panel.label}</span>
                    </div>

                    <h2 className={styles.cardHeading}>
                      {panel.title} <br />
                      <span className={styles.serifHighlight}>{panel.highlight}</span>
                    </h2>

                    <p className={styles.cardBody}>{panel.desc}</p>

                    <div className={styles.featureList}>
                      {panel.features.map(feat => (
                        <div key={feat} className={styles.featurePill}>
                          <span className={styles.featureDot} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* User-Friendly Bottom Control Bar */}
        {isLoaded && (
          <div className={styles.bottomControls}>
            <div className={styles.navPillsContainer}>
              {panelsData.map((panel, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={panel.step}
                    type="button"
                    className={`${styles.navPill} ${isActive ? styles.activeNavPill : ''}`}
                    onClick={() => jumpToStep(idx)}
                    aria-label={`Jump to stage ${panel.label}`}
                  >
                    <span className={styles.pillIndex}>{panel.step}</span>
                    <span className={styles.pillLabel}>{panel.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}