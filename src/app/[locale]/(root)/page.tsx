import Hero from './components/Hero';
import Features from './components/Features';
import Banner from './components/Banner';
import About from './components/About';

export default function Home() {
  return (
    <>
      <div className="absolute left-0 top-0 h-screen w-auto z-100 hidden 2xl:block pointer-events-none">
        <img
          src="/icons/kipu.webp"
          alt="Kipu decorativo andino"
          className="h-full w-auto object-contain"
        />
      </div>
      <Hero />
      <Features />
      <Banner />
      <About />
    </>
  );
}
