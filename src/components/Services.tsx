'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/app/page.module.css';

const services = [
  {
    id: 1,
    title: 'Brand Identity',
    description: 'We specialize in crafting unique brand identities that resonate with audiences. Our expertise lies in understanding the essence of your brand and translating it into compelling visuals and narratives.',
    tags: ['Graphic Design', 'Brand Name', 'Logo Design', 'Package Design', 'Typography', 'Color Scheme', 'Voice and Tone'],
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'We design intuitive, pixel-perfect interfaces that delight users and drive engagement. From wireframes to high-fidelity prototypes, we bring your product vision to life.',
    tags: ['User Research', 'Wireframing', 'Prototyping', 'Interaction Design', 'Design Systems', 'Usability Testing'],
  },
  {
    id: 3,
    title: 'Development',
    description: 'We build performant, scalable web applications using modern technologies. From Next.js to full-stack solutions, we turn designs into production-ready code.',
    tags: ['Frontend', 'Backend', 'React / Next.js', 'API Design', 'CMS Integration', 'Performance'],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function Services() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="services" className={styles.services}>
      <motion.h2
        className={`${styles.sectionTitle} ${styles.textGradient}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        Our Services
      </motion.h2>

      <motion.div
        className={styles.servicesTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={styles.sectionLabel}>SERVICE — 02</div>
        <p className={styles.servicesSubtitle}>An agency that brings passion <em style={{ fontStyle: 'italic' }}>into</em> every project.</p>
      </motion.div>

      <div className={styles.servicesContent}>
        <div className={styles.servicesList}>
          {services.map((service, index) => (
            <React.Fragment key={service.id}>
              <motion.div
                className={styles.serviceItem}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === index}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpenIndex(openIndex === index ? -1 : index); }}
              >
                <div className={styles.serviceItemLeft}>
                  <span>0{service.id}.</span> {service.title}
                </div>
                <div className={styles.serviceToggle} style={{ transform: openIndex === index ? 'rotate(0deg)' : 'rotate(0deg)' }}>
                  {openIndex === index ? '−' : '+'}
                </div>
              </motion.div>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    className={styles.serviceDetails}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }}
                  >
                    <div className={styles.serviceDetailsInner}>
                      {service.description}
                      <div className={styles.serviceTags}>
                        {service.tags.map(tag => (
                          <span key={tag} className={styles.serviceTag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </div>

        <motion.div
          className={styles.servicesImage}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Image
            src="https://images.unsplash.com/photo-1597484661643-2f5fef640df1?q=80&w=2000&auto=format&fit=crop"
            alt="Tote bag showcasing brand identity design"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
