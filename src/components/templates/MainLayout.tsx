import { ReactNode } from 'react';
import Footer from '@/src/components/organisms/Footer';
import Header from '@/src/components/organisms/Header';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
    <img src="icons/kipu.webp" alt="" className='absolute z-100'/>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
