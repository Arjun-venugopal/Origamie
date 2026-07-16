'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: React.ReactNode;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: (
      <>
        You&apos;re a new studio — <span>why work with Origame?</span>
      </>
    ),
    answer: "Because you get senior, founder-led craft without the layered agency overhead. We take on a small number of projects, obsess over every detail, and price transparently. As one of our first clients you also get founding-partner pricing.",
  },
  {
    question: <>Can I see past client work?</>,
    answer: "Absolutely. During our initial strategy call, we'll walk you through case studies, live production websites, and Figma files that align with your industry and design goals.",
  },
  {
    question: <>How much does a project cost?</>,
    answer: "Our projects typically start at a flat rate of $5,000 depending on the design scope, interactivity, and custom integrations. We provide an exact, fixed quote within 24 hours of our strategy call.",
  },
  {
    question: <>How long until my site is live?</>,
    answer: "Most marketing sites go live in 2 to 6 weeks. Discover & strategy takes 1 week, design takes 1–2 weeks, and Webflow/custom development is completed in another 2-3 weeks.",
  },
  {
    question: <>What if I don&apos;t love the design?</>,
    answer: "We offer weekly demos and live Figma access, meaning you are aligned at every single step. We design collaboratively and iterate on the layout until you are absolutely thrilled with it.",
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
          <div className={styles.faqPreTitle}>FAQ</div>
          <h2 className={styles.faqTitle}>
            Answers before <span>you ask.</span>
          </h2>
          <p className={styles.faqSubtitle}>
            Everything founders and marketing leads want to know before booking a call.
          </p>
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
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
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
