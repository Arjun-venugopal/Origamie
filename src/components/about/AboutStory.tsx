'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/app/about/about.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

// Sub-component for individual paragraph reveal
function StoryParagraph({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"] // starts animating when top hits 85% of viewport, ends at 40%
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(10px)", "blur(0px)"]);

  return (
    <motion.p 
      ref={ref}
      className={styles.storyParagraph}
      style={{ opacity, filter }}
    >
      {children}
    </motion.p>
  );
}

export default function AboutStory() {
  return (
    <section id="our-story" className={styles.storySection}>
      <div className={styles.storyContainer}>
        
        {/* Sticky Header Side */}
        <div className={styles.storyHeader}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <p className={styles.storyPreTitle}>
              Our Story
            </p>
            <h2 className={styles.storyTitle}>
              Designed for <span>Growth</span>
            </h2>
          </motion.div>
        </div>

        {/* Scrolling Content Side */}
        <div className={styles.storyContent}>
          <StoryParagraph>
            Origamie was born out of a simple observation: beautiful websites often fail to convert, and high-converting websites are often visually uninspired. We believed that founders shouldn&apos;t have to choose between <strong>aesthetics</strong> and <strong>performance</strong>.
          </StoryParagraph>

          <StoryParagraph>
            What started as a boutique design studio quickly evolved into a full-scale digital agency. Our approach is deeply rooted in understanding user psychology, modern web technologies, and the art of folding complex ideas into simple, elegant digital experiences.
          </StoryParagraph>

          <StoryParagraph>
            Today, our multi-disciplinary team of strategists, designers, and engineers work side-by-side. From first sketch to the final live experience, we craft digital products that not only win awards but consistently drive <strong>2–4x more qualified leads</strong> for our clients.
          </StoryParagraph>
        </div>

      </div>
    </section>
  );
}
