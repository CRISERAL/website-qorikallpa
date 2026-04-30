import { ReactNode } from 'react';
import Footer from '@/src/components/organisms/Footer';
import Header from '@/src/components/organisms/Header';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
