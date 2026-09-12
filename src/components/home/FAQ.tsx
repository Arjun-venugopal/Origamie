'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: React.ReactNode;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: (
      <>
        What digital marketing services <span>does Origamie offer?</span>
      </>
    ),
    answer: (
      <>
        Origamie provides end-to-end digital solutions designed to help businesses build, grow, and scale online. Our services include <strong>website development, SEO, social media marketing, paid advertising, branding, content creation, and performance marketing</strong>—all working together as one growth strategy.
      </>
    ),
  },
  {
    question: (
      <>
        How can Origamie help my business <span>generate more leads and sales?</span>
      </>
    ),
    answer: (
      <>
        We start by understanding your business, audience, and goals. Then we build a strategy that combines <strong>high-converting websites, targeted campaigns, compelling content, SEO, and performance marketing</strong> to attract the right audience and turn attention into measurable leads and customers.
      </>
    ),
  },
  {
    question: (
      <>
        How do you measure the success <span>of a digital marketing campaign?</span>
      </>
    ),
    answer: (
      <>
        We look beyond likes and impressions. We track the metrics that matter to your business—including <strong>reach, engagement, website traffic, leads, conversions, customer acquisition cost, and ROI</strong>. This allows us to understand what is working, continuously optimize campaigns, and focus your budget on what delivers results.
      </>
    ),
  },
  {
    question: (
      <>
        How do you make sure my website <span>converts visitors into customers?</span>
      </>
    ),
    answer: (
      <>
        A beautiful website is only the beginning. We combine <strong>strategic UX, clear messaging, strong calls-to-action, fast performance, mobile-first design, SEO, and conversion-focused user journeys</strong> to make it easier for visitors to take action—whether that&apos;s making an enquiry, booking a service, or making a purchase.
      </>
    ),
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
            Everything founders, marketing leads, and businesses want to know about scaling with Origamie.
          </p>

          <div className={styles.faqDirectHelp}>
            <span className={styles.helpHeading}>Have a custom question?</span>
            <p className={styles.helpDesc}>
              Chat with our team directly for transparent advice and strategy guidance.
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
