'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  Globe, 
  PenTool, 
  Megaphone, 
  Wrench, 
  Smartphone, 
  Video, 
  Search, 
  Infinity as InfinityIcon, 
  MousePointer2 
} from 'lucide-react';
import styles from './SpatialShowcase.module.css';

const AGENCY_SERVICES_3D = [
  {
    id: '01',
    label: 'Web & App Dev',
    tag: 'CORE ENGINEERING // 01',
    title: 'High-Performance Web & Mobile Applications.',
    desc: 'From bespoke Next.js 16 websites to native and cross-platform mobile apps. Engineered for sub-50ms TTFB, 100% Core Web Vitals, and effortless conversion flows.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Modern Web and App Development Engineering',
    imageBadge: 'NEXT.JS 16 & REACT 19 STACK',
    includedServices: [
      { name: 'Web Development', desc: 'Fast, responsive, SEO-friendly custom websites' },
      { name: 'App Development', desc: 'Custom iOS & Android apps with business features' },
      { name: 'SaaS & Web Platforms', desc: 'Scalable architecture with sub-second page loads' }
    ],
    ctaText: 'Explore Web & Apps',
    ctaLink: '/services'
  },
  {
    id: '02',
    label: 'Design & Motion',
    tag: 'VISUAL CRAFT // 02',
    title: 'Editorial Branding & Kinetic Motion Graphics.',
    desc: 'We sculpt iconic visual brand languages, social media design systems, and fluid animated motion graphics that capture market attention and build authority.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    imageAlt: '3D Geometric Design and Kinetic Motion Art',
    imageBadge: '3D VISUAL & MOTION DIRECTION',
    includedServices: [
      { name: 'Graphics Designing', desc: 'Branding, social media posters, & marketing kits' },
      { name: 'Motion Graphics', desc: 'Animated promo videos & high-converting motion ads' },
      { name: 'Visual Identity Systems', desc: 'Distinctive typography & bespoke digital assets' }
    ],
    ctaText: 'See Design & Motion',
    ctaLink: '/services'
  },
  {
    id: '03',
    label: 'Marketing & Ads',
    tag: 'GROWTH ENGINE // 03',
    title: 'Precision Ads & Search Engine Dominance.',
    desc: 'Full-funnel digital marketing across Meta and Google Ads paired with technical SEO to turn commercial search intent into qualified inbound leads and revenue.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Digital Marketing Performance and Data Analytics',
    imageBadge: 'PAID ADS & SEO VELOCITY',
    includedServices: [
      { name: 'Google Ads & Search', desc: 'High-intent PPC campaigns for instant qualified enquiries' },
      { name: 'Meta Ads (FB & IG)', desc: 'Targeted visual ad funnels that lower acquisition costs' },
      { name: 'Search Engine Optimization (SEO)', desc: 'Organic ranking strategy & website visibility lift' }
    ],
    ctaText: 'Explore Marketing & Ads',
    ctaLink: '/services'
  },
  {
    id: '04',
    label: 'Computer & IT',
    tag: 'SYSTEMS & SUPPORT // 04',
    title: 'Enterprise Computer Maintenance & IT Support.',
    desc: 'Reliable hardware diagnostics, computer repairs, software configuration, and on-demand technical assistance to keep your business operating without interruption.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'High-Performance Computer Hardware & Enterprise IT Support',
    imageBadge: 'MANAGED IT & HARDWARE SUPPORT',
    includedServices: [
      { name: 'Computer Repairs & Maintenance', desc: 'Full hardware diagnostics, repairs, & cleaning' },
      { name: 'Software Support & Setup', desc: 'OS configuration, data migration, & security' },
      { name: 'Technical Assistance', desc: 'Reliable troubleshooting & fast turn-around support' }
    ],
    ctaText: 'Book IT Services',
    ctaLink: '/contact'
  }
];

export default function SpatialShowcase() {
  const [activeDim, setActiveDim] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  // 3D Mouse Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const tiltX = (y * -6).toFixed(2);
    const tiltY = (x * 6).toFixed(2);

    stageRef.current.style.transform = `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handleMouseLeave = () => {
    if (stageRef.current) {
      stageRef.current.style.transform = `perspective(1400px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  return (
    <section 
      className={styles.spatialSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Atmospheric Background */}
      <div className={styles.spatialGlow1} />
      <div className={styles.spatialGlow2} />
      <div className={styles.isometricGridFloor} />

      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <motion.div 
            className={styles.statusPill}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.pillDot} />
            <span>Origamie • Full-Spectrum Digital Agency</span>
          </motion.div>

          <motion.h2 
            className={styles.mainHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Capabilities engineered for <br />
            <span className={styles.serifGradient}>modern digital growth.</span>
          </motion.h2>

          <motion.p 
            className={styles.subHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Explore our comprehensive suite of creative design, web development, growth marketing, and managed IT services — built to scale your business online.
          </motion.p>
        </div>

        {/* 3D Dimension Navigation Switcher */}
        <div className={styles.dimensionNavDock}>
          {AGENCY_SERVICES_3D.map((dim, idx) => {
            const isActive = activeDim === idx;
            return (
              <button
                key={dim.id}
                type="button"
                className={`${styles.navBtn} ${isActive ? styles.navBtnActive : ''}`}
                onClick={() => setActiveDim(idx)}
                aria-label={`Switch to ${dim.label}`}
              >
                <span className={styles.navIndex}>{dim.id}</span>
                <span className={styles.btnLabelText}>{dim.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Interactive Perspective Stage */}
        <div 
          ref={stageRef}
          className={styles.stage3DWrapper}
          style={{ transition: 'transform 0.18s ease-out' }}
        >
          {AGENCY_SERVICES_3D.map((dim, idx) => {
            const isActive = activeDim === idx;
            return (
              <div
                key={dim.id}
                className={`${styles.card3DContainer} ${isActive ? styles.card3DActive : ''}`}
              >
                
                {/* 3D Visual Render Window (Left) */}
                <div className={styles.visual3DWindow}>
                  <Image
                    src={dim.image}
                    alt={dim.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.visualImage}
                    priority={idx === 0}
                  />
                  <div className={styles.visualOverlayGlint} />
                  <div className={styles.visualTagOverlay}>
                    <Sparkles size={13} color="#38BDF8" />
                    <span>{dim.imageBadge}</span>
                  </div>
                </div>

                {/* Content Details (Right) */}
                <div className={styles.contentBlock3D}>
                  <div className={styles.phaseBadge}>
                    <span>{dim.tag}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{dim.title}</h3>
                  <p className={styles.cardDesc}>{dim.desc}</p>

                  <div className={styles.metricsGrid}>
                    {dim.includedServices.map((svc, sIdx) => (
                      <div key={sIdx} className={styles.metricItem}>
                        <span className={styles.metricBulletDot} />
                        <div>
                          <strong>{svc.name}</strong> — {svc.desc}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href={dim.ctaLink} className={styles.actionCtaBtn}>
                    <span>{dim.ctaText}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
