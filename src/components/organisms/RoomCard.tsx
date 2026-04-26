import environment from '@/src/environment';
import { cn } from '@/src/lib/cn';
import { Room } from '@/src/types/collection-types/room';

interface Props {
  data: Room;
  className: string;
}

export default function RoomCard({ data, className }: Props) {
  const imageUrl = data.images?.[0]?.url
    ? `${environment.strapi.apiEndpoint}${data.images[0].url}`
    : '/placeholder-room.png';

  const url = `${environment.strapi.apiEndpoint}`;
  return (
    <div
      className={cn(
        'flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative',
        className
      )}
    >
      <div className="p-2 pb-0 bg-card">
        <div className="aspect-square overflow-hidden relative">
          <img src={imageUrl} alt={data.name} className="w-full h-full object-cover" />
          <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-1.5 py-0.5 leading-none">
            S/{data.price}
          </div>
        </div>
        <div className="py-2 px-1 text-center">
          <p className="text-xs font-semibold truncate text-stone-600">{data.name}</p>
          <p className="text-xs uppercase tracking-widest mt-0.5 ">{data.type}</p>
        </div>
      </div>
    </div>
  );
}
