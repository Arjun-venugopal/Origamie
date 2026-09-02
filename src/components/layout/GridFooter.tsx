'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Sparkles, MapPin, Clock, Send, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './layout.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  })
};

const projectServices = [
  'Web Development',
  'Brand Identity',
  'UI/UX Design',
  'Growth & CRO'
];

export default function GridFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState('Web Development');
  const [timeString, setTimeString] = useState('');

  // Live IST Time
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTimeString(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.7, 1]);

  return (
    <div className={styles.footerWrapper}>
      <footer id="contact" className={styles.gridFooter} ref={footerRef}>
        
        {/* Marquee Ticker Strip */}
        <div className={styles.footerMarqueeTrack}>
          <motion.div
            className={styles.footerMarqueeContent}
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          >
            <span>✦ ACCEPTING NEW PROJECTS • Q3/Q4</span>
            <span>✦ AWARD-WINNING WEB ENGINEERING</span>
            <span>✦ 2–4X LEAD CONVERSION GUARANTEE</span>
            <span>✦ FIXED 24H QUOTE</span>
            <span>✦ ACCEPTING NEW PROJECTS • Q3/Q4</span>
            <span>✦ AWARD-WINNING WEB ENGINEERING</span>
            <span>✦ 2–4X LEAD CONVERSION GUARANTEE</span>
            <span>✦ FIXED 24H QUOTE</span>
          </motion.div>
        </div>

        {/* Ambient Aurora Glow */}
        <div className={styles.auroraContainer}>
          <div className={styles.auroraBlob1} />
          <div className={styles.auroraBlob2} />
        </div>

        {/* Main Content Area */}
        <motion.div
          className={styles.footerMainGrid}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Left Column: Brand Statement & Contact Info */}
          <div className={styles.footerLeftCol}>
            <motion.div
              className={styles.footerLiveTag}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <span className={styles.badgePulseDot} />
              <span>KERALA, INDIA &bull; {timeString || '19:26 IST'}</span>
            </motion.div>

            <motion.h2
              className={styles.footerHugeHeadline}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              Let&apos;s unfold your <br />
              <span className={styles.italicSerifGradient}>next masterpiece.</span>
            </motion.h2>

            <motion.p
              className={styles.footerBioText}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              Have a project in mind or want to elevate your current digital experience? We team up with ambitious brands to build websites that convert visitors into loyal clients.
            </motion.p>

            {/* Direct Contact Cards */}
            <motion.div
              className={styles.footerDirectContactCards}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={3}
            >
              <a href="mailto:hello@origamie.in" className={styles.footerContactCard}>
                <div className={styles.contactCardText}>
                  <span className={styles.contactCardSub}>Email Us</span>
                  <span className={styles.contactCardMain}>hello@origamie.in</span>
                </div>
                <ArrowUpRight size={18} className={styles.cardArrow} />
              </a>

              <a
                href="https://wa.me/919544639774"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerContactCard}
              >
                <div className={styles.contactCardText}>
                  <span className={styles.contactCardSub}>Instant WhatsApp</span>
                  <span className={styles.contactCardMain}>+91 9074749774</span>
                </div>
                <MessageCircle size={18} className={styles.cardArrow} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Quick Dispatch Box */}
          <motion.div
            className={styles.footerDispatchCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <div className={styles.dispatchHeader}>
              <Sparkles size={16} className={styles.dispatchIcon} />
              <span>START A PROJECT</span>
            </div>

            <h3 className={styles.dispatchTitle}>What are you looking to build?</h3>

            <div className={styles.servicePillGroup}>
              {projectServices.map(service => {
                const isSelected = selectedService === service;
                return (
                  <button
                    key={service}
                    type="button"
                    className={`${styles.servicePill} ${isSelected ? styles.servicePillActive : ''}`}
                    onClick={() => setSelectedService(service)}
                  >
                    {isSelected && <Check size={14} />}
                    <span>{service}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.dispatchCtaBox}>
              <p className={styles.dispatchNote}>
                Ready to talk about <strong>{selectedService}</strong>? Book a 20-min strategy call or chat on WhatsApp.
              </p>

              <div className={styles.dispatchBtnGroup}>
                <a href="/contact" className={styles.dispatchPrimaryBtn}>
                  <span>Book Strategy Call</span>
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href={`https://wa.me/919074749774?text=${encodeURIComponent(`Hi Origamie! I want to discuss a ${selectedService} project.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.dispatchSecondaryBtn}
                >
                  <MessageCircle size={18} />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Navigation Columns */}
        <div className={styles.footerNavGrid}>
          <div className={styles.footerBrandCol}>
            <div className={styles.brandLogoRow}>
              <Image
                src="/crane-logo.png"
                alt="Origamie Crane"
                width={36}
                height={36}
                className={styles.footerCraneLogo}
              />
              <span className={styles.brandTitle}>Origam<span style={{ color: '#5773FF' }}>ie</span></span>
            </div>
            <p className={styles.brandSubText}>
              Boutique digital studio crafting high-conversion Webflow &amp; Next.js platforms.
            </p>
          </div>

          <div className={styles.footerLinkCol}>
            <h4>Navigation</h4>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/works">Selected Works</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.footerLinkCol}>
            <h4>Services</h4>
            <span>Web Applications</span>
            <span>Brand Engineering</span>
            <span>E-Commerce Platforms</span>
            <span>CRO &amp; Conversion</span>
          </div>

          <div className={styles.footerLinkCol}>
            <h4>Connect</h4>
            <a href="mailto:hello@origamie.in">hello@origamie.in</a>
            <a href="https://wa.me/919074749774" target="_blank" rel="noopener noreferrer">+91 9074749774</a>
            <span>Kerala, India</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottomBar}>
          <span className={styles.copyrightText}>
            © {new Date().getFullYear()} Origamie. All rights reserved.
          </span>
          <span className={styles.craftedText}>
            Crafted for maximum conversion &amp; impact.
          </span>
        </div>

      </footer>
    </div>
  );
}
