'use client';

import { useState } from 'react';
import styles from './about.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';
import PageLoader from '@/components/layout/PageLoader';

import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';

export default function AboutClientPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <SmoothScroll>
          <main className={styles.main}>
            <Navbar />
            <AboutHero />
            <AboutStory />
            <AboutValues />
            <GridFooter />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
