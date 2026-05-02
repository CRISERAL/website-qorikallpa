import { cn } from '@/src/lib/cn';
import { Children, ReactNode } from 'react';

interface Props {
  url: string;
  className?: string;
  children?: ReactNode;
}

export default function PolaroidV2({ url, className, children }: Props) {
  return (
    <div
      className={cn(
        'bg-white shadow-md transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative',
        className
      )}
      style={{ padding: '6px 6px 28px 6px' }}
    >
      <div className="aspect-square overflow-hidden bg-cream-200">
        <img src={url} className="w-full h-full object-cover" />
      </div>
      <div>{children}</div>
    </div>
  );
}
