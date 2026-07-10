'use client';

import { useState } from 'react';
import styles from './works.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';
import PageLoader from '@/components/layout/PageLoader';

import WorksHero from '@/components/works/WorksHero';
import WorksGrid from '@/components/works/WorksGrid';

export default function WorksPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PageLoader onComplete={() => setIsLoaded(true)} />
      
      {isLoaded && (
        <SmoothScroll>
          <main className={styles.main}>
            <Navbar />
            <WorksHero />
            <WorksGrid />
            <GridFooter />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
