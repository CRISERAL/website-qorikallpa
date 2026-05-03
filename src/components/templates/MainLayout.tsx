import { ReactNode } from 'react';
import Footer from '@/src/components/organisms/Footer';
import Header from '@/src/components/organisms/Header';
import { cn } from '@/src/lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function MainLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        'relative min-h-screen overflow-x-hidden bg-neutral-500 text-tertiary-500 text-base md:text-lg',
        className
      )}
    >
      <Header />
      <main>
        <div className="absolute left-0 top-0 h-screen w-auto z-100 hidden 2xl:block pointer-events-none">
          <img
            src="/icons/kipu.webp"
            alt="Kipu decorativo andino"
            className="h-full w-auto object-contain"
          />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}
