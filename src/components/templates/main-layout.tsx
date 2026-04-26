import { ReactNode } from 'react';
import Header from '@/src/components/organisms/header';

interface Props {
    children: ReactNode;
}

export default function MainLayout({ children }: Props) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
        </div>
    )
}