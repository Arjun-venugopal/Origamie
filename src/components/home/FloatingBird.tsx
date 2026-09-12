import React from 'react';
import Image from 'next/image';
import styles from './FloatingBird.module.css';

interface FloatingBirdProps {
  style?: React.CSSProperties;
  delay?: number;
  scale?: number;
}

export default function FloatingBird({ style, delay = 0, scale = 1 }: FloatingBirdProps) {
  return (
    <div
      className={styles.birdWrapper}
      style={{
        ...style,
        animationDelay: `${delay}s`,
      }}
    >
      <Image
        src="/crane-logo.png"
        alt="Origamie crane logo"
        width={100}
        height={100}
        style={{ 
          width: `calc(clamp(30px, 8vw, 100px) * ${scale})`, 
          height: 'auto', 
          pointerEvents: 'none' 
        }}
      />
    </div>
  );
}
