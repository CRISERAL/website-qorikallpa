import { cn } from '@/src/lib/cn';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return <div className={cn('max-w-7xl mx-auto px-6 lg:px-8', className)}>{children}</div>;
}
