'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  const activeFrameRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Draw frame helper on canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Clear previous frame
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

  // 1. Preload 30 PNG frames
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

  // 2. Handle canvas resizing & initial frame render
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

    // Initial draw frame 0 after small DOM paint frame
    const timer = setTimeout(() => {
      resizeCanvas();
      drawFrame(0);
    }, 50);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timer);
    };
  }, [isLoaded, drawFrame]);

  // 3. GSAP ScrollTrigger horizontal track & frame scrubbing
  useEffect(() => {
    if (!isLoaded || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Draw first frame
      drawFrame(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 3x scroll distance for smooth scrubbing
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              Math.floor(self.progress * (TOTAL_FRAMES - 1)),
              TOTAL_FRAMES - 1
            );

            if (activeFrameRef.current !== frameIndex) {
              activeFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }
          }
        }
      });

      // Translate track horizontally across 3 panels
      tl.to(trackRef.current, {
        xPercent: -66.666,
        ease: 'none'
      });

      // Refresh ScrollTrigger after pin calculation
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded, drawFrame]);

  return (
    <div ref={containerRef} className={styles.scrollAnimationSection}>
      <div className={styles.scrollAnimationSticky}>
        
        {/* Loading Indicator */}
        {!isLoaded && (
          <div className={styles.loaderContainer}>
            <div className={styles.loaderTypography}>{loadProgress}%</div>
            <div className={styles.loaderLabel}>Loading Crane Animation</div>
          </div>
        )}

        {/* Cinematic Canvas Background */}
        <div className={styles.canvasContainer} style={{ opacity: isLoaded ? 1 : 0 }}>
          <canvas ref={canvasRef} className={styles.scrollCanvas} />
          <div className={styles.canvasOverlay} />
        </div>

        {/* Horizontal Scrolling Panels Track */}
        {isLoaded && (
          <div ref={trackRef} className={styles.horizontalTrack}>
            
            {/* Panel 1 */}
            <div className={styles.textPanel}>
              <span className={styles.captionTag}>01 &mdash; Precision</span>
              <h2 className={styles.captionTitle}>
                Crafted with <span>surgical precision.</span>
              </h2>
              <p className={styles.captionDesc}>
                We align every folding line of the creative layout to lead your user&apos;s eyes directly to the core message.
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