'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: React.ReactNode;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: (
      <>
        What services does Origamie <span>provide under one roof?</span>
      </>
    ),
    answer: "Origamie is a full-spectrum digital studio operating across four core disciplines: Next-Gen Web & Mobile App Engineering (Next.js 16, React 19, iOS, Android), Editorial Brand Identity & 3D Motion Graphics, Performance Growth Marketing (Google & Meta Ads, Technical SEO), and Managed IT & Hardware Support. You work with one cohesive senior team without managing four separate disconnected agencies.",
  },
  {
    question: (
      <>
        How do you ensure our website <span>actually drives revenue?</span>
      </>
    ),
    answer: "We don't build generic digital brochures. Every project begins with an in-depth audit of your customer acquisition funnel, user journeys, and commercial KPIs. We pair editorial visual prestige with conversion science — sub-50ms TTFB speeds, frictionless user funnels, mobile-first responsiveness, and structured SEO architectures designed to turn passive visitors into qualified pipeline.",
  },
  {
    question: <>What does a typical project timeline look like?</>,
    answer: "Most custom web platforms and brand experiences launch within 3 to 6 weeks. Our sprint framework is engineered for momentum: Week 1 is dedicated to UX wireframing and technical architecture; Weeks 2–3 focus on high-fidelity design systems and 3D visual direction; Weeks 4–5 cover full-stack engineering and custom integrations; and the final sprint is dedicated to rigorous QA, speed audits, and deployment.",
  },
  {
    question: <>How does your pricing work, and do you offer fixed quotes?</>,
    answer: "Yes, 100% transparent and fixed. We never bill ambiguous hourly rates or surprise you with unexpected scope creep. Following an initial 20-minute discovery call, we deliver an exact, fixed-scope proposal detailing every milestone, deliverable, and timeline. You know the exact investment before any work begins.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.faqContainer}>
        {/* Left header column */}
        <div className={styles.faqLeft}>
          <div className={styles.faqPreTitle}>Frequently Asked Questions</div>
          <h2 className={styles.faqTitle}>
            Answers before <br />
            <span>you ask.</span>
          </h2>
          <p className={styles.faqSubtitle}>
            Everything founders, marketing leads, and technical teams want to know about partnering with Origamie.
          </p>

          <div className={styles.faqDirectHelp}>
            <span className={styles.helpHeading}>Have a custom question?</span>
            <p className={styles.helpDesc}>
              Chat with our technical founders directly for quick answers and transparent guidance.
            </p>
            <a
              href="https://wa.me/919074749774?text=Hi%20Origamie!%20I%20have%20a%20question%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.helpActionBtn}
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Right accordion list */}
        <div className={styles.faqRight}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className={styles.faqItem}>
                <button
                  className={styles.faqQuestionBtn}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.faqQuestionText}>{faq.question}</span>
                  <motion.span 
                    className={styles.faqIconWrapper}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <Plus size={24} strokeWidth={1.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className={styles.faqAnswerContainer}
                    >
                      <p className={styles.faqAnswerText}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
