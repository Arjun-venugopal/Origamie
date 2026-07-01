'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingBirdProps {
  style?: React.CSSProperties;
  delay?: number;
  scale?: number;
}

export default function FloatingBird({ style, delay = 0, scale = 1 }: FloatingBirdProps) {
  return (
    <motion.div
      style={{ position: 'absolute', zIndex: 1, ...style }}
      animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width={80 * scale} height={80 * scale} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g stroke="black" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          {/* Back wing */}
          <polygon points="55,20 95,15 75,50" fill="white" />
          
          {/* White strip between blue wing and black shadow */}
          <polygon points="30,65 70,45 75,50" fill="white" />
          
          {/* Black shadow */}
          <polygon points="30,65 75,50 72,70" fill="black" />
          
          {/* Tail */}
          <polygon points="75,50 90,95 70,85" fill="white" />
          
          {/* Neck */}
          <polygon points="15,30 40,40 30,65" fill="white" />
          
          {/* Beak */}
          <polygon points="5,45 15,30 20,42" fill="white" />
          
          {/* Front blue wing left */}
          <polygon points="30,65 48,15 55,20" fill="#5B6EF2" />
          
          {/* Front blue wing right */}
          <polygon points="30,65 55,20 70,45" fill="#5B6EF2" />
        </g>
      </svg>
    </motion.div>
  );
}
