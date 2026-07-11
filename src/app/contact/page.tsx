'use client';

import styles from './contact.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';

import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <SmoothScroll>
        <main className={styles.main}>
          <Navbar />
          <ContactHero />
          <ContactForm />
          <GridFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
