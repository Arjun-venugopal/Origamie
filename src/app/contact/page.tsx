'use client';

import { useState } from 'react';
import styles from './contact.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';
import PageLoader from '@/components/layout/PageLoader';

import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <SmoothScroll>
          <main className={styles.main}>
            <Navbar />
            <ContactHero />
            <ContactForm />
            <GridFooter />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
