import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pills from '@/components/Pills';
import Vision from '@/components/Vision';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import GridFooter from '@/components/GridFooter';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Pills />
      <Vision />
      <Process />
      <FAQ />
      <GridFooter />
    </main>
  );
}
