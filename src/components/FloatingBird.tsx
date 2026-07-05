'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
      <Image
        src="/crane-logo.png"
        alt="Origamie crane logo"
        width={80 * scale}
        height={80 * scale}
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>
  );
}
