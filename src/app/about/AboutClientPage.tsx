'use client';

import styles from './about.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';

import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutValues from '@/components/about/AboutValues';

export default function AboutClientPage() {
  return (
    <>
      <SmoothScroll>
        <main className={styles.main}>
          <Navbar />
          <AboutHero />
          <AboutStory />
          <AboutValues />
          <GridFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
