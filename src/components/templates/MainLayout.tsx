import { ReactNode } from 'react';
import Header from '@/src/components/organisms/Header';
import Footer from '@/src/components/organisms/Footer';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
