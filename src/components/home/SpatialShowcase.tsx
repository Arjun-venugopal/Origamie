'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  PenTool, 
  Megaphone, 
  Wrench, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import styles from './SpatialShowcase.module.css';

const AGENCY_SERVICES = [
  {
    id: '01',
    label: 'Web & App Dev',
    tag: '01 • Core Engineering',
    title: 'High-Performance Web & Mobile Applications',
    desc: 'From bespoke Next.js web applications to fast cross-platform mobile apps. Engineered for sub-second page loads, 100% Core Web Vitals, and effortless conversion flows.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Modern Web and App Development Engineering',
    imageBadge: 'Next.js 16 & React 19',
    icon: Globe,
    includedServices: [
      { name: 'Web Development', desc: 'Fast, responsive, SEO-ready custom websites' },
      { name: 'App Development', desc: 'Custom iOS & Android apps with modern UI' },
      { name: 'SaaS & Web Platforms', desc: 'Scalable architecture with lightning-fast load times' }
    ],
    ctaText: 'Explore Web & Apps',
    ctaLink: '/services'
  },
  {
    id: '02',
    label: 'Design & Motion',
    tag: '02 • Visual Craft',
    title: 'Editorial Branding & Kinetic Motion Graphics',
    desc: 'We sculpt iconic visual brand languages, social media design systems, and fluid animated motion graphics that capture market attention and build authority.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    imageAlt: '3D Geometric Design and Kinetic Motion Art',
    imageBadge: 'Visual & Motion Direction',
    icon: PenTool,
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
    tag: '03 • Growth Engine',
    title: 'Precision Ads & Search Engine Dominance',
    desc: 'Full-funnel digital marketing across Meta and Google Ads paired with technical SEO to turn commercial search intent into qualified inbound leads and revenue.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'Digital Marketing Performance and Data Analytics',
    imageBadge: 'Paid Ads & SEO Growth',
    icon: Megaphone,
    includedServices: [
      { name: 'Google Ads & Search', desc: 'High-intent PPC campaigns for instant qualified enquiries' },
      { name: 'Meta Ads (FB & IG)', desc: 'Targeted visual ad funnels that lower acquisition costs' },
      { name: 'Search Engine Optimization', desc: 'Organic ranking strategy & website visibility lift' }
    ],
    ctaText: 'Explore Marketing & Ads',
    ctaLink: '/services'
  },
  {
    id: '04',
    label: 'Computer & IT',
    tag: '04 • Systems & Support',
    title: 'Enterprise Computer Maintenance & IT Support',
    desc: 'Reliable hardware diagnostics, computer repairs, software configuration, and on-demand technical assistance to keep your business operating without interruption.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1600&auto=format&fit=crop',
    imageAlt: 'High-Performance Computer Hardware & Enterprise IT Support',
    imageBadge: 'Managed IT & Diagnostics',
    icon: Wrench,
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
  const [activeTab, setActiveTab] = useState(0);

  const currentService = AGENCY_SERVICES[activeTab];

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? AGENCY_SERVICES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev === AGENCY_SERVICES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.preTitle}>
            <span>Origamie Capabilities</span>
          </div>

          <h2 className={styles.mainHeading}>
            Capabilities engineered for <br />
            <span className={styles.serifGradient}>modern digital growth.</span>
          </h2>

          <p className={styles.subHeading}>
            Explore our comprehensive suite of creative design, web development, growth marketing, and managed IT services — built to scale your business online.
          </p>
        </div>

        {/* Minimal Segmented Tab Dock */}
        <div className={styles.tabBarWrapper}>
          <div className={styles.tabBar} role="tablist" aria-label="Capabilities Navigation">
            {AGENCY_SERVICES.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${service.id}`}
                  id={`tab-${service.id}`}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={styles.tabActiveBg}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className={styles.tabIcon}>
                    <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  </span>
                  <span className={styles.tabLabel}>{service.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal User-Friendly Showcase Card */}
        <div className={styles.showcaseCardWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.id}
              id={`panel-${currentService.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentService.id}`}
              className={styles.showcaseCard}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Left Column: Details */}
              <div className={styles.contentCol}>
                <div className={styles.tagBadge}>
                  <span>{currentService.tag}</span>
                </div>

                <h3 className={styles.cardTitle}>{currentService.title}</h3>
                <p className={styles.cardDesc}>{currentService.desc}</p>

                <div className={styles.featuresList}>
                  {currentService.includedServices.map((item, i) => (
                    <div key={i} className={styles.featureItem}>
                      <div className={styles.checkIconWrapper}>
                        <Check size={13} strokeWidth={2.6} />
                      </div>
                      <div className={styles.featureText}>
                        <strong className={styles.featureName}>{item.name}</strong>
                        <span className={styles.featureDesc}> — {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.cardFooterActions}>
                  <Link href={currentService.ctaLink} className={styles.primaryBtn}>
                    <span>{currentService.ctaText}</span>
                    <ArrowUpRight size={17} />
                  </Link>

                  <div className={styles.navControls}>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className={styles.stepBtn}
                      aria-label="Previous capability"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className={styles.stepIndicator}>
                      {activeTab + 1} / {AGENCY_SERVICES.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className={styles.stepBtn}
                      aria-label="Next capability"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview */}
              <div className={styles.visualCol}>
                <div className={styles.imageContainer}>
                  <Image
                    src={currentService.image}
                    alt={currentService.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className={styles.previewImage}
                    priority
                  />
                  <div className={styles.imageOverlay} />
                  <div className={styles.imageBadge}>
                    <Sparkles size={13} color="#00178D" />
                    <span>{currentService.imageBadge}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
