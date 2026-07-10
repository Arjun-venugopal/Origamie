import type { Metadata } from 'next';
import AboutClientPage from './AboutClientPage';

export const metadata: Metadata = {
  title: 'About Us | Origamie — Creative Studio',
  description: 'Learn about the team, story, and values of Origamie. We build conversion-first websites and digital products that pay for themselves.',
};

export default function AboutPage() {
  return <AboutClientPage />;
}
