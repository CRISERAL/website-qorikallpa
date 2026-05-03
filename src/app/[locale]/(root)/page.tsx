import Hero from './components/Hero';
import Features from './components/Features';
import Banner from './components/Banner';
import About from './components/About';
import MainLayout from '@/src/components/templates/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <Banner />
      <About />
    </MainLayout>
  );
}
