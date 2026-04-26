import { cn } from '@/src/lib/cn';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return <div className={cn('', className)}>{children}</div>;
}
