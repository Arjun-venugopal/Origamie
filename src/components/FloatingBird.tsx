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
      <svg width={80 * scale} height={80 * scale} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        {/* Blue wing */}
        <polygon points="55,15 95,35 75,70 45,55" fill="#5773FF" opacity="0.9" />
        <polygon points="55,15 75,25 75,70 45,55" fill="#4060E0" opacity="0.9" />
        {/* Outline */}
        <polyline points="55,15 95,35 75,70 55,105 25,80 45,55 55,15" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="45" y1="55" x2="75" y2="70" stroke="#1a1a1a" strokeWidth="2" />
        {/* Head */}
        <polyline points="25,80 10,75 5,65" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Tail */}
        <polyline points="55,105 40,115 30,110" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="55,105 50,118 38,118" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}
