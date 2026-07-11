'use client';

import styles from './page.module.css';
import Navbar from '@/components/layout/Navbar';
import {
  Hero,
  Pills,
  Vision,
  CraneScrollAnimation,
  Process,
  FAQ
} from '@/components/home';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';

export default function Home() {
  return (
    <div className="page-wrapper">
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
    </div>
  );
}
