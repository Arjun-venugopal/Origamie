'use client';

import styles from './services.module.css';
import Navbar from '@/components/layout/Navbar';
import GridFooter from '@/components/layout/GridFooter';
import SmoothScroll from '@/components/layout/SmoothScroll';

import ServicesHero from '@/components/services/ServicesHero';
import ServicesList from '@/components/services/ServicesList';

export default function ServicesPage() {
  return (
    <>
      <SmoothScroll>
        <main className={styles.main}>
          <Navbar />
          <ServicesHero />
          <ServicesList />
          <GridFooter />
        </main>
      </SmoothScroll>
    </>
  );
}
