'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, User, MessageSquare } from 'lucide-react';
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
                <a href="tel:+1234567890" className={styles.contactMethodValue}>+91 9544639774</a>
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
          <div className={styles.formHeader}>
            <h3>Send a Message</h3>
            <p>Fill out the form below and we&apos;ll get back to you shortly.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <User className={styles.inputIcon} size={20} />
                <input type="text" id="firstName" required className={styles.formInput} placeholder=" " />
                <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
              </div>
              
              <div className={styles.formGroup}>
                <User className={styles.inputIcon} size={20} />
                <input type="text" id="lastName" required className={styles.formInput} placeholder=" " />
                <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input type="email" id="email" required className={styles.formInput} placeholder=" " />
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
            </div>

            <div className={styles.formGroup}>
              <MessageSquare className={styles.inputIcon} size={20} style={{ top: '24px', transform: 'none' }} />
              <textarea id="message" required className={styles.formTextarea} placeholder=" "></textarea>
              <label htmlFor="message" className={styles.formLabel} style={{ top: '24px', transform: 'translateY(-50%)' }}>How can we help?</label>
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
