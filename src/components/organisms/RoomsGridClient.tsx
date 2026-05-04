'use client';

import { getRoomById } from '@/src/api/backend/getRoomById';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';
import { useState } from 'react';
import RoomModal from './RoomModal';
import { formatListText } from '@/src/utils/formatListText';
import ListText from '../ListText';

interface Props {
  rooms: RoomItem[];
  locale: string;
}

export default function RoomsGridClient({ rooms, locale }: Props) {
  const [roomSelected, setRoomSelected] = useState<RoomItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  console.log(rooms);

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
      <div className="space-y-12">
        {rooms.map((item) => {
          const currentIndex = currentImageIndex[item.habitacion.id] || 0;
          const images = item.habitacion.url_imagen || [];
          const hasMultipleImages = images.length > 1;

          const amenities = formatListText(item.habitacion.amenities);
          const features = formatListText(item.habitacion.feature);

          return (
            <div key={item.habitacion.id} className="relative">
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-[44%] relative">
                  <div className="relative aspect-4/3">
                    {images.length > 0 ? (
                      <img
                        src={images[currentIndex]}
                        alt={item.habitacion.tipo_habitacion.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-[56%]  p-6 shadow bg-neutral-600">
                  {/* Title */}
                  <h2 className="text-[40px] font-light tracking-[0.3em] mb-8">
                    {item.habitacion.tipo_habitacion.nombre}
                  </h2>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3 mb-10">
                    <ListText items={amenities} />
                    <ListText items={features} />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 pt-10">
                    {/* Rate Info */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex-1">
                        <p className="text-[13px] text-gray-600 leading-relaxed mb-4 max-w-md whitespace-pre-line">
                          {item.habitacion.descripcion}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right ml-8">
                        <p className="text-[10px] text-gray-500 mb-0.5">Total for 1 night</p>
                        <p className="text-[10px] text-gray-500 mb-3">Including Taxes</p>
                        <p className="text-[44px] font-light leading-none">
                          {item.tarifa.moneda}
                          {item.tarifa.precio}
                        </p>
                      </div>
                    </div>

                    {/* Reserve Button */}
                    <button className="bg-black text-white px-20 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-gray-800 transition-colors">
                      RESERVE NOW
                    </button>
                  </div>
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
