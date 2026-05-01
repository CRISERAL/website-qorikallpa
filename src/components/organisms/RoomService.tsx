import env from '@/src/environment';
import { cn } from '@/src/lib/cn';
import { Service } from '@/src/types/collection-types/service';

interface Props {
  data: Service;
  className: string;
}

export default function RoomService({ data, className }: Props) {
  const imageUrl = data.image.url ? `${env.strapi.api}${data.image.url}` : '/placeholder-room.png';
  return (
    <div
      className={cn(
        'flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative shadow',
        className
      )}
    >
      <div className="p-2 pb-4 bg-card">
        <div className="aspect-square overflow-hidden relative">
          <img src={imageUrl} alt={data.title} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
