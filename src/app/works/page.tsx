'use client';

import styles from './works.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';

import WorksHero from '@/components/works/WorksHero';
import WorksGrid from '@/components/works/WorksGrid';

export default function WorksPage() {
  return (
    <>
      <SmoothScroll>
        <main className={styles.main}>
          <Navbar />
          <WorksHero />
          <WorksGrid />
          <GridFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
