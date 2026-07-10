'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './layout.module.css';

// Custom Easing function for organic convergence
function cubicBezier(t: number) {
  // Simplified approximation for standard cubic bezier ease-in-out feeling
  const t2 = t * t;
  const t3 = t2 * t;
  return 3 * t2 - 2 * t3; // Smoothstep
}

class Particle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  destX: number;
  destY: number;
  vx: number;
  vy: number;
  size: number;
  maxOpacity: number;
  opacity: number;
  isAmbient: boolean;
  angle: number;
  speed: number;
  wobbleOffset: number;
  shimmerSpeed: number;

  constructor(destX: number, destY: number, canvasWidth: number, canvasHeight: number, isAmbient: boolean) {
    this.destX = destX;
    this.destY = destY;
    this.isAmbient = isAmbient;
    
    // Spawn from edges
    const spawnEdge = Math.floor(Math.random() * 4);
    if (spawnEdge === 0) { this.x = Math.random() * canvasWidth; this.y = -10; } // Top
    else if (spawnEdge === 1) { this.x = canvasWidth + 10; this.y = Math.random() * canvasHeight; } // Right
    else if (spawnEdge === 2) { this.x = Math.random() * canvasWidth; this.y = canvasHeight + 10; } // Bottom
    else { this.x = -10; this.y = Math.random() * canvasHeight; } // Left

    this.startX = this.x;
    this.startY = this.y;
    this.vx = (Math.random() - 0.5) * 1;
    this.vy = (Math.random() - 0.5) * 1;
    
    // 1-4px random size
    this.size = Math.random() * 1.5 + 0.5; 
    
    // 0.3 - 1.0 opacity
    this.maxOpacity = Math.random() * 0.7 + 0.3;
    this.opacity = 0;

    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.5 + 0.1;
    this.wobbleOffset = Math.random() * Math.PI * 2;
    this.shimmerSpeed = Math.random() * 0.05 + 0.02;
  }

  update(time: number, phase: number, deltaTime: number) {
    // Phase 1: Emergence (0s - 0.2s)
    if (phase === 1) {
      const progress = time / 200; // 0 to 1
      this.opacity = Math.min(progress, this.maxOpacity);
      this.x += this.vx * deltaTime * 60;
      this.y += this.vy * deltaTime * 60;
    } 
    // Phase 2: Convergence (0.2s - 0.8s)
    else if (phase === 2) {
      if (this.isAmbient) {
        // Ambient particles just drift
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
        // Shimmer
        this.opacity = this.maxOpacity * (0.8 + 0.2 * Math.sin(time * this.shimmerSpeed));
      } else {
        const progress = Math.min((time - 200) / 600, 1);
        const ease = cubicBezier(progress);
        
        // Move towards destination
        this.x = this.startX + (this.destX - this.startX) * ease;
        this.y = this.startY + (this.destY - this.startY) * ease;

        // Add some organic noise/wobble while traveling
        const noise = (1 - progress) * 10;
        this.x += Math.sin(time * 0.005 + this.wobbleOffset) * noise;
        this.y += Math.cos(time * 0.005 + this.wobbleOffset) * noise;

        this.opacity = this.maxOpacity;
      }
    }
    // Phase 3: Assembly & Glow (0.8s - 1.0s)
    else if (phase === 3) {
      if (this.isAmbient) {
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
      } else {
        // Snap perfectly, but add micro-wobble (breathing)
        this.x = this.destX + Math.sin(time * 0.002 + this.wobbleOffset) * 0.5;
        this.y = this.destY + Math.cos(time * 0.002 + this.wobbleOffset) * 0.5;
      }
      // Glowing/Breathing pulse
      this.opacity = this.maxOpacity * (0.8 + 0.2 * Math.sin(time * 0.01));
    }
    // Phase 4: BOOM (1.0s - 1.2s)
    else if (phase === 4) {
      if (!this.vx || Math.abs(this.vx) < 2) {
        // Initialize explosion velocity
        const angle = Math.random() * Math.PI * 2;
        // Faster boom: high initial speed
        const speed = Math.random() * 20 + 10; 
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
      }
      this.x += this.vx * deltaTime * 60;
      this.y += this.vy * deltaTime * 60;
      // Fade out rapidly
      this.opacity = Math.max(0, this.opacity - 0.05 * deltaTime * 60);
    }
  }

  draw(ctx: CanvasRenderingContext2D, phase: number) {
    if (this.opacity <= 0) return;
    
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    
    // Add glow during Phase 3
    if (phase === 3 && !this.isAmbient) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(255,255,255,0.6)';
    } else {
      ctx.shadowBlur = 0;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Module-level variable to track if loader has played in this JS session.
// This survives soft Next.js navigations, but resets on hard browser reload.
let hasPlayedLoader = false;

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (hasPlayedLoader) {
      onComplete();
      return;
    }
    hasPlayedLoader = true;

    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true, alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    let startTime = performance.now();
    let lastTime = startTime;

    const render = (currentTime: number) => {
      // Safety check if canvas was unmounted
      if (!canvasRef.current) return;

      const elapsed = currentTime - startTime;
      const deltaTime = (currentTime - lastTime) / 1000; // seconds
      lastTime = currentTime;

      // Determine Phase
      let phase = 1;
      if (elapsed > 200 && elapsed <= 800) phase = 2;
      else if (elapsed > 800 && elapsed <= 1000) phase = 3;
      else if (elapsed > 1000) phase = 4;

      // Dark void background with slight trailing effect in BOOM phase
      if (phase === 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Creates trails
      } else {
        ctx.fillStyle = '#000000'; // Pure black void
      }
      ctx.shadowBlur = 0; // Reset shadow before clear
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(elapsed, phase, deltaTime);
        particles[i].draw(ctx, phase);
      }

      // Flash logic exactly at 1.0s
      if (elapsed > 1000 && elapsed < 1100) {
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - (elapsed - 1000) / 100})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const initParticles = () => {
      particles = [];
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      
      // Draw text to extract pixels
      const text = "Origamie";
      // clamp(60px, 12vw, 140px)
      const fontSize = Math.min(Math.max(width * 0.12, 60), 140); 
      ctx.fillStyle = "white";
      ctx.font = `600 ${fontSize}px "Urbanist", "Space Grotesk", sans-serif`;
      ctx.letterSpacing = "2px";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2);

      const imgData = ctx.getImageData(0, 0, width, height).data;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const targetTextParticles = 2500;
      const targetAmbientParticles = 150;
      
      const pixelCoordinates = [];
      const gap = 4;
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          // Check Red channel since alpha is always 255 on alpha:false canvas
          if (imgData[index] > 128) {
            pixelCoordinates.push({ x, y });
          }
        }
      }
      
      // Shuffle coordinates to pick random spots
      pixelCoordinates.sort(() => Math.random() - 0.5);
      
      const count = Math.min(targetTextParticles, pixelCoordinates.length);
      for (let i = 0; i < count; i++) {
        const coord = pixelCoordinates[i];
        // Add random scatter so it forms a cloud initially
        const offsetX = (Math.random() - 0.5) * gap;
        const offsetY = (Math.random() - 0.5) * gap;
        particles.push(new Particle(coord.x + offsetX, coord.y + offsetY, width, height, false));
      }

      // Add ambient particles
      for (let i = 0; i < targetAmbientParticles; i++) {
        particles.push(new Particle(0, 0, width, height, true));
      }
    };

    // Wait for fonts to be ready before extracting text coordinates
    document.fonts.ready.then(() => {
      if (!canvasRef.current) return;
      initParticles();
      startTime = performance.now();
      lastTime = startTime;
      animationFrameId = requestAnimationFrame(render);
    });

    // Timeline for Fade Out (Phase 5)
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 1.1,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.style.overflow = '';
        cancelAnimationFrame(animationFrameId);
        onComplete();
      }
    });

    const handleResize = () => {
      setCanvasSize();
      initParticles();
      startTime = performance.now(); // Restart sequence on resize to avoid glitch
      lastTime = startTime;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className={styles.loaderScreenParticle}>
      <canvas ref={canvasRef} className={styles.particleCanvas} />
    </div>
  );
}
