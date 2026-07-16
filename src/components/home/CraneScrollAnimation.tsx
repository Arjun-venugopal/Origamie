'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CraneScrollAnimation.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 30;

export default function CraneScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile state
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ref for drawing without re-binding listeners
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

  // Main canvas drawing logic
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

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Contain on mobile so crane isn't wildly cropped
      if (imgRatio > canvasRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
      }
    } else {
      // Cover on desktop for cinematic background
      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        drawX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        drawY = (canvas.height - drawHeight) / 2;
      }
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

  // Handle GSAP Horizontal Scroll & Frame Scrubbing
  useEffect(() => {
    // Skip GSAP entirely if we are on mobile to prevent scroll-jacking bugs
    if (isMobile) return;
    
    if (!isLoaded || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 300% scroll distance for 3 panels
          pin: true,
          scrub: 1, // Smooth scrub
          onUpdate: (self) => {
            // Scrub canvas frames based on progress
            const targetFrame = Math.min(
              Math.floor(self.progress * TOTAL_FRAMES),
              TOTAL_FRAMES - 1
            );
            
            if (activeFrameRef.current !== targetFrame) {
              activeFrameRef.current = targetFrame;
              drawFrame(targetFrame);
            }
          }
        }
      });

      // Move the track horizontally by exactly 2 screen widths
      // (from Panel 1 [0%] to Panel 3 [66.66%])
      tl.to(trackRef.current, {
        xPercent: -66.666,
        ease: 'none'
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  if (isMobile) {
    return (
      <section className={styles.mobileBentoSection}>
        <div className={styles.bentoHeader}>
          <h2 className={styles.bentoMainTitle}>
            Your digital presence,<br />
            <span>fully realized.</span>
          </h2>
          <p className={styles.bentoMainDesc}>
            A cinematic experience distilled into a high-performance, conversion-focused grid.
          </p>
        </div>
        
        <div className={styles.bentoGrid}>
          {/* Card 1 - Large */}
          <div className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
            <span className={styles.captionTag}>01 &mdash; Precision</span>
            <h3 className={styles.bentoTitle}>
              Crafted with <span>surgical precision.</span>
            </h3>
            <p className={styles.bentoDesc}>
              We align every folding line of the creative layout to lead your user's eyes directly to the core message.
            </p>
          </div>

          {/* Card 2 - Half */}
          <div className={styles.bentoCard}>
            <span className={styles.captionTag}>02 &mdash; Alignment</span>
            <h3 className={styles.bentoTitle}>
              Where art meets <span>science.</span>
            </h3>
            <p className={styles.bentoDesc}>
              Layout hierarchies optimized for engagement.
            </p>
          </div>

          {/* Card 3 - Half */}
          <div className={styles.bentoCard}>
            <span className={styles.captionTag}>03 &mdash; Unfold</span>
            <h3 className={styles.bentoTitle}>
              Exponential <span>growth.</span>
            </h3>
            <p className={styles.bentoDesc}>
              High-performance web pages that drive conversion.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} className={styles.scrollAnimationSection}>
      <div className={styles.scrollAnimationSticky}>
        
        {/* Loader */}
        {!isLoaded && (
          <div className={styles.loaderContainer}>
            <div className={styles.loaderTypography}>{loadProgress}%</div>
            <div className={styles.loaderLabel}>Loading Cinematic Experience</div>
          </div>
        )}

        {/* Cinematic Canvas Background */}
        <div className={styles.canvasContainer} style={{ opacity: isLoaded ? 1 : 0 }}>
          <canvas ref={canvasRef} className={styles.scrollCanvas} />
          <div className={styles.canvasOverlay} />
        </div>

        {/* Horizontal Scrolling Track */}
        {isLoaded && (
          <div ref={trackRef} className={styles.horizontalTrack}>
            
            {/* Panel 1 */}
            <div className={styles.textPanel}>
              <span className={styles.captionTag}>01 &mdash; Precision</span>
              <h2 className={styles.captionTitle}>
                Crafted with <span>surgical precision.</span>
              </h2>
              <p className={styles.captionDesc}>
                We align every folding line of the creative layout to lead your user's eyes directly to the core message.
              </p>
            </div>

            {/* Panel 2 */}
            <div className={styles.textPanel}>
              <span className={styles.captionTag}>02 &mdash; Alignment</span>
              <h2 className={styles.captionTitle}>
                Where art meets <span>conversion science.</span>
              </h2>
              <p className={styles.captionDesc}>
                Not just aesthetic grids, but layout hierarchies optimized for deep engagement, retention and conversion.
              </p>
            </div>

            {/* Panel 3 */}
            <div className={styles.textPanel}>
              <span className={styles.captionTag}>03 &mdash; Unfold</span>
              <h2 className={styles.captionTitle}>
                Your digital presence, <span>fully realized.</span>
              </h2>
              <p className={styles.captionDesc}>
                Watch your brand unfold seamlessly into high-performance web pages that drive exponential growth.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}