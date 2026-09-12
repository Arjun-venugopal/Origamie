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
    title: 'High-Performance Web & Mobile Apps',
    desc: 'From custom Next.js web platforms to cross-platform mobile apps. Engineered for sub-second page loads, conversion velocity, and effortless scaling.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Modern Web and App Development Engineering',
    icon: Globe,
    highlights: ['Next.js 16 & React 19', 'iOS & Android Apps', 'Sub-Second Speed'],
    link: '/services'
  },
  {
    id: '02',
    tag: 'Design & Motion',
    title: 'Editorial Branding & Motion Graphics',
    desc: 'Distinctive visual identities, social media design systems, and animated motion ads crafted to capture attention and elevate your brand authority.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Geometric Design and Kinetic Motion Art',
    icon: PenTool,
    highlights: ['Brand Identity', 'Motion Ad Creatives', 'Social Media Design'],
    link: '/services'
  },
  {
    id: '03',
    tag: 'Growth Marketing',
    title: 'Precision Ads & Search Engine Growth',
    desc: 'Data-driven paid ad campaigns across Meta and Google, paired with technical SEO to convert high-intent searches into predictable inbound revenue.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Digital Marketing Performance and Data Analytics',
    icon: Megaphone,
    highlights: ['Google & Meta Ads', 'Technical SEO', 'Lead Funnel CRO'],
    link: '/services'
  },
  {
    id: '04',
    tag: 'Managed IT Services',
    title: 'Computer Maintenance & Technical Support',
    desc: 'Reliable hardware diagnostics, computer repairs, software configuration, and on-call technical assistance to keep your business operating without disruption.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Enterprise Computer Maintenance and Hardware Diagnostics',
    icon: Wrench,
    highlights: ['Hardware Repairs', 'Software & OS Setup', 'On-Demand Support'],
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
            Capabilities engineered for <br />
            <span className={styles.serifGradient}>modern digital growth.</span>
          </h2>

          <p className={styles.subHeading}>
            Full-spectrum digital services from initial architecture to ongoing marketing and technical infrastructure.
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
            Need a custom combination of creative, engineering, and marketing?
          </p>
          <Link href="/contact" className={styles.bottomBtn}>
            <span>Talk to our team</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
