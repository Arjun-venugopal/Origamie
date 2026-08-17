'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, useMotionValueEvent } from 'framer-motion';
import { ArrowDownRight, Megaphone, Search, Infinity as InfinityIcon, MousePointer2, PenTool, Video, Globe, Smartphone, Wrench } from 'lucide-react';
import styles from './Pills.module.css';

const services = [
  {
    id: 1,
    titleBlack: 'Digital',
    titleBlue: 'marketing',
    desc: 'Grow online with targeted campaigns, social media marketing, and lead generation.',
    icon: <Megaphone size={48} strokeWidth={1.5} />
  },
  {
    id: 2,
    titleBlack: 'Search Engine',
    titleBlue: 'Optimization',
    desc: 'Improve Google rankings, website visibility, organic traffic, and business enquiries.',
    icon: <Search size={48} strokeWidth={1.5} />
  },
  {
    id: 3,
    titleBlack: 'Meta',
    titleBlue: 'ads',
    desc: 'Reach customers through Facebook and Instagram ads that generate quality leads.',
    icon: <InfinityIcon size={48} strokeWidth={1.5} />
  },
  {
    id: 4,
    titleBlack: 'Google',
    titleBlue: 'ads',
    desc: 'Drive instant traffic and enquiries with high-performing Google ads campaigns.',
    icon: <MousePointer2 size={48} strokeWidth={1.5} />
  },
  {
    id: 5,
    titleBlack: 'Graphics',
    titleBlue: 'Designing',
    desc: 'Visually stunning branding, social media posters, and marketing design materials.',
    icon: <PenTool size={48} strokeWidth={1.5} />
  },
  {
    id: 6,
    titleBlack: 'Motion',
    titleBlue: 'Graphics',
    desc: 'Engage your audience with animated videos, motion ads, and visual creations.',
    icon: <Video size={48} strokeWidth={1.5} />
  },
  {
    id: 7,
    titleBlack: 'Web',
    titleBlue: 'development',
    desc: 'Build fast, responsive, SEO-friendly websites that support your business growth online.',
    icon: <Globe size={48} strokeWidth={1.5} />
  },
  {
    id: 8,
    titleBlack: 'App',
    titleBlue: 'development',
    desc: 'Develop custom, user-friendly mobile apps with profitable business-focused features.',
    icon: <Smartphone size={48} strokeWidth={1.5} />
  },
  {
    id: 9,
    titleBlack: 'Computer',
    titleBlue: 'services',
    desc: 'Reliable computer repairs, maintenance, software support, and technical assistance services.',
    icon: <Wrench size={48} strokeWidth={1.5} />
  }
];

const springScaleIn = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      delay: i * 0.1, 
      type: "spring" as const, 
      stiffness: 100, 
      damping: 15,
      mass: 0.8
    }
  })
};

const floatingIcon = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: i * 0.2
    }
  })
};

const duplicatedServices = [...services, ...services];

export default function Pills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);

  useEffect(() => {
    const updateWidth = () => {
      if (scrollRef.current) {
        setWidth(scrollRef.current.scrollWidth / 2);
      }
    };
    
    updateWidth();
    const timer = setTimeout(updateWidth, 150);
    window.addEventListener('resize', updateWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useAnimationFrame((time, delta) => {
    if (!width || isDragging.current || isHovered.current) return;
    
    // Auto-scroll speed (pixels per ms)
    const moveBy = 0.05 * delta; 
    let newX = x.get() - moveBy;
    x.set(newX);
  });

  useMotionValueEvent(x, "change", (latest) => {
    if (!width) return;
    // Seamless infinite wrap
    if (latest <= -width) {
      x.set(latest + width);
    } else if (latest > 0) {
      x.set(latest - width);
    }
  });

  return (
    <section id="services" className={styles.aboutSection}>
      <div className={styles.aboutHeader}>
        <motion.h2
          className={styles.aboutTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What we craft, fold,<br />
          and ship for <span>#you.</span>
        </motion.h2>

        <motion.p
          className={styles.aboutDesc}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          A full spectrum of digital craft — from first sketch to live experience, plus on-the-ground tech support.
        </motion.p>
      </div>

      <div className={styles.marqueeWrapper}>
        <motion.div 
          ref={scrollRef}
          className={styles.pillsSection}
          style={{ x, cursor: isDragging.current ? 'grabbing' : 'grab' }}
          drag="x"
          dragConstraints={{ left: -width * 2, right: width }}
          dragElastic={0}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={() => { isDragging.current = false; }}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          onPointerDown={() => { isDragging.current = true; }}
          onPointerUp={() => { isDragging.current = false; }}
        >
          {duplicatedServices.map((s, i) => (
            <div
              key={`${s.id}-${i}`}
              className={styles.pillCard}
            >
              <motion.div 
                className={styles.pillIconWrapper}
                custom={i}
                animate="animate"
                variants={floatingIcon}
              >
                {s.icon}
              </motion.div>
              <h3 className={styles.pillTitle}>
                {s.titleBlack} <span>{s.titleBlue}</span>
              </h3>
              <p className={styles.pillDesc}>{s.desc}</p>
              <button className={styles.pillButton}>
                <ArrowDownRight size={20} />
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
