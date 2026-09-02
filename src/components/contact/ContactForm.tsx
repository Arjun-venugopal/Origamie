'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, User, MessageSquare, Sparkles, ArrowUpRight, Check, Clock } from 'lucide-react';
import styles from '@/app/contact/contact.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const projectTypes = [
  'Website Design',
  'Branding',
  'Web Development',
  'Growth & CRO'
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Website Design']);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const toggleProjectType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const targetPhone = '919074749774';
    const servicesText = selectedTypes.length > 0 ? selectedTypes.join(', ') : 'General Inquiry';
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    
    const rawMessage = `Hello Origamie! 👋\n\n*Name:* ${fullName}\n*Email:* ${formData.email}\n*Interested In:* ${servicesText}\n*Message:* ${formData.message}`;
    const encodedText = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    setTimeout(() => {
      setStatus('success');
      window.open(whatsappUrl, '_blank');
      setTimeout(() => setStatus('idle'), 3500);
    }, 600);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        
        {/* Contact Info Side */}
        <div className={styles.contactInfo}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUpVariant}
          >
            {/* Availability Badge */}
            <div className={styles.availabilityBadge}>
              <span className={styles.badgePulseDot} />
              <span>ACCEPTING NEW PROJECTS • Q3/Q4</span>
            </div>

            <p className={styles.sectionPreTitle}>
              Get In Touch
            </p>
            <h2 className={styles.sectionTitle}>
              Let&apos;s build something <span>extraordinary</span>
            </h2>
            <p className={styles.sectionSubDesc}>
              Have a project in mind or want to explore ideas? We reply to every message instantly via WhatsApp or within 24 hours via email.
            </p>

            {/* Glass Contact Cards */}
            <div className={styles.contactCardsWrapper}>
              <motion.a 
                href="mailto:hello@origamie.in" 
                className={styles.contactCard}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.contactCardIcon}>
                  <Mail size={22} />
                </div>
                <div className={styles.contactCardBody}>
                  <span className={styles.contactCardLabel}>Email Us Directly</span>
                  <span className={styles.contactCardValue}>hello@origamie.in</span>
                </div>
                <div className={styles.contactCardAction}>
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>

              <motion.a 
                href="https://wa.me/919074749774" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactCard}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.contactCardIcon}>
                  <Phone size={22} />
                </div>
                <div className={styles.contactCardBody}>
                  <span className={styles.contactCardLabel}>Chat on WhatsApp</span>
                  <span className={styles.contactCardValue}>+91 9074749774</span>
                </div>
                <div className={styles.contactCardAction}>
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            </div>

            {/* Studio Promises */}
            <div className={styles.studioPromiseBox}>
              <div className={styles.promiseItem}>
                <Clock size={16} className={styles.promiseIcon} />
                <span>Instant WhatsApp Connect</span>
              </div>
              <div className={styles.promiseItem}>
                <Sparkles size={16} className={styles.promiseIcon} />
                <span>Founder-Led Strategy</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Side */}
        <motion.div 
          className={styles.contactFormWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariant}
        >
          <div className={styles.formHeader}>
            <div className={styles.formTag}>
              <Sparkles size={14} />
              <span>DIRECT WHATSAPP INQUIRY</span>
            </div>
            <h3>Start a Conversation</h3>
            <p>Fill out the form below to send a direct WhatsApp message to our team.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Interactive Project Type Selector */}
            <div className={styles.formTypeSection}>
              <label className={styles.formTypeSectionLabel}>I&apos;m interested in:</label>
              <div className={styles.typeChipsWrapper}>
                {projectTypes.map(type => {
                  const isSelected = selectedTypes.includes(type);
                  return (
                    <button
                      type="button"
                      key={type}
                      className={`${styles.typeChip} ${isSelected ? styles.typeChipActive : ''}`}
                      onClick={() => toggleProjectType(type)}
                    >
                      {isSelected && <Check size={14} />}
                      <span>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <User className={styles.inputIcon} size={20} />
                <input 
                  type="text" 
                  id="firstName" 
                  required 
                  className={styles.formInput} 
                  placeholder=" " 
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
              </div>
              
              <div className={styles.formGroup}>
                <User className={styles.inputIcon} size={20} />
                <input 
                  type="text" 
                  id="lastName" 
                  required 
                  className={styles.formInput} 
                  placeholder=" " 
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <Mail className={styles.inputIcon} size={20} />
              <input 
                type="email" 
                id="email" 
                required 
                className={styles.formInput} 
                placeholder=" " 
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className={styles.formLabel}>Email Address</label>
            </div>

            <div className={styles.formGroup}>
              <MessageSquare className={styles.inputIcon} size={20} style={{ top: '24px', transform: 'none' }} />
              <textarea 
                id="message" 
                required 
                className={styles.formTextarea} 
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="message" className={styles.formLabel} style={{ top: '24px', transform: 'translateY(-50%)' }}>Tell us about your project &amp; goals...</label>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={status === 'submitting' || status === 'success'}
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.span key="idle" className={styles.btnContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span>Send Message on WhatsApp</span>
                    <ArrowUpRight size={20} />
                  </motion.span>
                )}
                {status === 'submitting' && (
                  <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Opening WhatsApp...
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Opening WhatsApp Chat! ✓
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
