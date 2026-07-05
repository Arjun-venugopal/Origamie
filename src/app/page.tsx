'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pills from '@/components/Pills';
import Vision from '@/components/Vision';
import CraneScrollAnimation from '@/components/CraneScrollAnimation';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import GridFooter from '@/components/GridFooter';
import SmoothScroll from '@/components/SmoothScroll';
import PageLoader from '@/components/PageLoader';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <SmoothScroll>
          <main className={styles.main}>
            <Navbar />
            <Hero />
            <Pills />
            <Vision />
            <CraneScrollAnimation />
            <Process />
            <FAQ />
            <GridFooter />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
