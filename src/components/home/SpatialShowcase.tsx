'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe, 
  PenTool, 
  Megaphone, 
  Wrench, 
  ArrowRight
} from 'lucide-react';
import styles from './SpatialShowcase.module.css';

const CAPABILITIES = [
  {
    id: '01',
    tag: 'Web & App Development',
    title: 'Next-Gen Web & Mobile Platforms',
    desc: 'Engineered with Next.js 16 and React 19 for instantaneous load times, fluid micro-interactions, and conversion-optimized checkout flows.',
    image: '/images/3d/hologram-ui-3d.jpg',
    imageAlt: 'Next-Gen Web and Mobile Engineering Holographic Interface',
    icon: Globe,
    highlights: ['Next.js 16 Architecture', 'iOS & Android Apps', 'Sub-50ms Response'],
    link: '/services'
  },
  {
    id: '02',
    tag: 'Design & Motion',
    title: 'Editorial Branding & 3D Motion',
    desc: 'Bespoke visual identities, kinetic motion ads, and sculptural digital design systems that make your brand unforgettable in crowded markets.',
    image: '/images/3d/origami-crane-3d.jpg',
    imageAlt: 'Sculptural Glass Origami Crane Brand Design and 3D Motion',
    icon: PenTool,
    highlights: ['Visual Brand Systems', 'Kinetic 3D Motion', 'Social Campaign Kits'],
    link: '/services'
  },
  {
    id: '03',
    tag: 'Growth Marketing',
    title: 'Precision Ads & Organic Dominance',
    desc: 'Multi-channel paid acquisition across Meta and Google, aligned with technical SEO to capture buyer intent and generate scalable revenue.',
    image: '/images/3d/kinetic-core-3d.jpg',
    imageAlt: 'Kinetic Energy Core Performance and Digital Marketing Analytics',
    icon: Megaphone,
    highlights: ['Google & Meta Ads', 'Technical SEO Audits', 'Conversion Rate Opt.'],
    link: '/services'
  },
  {
    id: '04',
    tag: 'Managed IT Services',
    title: 'Managed Hardware & IT Infrastructure',
    desc: 'Comprehensive hardware diagnostics, performance repairs, software deployment, and dedicated IT assistance to keep your operations running 24/7.',
    image: '/images/3d/tech-processor-3d.jpg',
    imageAlt: 'High Performance Computer Hardware Processor and IT Diagnostics',
    icon: Wrench,
    highlights: ['Diagnostics & Repairs', 'OS & Cloud Migration', 'Fast Dedicated Support'],
    link: '/contact'
  }
];

export default function SpatialShowcase() {
  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.preTitle}>Our Capabilities</span>

          <h2 className={styles.mainHeading}>
            Everything you need to <br />
            <span className={styles.serifGradient}>build, launch &amp; scale.</span>
          </h2>

          <p className={styles.subHeading}>
            From lightning-fast digital platforms and iconic brand identity to precision marketing funnels and reliable IT infrastructure — all unified under one roof.
          </p>
        </div>

        {/* Minimal 2x2 Capabilities Grid */}
        <div className={styles.grid}>
          {CAPABILITIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article 
                key={item.id} 
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Visual Preview */}
                <div className={styles.mediaWrapper}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.mediaOverlay} />
                  
                  <div className={styles.tagBadge}>
                    <span className={styles.tagIndex}>{item.id}</span>
                    <span className={styles.tagText}>{item.tag}</span>
                  </div>

                  <div className={styles.iconBadge}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                </div>

                {/* Content Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>

                  {/* Highlights Chips */}
                  <div className={styles.chipsList}>
                    {item.highlights.map((chip, idx) => (
                      <span key={idx} className={styles.chip}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Card Footer Link */}
                  <div className={styles.cardFooter}>
                    <Link href={item.link} className={styles.cardLink}>
                      <span>Explore {item.tag}</span>
                      <ArrowRight size={16} className={styles.linkArrow} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Minimal User-Friendly Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.bottomText}>
            Looking for a tailored end-to-end package for your brand?
          </p>
          <Link href="/contact" className={styles.bottomBtn}>
            <span>Schedule a Discovery Call</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
