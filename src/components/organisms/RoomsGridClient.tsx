'use client';

import { getRoomById } from '@/src/api/backend/getRoomById';
import { cn } from '@/src/lib/cn';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';
import { useState } from 'react';
import RoomModal from './RoomModal';

interface Props {
  rooms: RoomItem[];
  locale: string;
}

export default function RoomsGridClient({ rooms, locale }: Props) {
  const [roomSelected, setRoomSelected] = useState<RoomItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenRoom = async (id: string) => {
    try {
      setIsOpen(true);
      setLoading(true);
      setRoomSelected(null);

      const res: ApiResponse<RoomItem> = await getRoomById(id, locale);
      if (res.success && res.data) {
        setRoomSelected(res.data);
      }
    } catch (error) {
      console.error('Error al obtener la habitación:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setRoomSelected(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map((item, i) => {
          const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];
          const rotate = rotations[i % rotations.length];
          return (
            <div
              key={item.habitacion.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOpenRoom(item.habitacion.id)}
              className={cn(
                'flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative shadow',
                rotate
              )}
            >
              <div className="p-2 pb-0 bg-card">
                <div className="aspect-square overflow-hidden relative">
                  {item.habitacion.url_imagen && item.habitacion.url_imagen.length > 0 && (
                    <img
                      src={item.habitacion.url_imagen[0]}
                      alt={`Habitación ${item.habitacion.nro_habitacion}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {item.tarifa && (
                    <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-1.5 py-0.5 leading-none bg-accent-600">
                      S/{item.tarifa.precio}
                    </div>
                  )}
                </div>
                <div className="py-2 px-1 text-center">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">
                    {item.habitacion.tipo_habitacion.nombre}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <RoomModal open={isOpen} loading={loading} room={roomSelected} onClose={handleCloseModal} />
    </>
  );
}
