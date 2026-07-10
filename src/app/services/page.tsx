'use client';

import { useState } from 'react';
import styles from './services.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';
import PageLoader from '@/components/layout/PageLoader';

import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';

export default function ServicesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <SmoothScroll>
          <main className={styles.main}>
            <Navbar />
            <ServicesHero />
            <ServicesList />
            <GridFooter />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
