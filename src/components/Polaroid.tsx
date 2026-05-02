import { cn } from '../lib/cn';
import { StrapiImage } from '../types/StrapiImage';

interface Props {
  photo: string;
  rotation?: string;
}

export default function Polaroid({ photo, rotation }: Props) {
  return (
    <div
      className={cn(
        'flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative shadow',
        rotation
      )}
    >
      <div className="p-2 pb-0 bg-card">
        <div className="aspect-square overflow-hidden relative">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
