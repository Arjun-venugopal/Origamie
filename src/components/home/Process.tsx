'use client';

import React from 'react';
import styles from './Process.module.css';

const steps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "& strategize",
    desc: "A 60-min deep-dive into your audience, offer and brand. You leave with a clear creative direction, even if we don't work together.",
    icon: "1",
    className: styles.bentoStep1
  },
  {
    number: "02",
    title: "Design",
    subtitle: "& build",
    desc: "Weekly demos, live Figma access and a shipping site in 2–6 weeks. No black boxes, no surprise reveals.",
    icon: "2",
    className: styles.bentoStep2
  },
  {
    number: "03",
    title: "Launch",
    subtitle: "& handover",
    desc: "We ship with clean code, real SEO foundations and a recorded walkthrough so your team can take it from here.",
    icon: "3",
    className: styles.bentoStep3
  }
];

export default function Process() {
  return (
    <section id="process" className={styles.processSection}>
      <div className={styles.bentoGrid}>
        
        {/* Intro Block (Spans 2 columns, 2 rows) */}
        <div className={styles.bentoIntro}>
          <div className={styles.introDecoration1} />
          <div className={styles.introDecoration2} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.processPreTitle}>How we work</div>
            <h2 className={styles.processTitle}>
              From idea to<br/><span>launch in weeks.</span>
            </h2>
            <p className={styles.processSubtitle}>
              A tight, transparent process with fixed quotes, weekly demos and one shared channel — designed for teams who hate agency drama.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.bentoCard} ${step.className}`}
          >
            <div className={styles.stepHeader}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <div className={styles.stepNumber}>{step.number}</div>
            </div>
            
            <div>
              <h3 className={styles.stepTitle}>
                {step.title} <span>{step.subtitle}</span>
              </h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
