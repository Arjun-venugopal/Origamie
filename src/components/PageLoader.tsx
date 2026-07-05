'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/app/page.module.css';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Progress count animation
    const countObj = { val: 0 };
    const progressTimeline = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTimeline = gsap.timeline({
          onComplete: onComplete,
        });

        // Split or slide up exit reveal
        exitTimeline.to(logoRef.current, {
          scale: 1.2,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut',
        });

        exitTimeline.to(percentRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, '-=0.4');

        exitTimeline.to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.9,
          ease: 'power4.inOut',
        }, '-=0.2');
      }
    });

    progressTimeline.to(countObj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        const rounded = Math.floor(countObj.val);
        setProgress(rounded);
        if (barRef.current) {
          barRef.current.style.width = `${rounded}%`;
        }
      }
    });

    // 2. Animate logo paths (draw SVG effect)
    if (logoRef.current) {
      const paths = logoRef.current.querySelectorAll('polygon, path');
      gsap.fromTo(paths, 
        { strokeDasharray: '300', strokeDashoffset: '300', fillOpacity: 0 },
        { strokeDashoffset: '0', fillOpacity: 1, duration: 1.8, ease: 'power2.inOut', stagger: 0.08 }
      );
    }
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.loaderScreen}>
      <div className={styles.loaderWrapper}>
        {/* Animated Drawing Logo */}
        <svg
          ref={logoRef}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.loaderLogo}
        >
          <g stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
            <polygon points="55,20 95,15 75,50" fill="rgba(255, 255, 255, 0.05)" />
            <polygon points="30,65 70,45 75,50" fill="rgba(255, 255, 255, 0.05)" />
            <polygon points="30,65 75,50 72,70" fill="rgba(255, 255, 255, 0.05)" />
            <path d="M 75,50 L 90,95 Q 63,83 70,85 Z" fill="rgba(255, 255, 255, 0.05)" />
            <polygon points="15,30 40,40 30,65" fill="rgba(255, 255, 255, 0.05)" />
            <path d="M 5,45 L 15,30 L 20,42 Q 10,48 5,45 Z" fill="rgba(255, 255, 255, 0.05)" />
            <polygon points="30,65 48,15 55,20" fill="#3558FF" />
            <polygon points="30,65 55,20 70,45" fill="#5F7BFF" />
          </g>
        </svg>

        {/* Premium Progress Bar */}
        <div className={styles.loaderBarContainer}>
          <div ref={barRef} className={styles.loaderBarFill} />
        </div>

        {/* Counter */}
        <div ref={percentRef} className={styles.loaderPercent}>
          <span>{progress.toString().padStart(3, '0')}</span>
          <span className={styles.loaderPercentSymbol}>%</span>
        </div>
      </div>
    </div>
  );
}
