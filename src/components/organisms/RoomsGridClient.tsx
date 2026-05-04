'use client';

import { getRoomById } from '@/src/api/backend/getRoomById';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';
import { useState } from 'react';
import RoomModal from './RoomModal';
import { formatListText } from '@/src/utils/formatListText';

interface Props {
  rooms: RoomItem[];
  locale: string;
}

export default function RoomsGridClient({ rooms, locale }: Props) {
  const [roomSelected, setRoomSelected] = useState<RoomItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((item) => {
          const currentIndex = currentImageIndex[item.habitacion.id] || 0;
          const images = item.habitacion.url_imagen || [];
          const hasMultipleImages = images.length > 1;

          const amenities = formatListText(item.habitacion.amenities);
          const features = formatListText(item.habitacion.feature);
          const allItems = [...amenities, ...features];

          return (
            <div
              key={item.habitacion.id}
              className="group flex flex-col bg-cream-50 shadow-md hover:shadow-xl transition-all duration-300"
              style={{ padding: '6px 6px 24px 6px' }}
            >
              {/* Image Section - Polaroid style */}
              <div className="relative aspect-square overflow-hidden bg-brown-100">
                {images.length > 0 ? (
                  <img
                    src={images[currentIndex]}
                    alt={item.habitacion.tipo_habitacion.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-cream-200">
                    <span className="text-brown-700/50">No image</span>
                  </div>
                )}

                {/* Room Number badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-[10px] font-bold text-brown-900 tracking-[0.15em] uppercase">
                    N° {item.habitacion.nro_habitacion}
                  </span>
                </div>

                {/* Image navigation dots */}
                {hasMultipleImages && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => ({ ...prev, [item.habitacion.id]: idx }));
                        }}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === currentIndex ? 'bg-brown-900 w-4' : 'bg-brown-700/40'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Price badge */}
                <div className="absolute bottom-3 right-3 bg-gold-500 text-white px-3 py-1.5">
                  <span className="text-sm font-bold font-playfair">
                    {item.tarifa.moneda}
                    {item.tarifa.precio}
                  </span>
                  <span className="text-[10px] opacity-80 ml-1">/night</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 px-3 pt-4">
                {/* Title */}
                <h3 className="font-playfair text-xl font-bold text-brown-900 leading-snug mb-2">
                  {item.habitacion.tipo_habitacion.nombre}
                </h3>

                {/* Floor info */}
                <p className="text-xs text-brown-700/60 mb-3 tracking-[0.1em] uppercase">
                  Floor {item.habitacion.piso}
                </p>

                {/* Description */}
                <p className="text-xs font-lato text-brown-800/70 leading-relaxed mb-4 line-clamp-2">
                  {item.habitacion.descripcion || 'Beautiful room with all amenities'}
                </p>

                {/* Amenities Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                  {allItems.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-1 bg-brown-100 text-brown-800 text-[10px] tracking-wide"
                    >
                      {feat}
                    </span>
                  ))}
                  {allItems.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 bg-gold-500/10 text-gold-600 text-[10px]">
                      +{allItems.length - 3}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleOpenRoom(item.habitacion.id)}
                    className="flex-1 bg-brown-900 text-cream-100 py-2.5 px-3 text-[10px] font-bold tracking-[0.2em] uppercase
                             hover:bg-brown-800 transition-all duration-300"
                  >
                    Details
                  </button>
                  <button
                    className="flex-1 bg-gold-500 text-white py-2.5 px-3 text-[10px] font-bold tracking-[0.2em] uppercase
                             hover:bg-gold-600 transition-all duration-300"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brown-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-brown-700/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h3 className="text-xl font-playfair font-bold text-brown-900 mb-2">No rooms available</h3>
          <p className="text-brown-700/60 text-sm">Try adjusting your filters to see more options</p>
        </div>
      )}

      <RoomModal open={isOpen} loading={loading} room={roomSelected} onClose={handleCloseModal} />
    </>
  );
}
