'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './layout.module.css';

const textReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function GridFooter() {
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);

  return (
    <div className={styles.footerWrapper}>
      <footer id="contact" className={styles.gridFooter} ref={footerRef}>
        
        {/* Background Aurora Orbs & Giant Watermark */}
        <div className={styles.auroraContainer}>
          <div className={styles.auroraBlob1} />
          <div className={styles.auroraBlob2} />
          <div className={styles.auroraBlob3} />
        </div>

        <div className={styles.footerWatermark}>
          ORIGAMIE
        </div>

        {/* Curved Wave Layers */}
        <div className={styles.footerWaveLayers}>
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,150 C360,280 720,100 1080,240 C1260,310 1380,240 1440,200 L1440,400 L0,400 Z"
              fill="#5773FF"
              opacity="0.08"
            />
            <path
              d="M0,220 C480,90 960,320 1440,160 L1440,400 L0,400 Z"
              fill="#051D96"
              opacity="0.12"
            />
          </svg>
        </div>

        {/* Main Footer Body */}
        <motion.div
          className={styles.footerContent}
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Studio Availability Tag */}
          <motion.div
            className={styles.footerStatusBadge}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={0}
          >
            <span className={styles.badgePulseDot} />
            <span>ACCEPTING NEW PROJECTS • Q3/Q4</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className={styles.footerTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={1}
          >
            Let&apos;s build something <br />
            <span className={styles.footerTitleGradient}>that pays for itself.</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className={styles.footerSubtitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={2}
          >
            Book a free 20-minute strategy session. You&apos;ll leave with 3 concrete conversion ideas you can ship this week &mdash; even if we never work together.
          </motion.p>

          {/* Action Row */}
          <motion.div
            className={styles.footerCtaGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={3}
          >
            <motion.a
              href="/contact"
              className={styles.footerPrimaryBtn}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Book a strategy call</span>
              <ArrowUpRight size={18} />
            </motion.a>

            <motion.a
              href="https://wa.me/919544639774"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerWhatsappBtn}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </motion.div>

          {/* Studio Guarantee Badges */}
          <motion.div
            className={styles.footerGuaranteeStrip}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={textReveal}
            custom={4}
          >
            <div className={styles.guaranteeItem}>
              <Zap size={15} />
              <span>Fixed Quote in 24h</span>
            </div>
            <span className={styles.guaranteeDot}>•</span>
            <div className={styles.guaranteeItem}>
              <ShieldCheck size={15} />
              <span>100% Fixed Guarantee</span>
            </div>
            <span className={styles.guaranteeDot}>•</span>
            <div className={styles.guaranteeItem}>
              <Sparkles size={15} />
              <span>Direct Founder Access</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className={styles.footerBottomBar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textReveal}
          custom={5}
        >
          <div className={styles.footerBrandCol}>
            <Image
              src="/crane-logo.png"
              alt="Origamie crane logo"
              width={28}
              height={28}
              className={styles.footerBottomLogoIcon}
            />
            <span className={styles.footerCopyright}>
              © {new Date().getFullYear()} Origamie Studio. All rights reserved.
            </span>
          </div>

          <div className={styles.footerBottomLinks}>
            <Link href="/">Home</Link>
            <Link href="/works">Work</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className={styles.footerSocials}>
            <a href="mailto:hello@origamie.in" className={styles.footerSocialLink} aria-label="Email">
              hello@origamie.in
            </a>
          </div>
        </motion.div>

      </footer>
    </div>
  );
}
