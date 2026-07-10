'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from '@/app/contact/contact.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        
        {/* Contact Info Side */}
        <div className={styles.contactInfo}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <p className={styles.sectionPreTitle}>
              Get In Touch
            </p>
            <h2 className={styles.sectionTitle} style={{ marginBottom: '48px' }}>
              We&apos;d love to hear <span>from you</span>
            </h2>

            <div className={styles.contactMethod}>
              <div className={styles.contactMethodIcon}>
                <Mail size={24} />
              </div>
              <div>
                <h4 className={styles.contactMethodTitle}>Email Us</h4>
                <a href="mailto:hello@origamie.co" className={styles.contactMethodValue}>hello@origamie.co</a>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <div className={styles.contactMethodIcon}>
                <Phone size={24} />
              </div>
              <div>
                <h4 className={styles.contactMethodTitle}>Call Us</h4>
                <a href="tel:+1234567890" className={styles.contactMethodValue}>+1 (234) 567-890</a>
              </div>
            </div>

            <div className={styles.contactMethod}>
              <div className={styles.contactMethodIcon}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 className={styles.contactMethodTitle}>Visit Us</h4>
                <span className={styles.contactMethodValue}>123 Digital Ave, Tech District<br/>New York, NY 10001</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Side */}
        <motion.div 
          className={styles.contactFormWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Your Name</label>
              <input type="text" id="name" required className={styles.formInput} placeholder="John Doe" />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
              <input type="email" id="email" required className={styles.formInput} placeholder="john@example.com" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>How can we help?</label>
              <textarea id="message" required className={styles.formTextarea} placeholder="Tell us about your project..."></textarea>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={status === 'submitting' || status === 'success'}
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Send Message
                  </motion.span>
                )}
                {status === 'submitting' && (
                  <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Sending...
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Message Sent! ✓
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
