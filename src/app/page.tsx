import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Pills from '@/components/Pills';
import Vision from '@/components/Vision';
import GridFooter from '@/components/GridFooter';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Pills />
      <Vision />
      <GridFooter />
    </main>
  );
}
