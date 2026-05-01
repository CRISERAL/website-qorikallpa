'use client';

import { RoomItem } from '@/src/types/models/RoomItem';
import {
  FaTimes,
  FaStar,
  FaWifi,
  FaParking,
  FaCoffee,
  FaSwimmer,
  FaSnowflake,
  FaDesktop,
} from 'react-icons/fa';

interface Props {
  open: boolean;
  loading: boolean;
  room: RoomItem | null;
  onClose: () => void;
}

const amenitiesIcons: Record<string, React.ElementType> = {
  wifi: FaWifi,
  parking: FaParking,
  breakfast: FaCoffee,
  pool: FaSwimmer,
  ac: FaSnowflake,
  workspace: FaDesktop,
};

export default function RoomModal({ open, loading, room, onClose }: Props) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const parseAmenities = (amenities: string | null | undefined): string[] => {
    if (!amenities) return [];
    try {
      return JSON.parse(amenities) as string[];
    } catch {
      return amenities.split(',').map((s) => s.trim());
    }
  };

  const parseFeatures = (features: string | null | undefined): string[] => {
    if (!features) return [];
    try {
      return JSON.parse(features) as string[];
    } catch {
      return features.split(',').map((s) => s.trim());
    }
  };

  const amenities = parseAmenities(room?.habitacion.amenities);
  const features = parseFeatures(room?.habitacion.feature);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        {loading || !room ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full min-h-[300px]">
              {room.habitacion.url_imagen && room.habitacion.url_imagen.length > 0 && (
                <img
                  src={room.habitacion.url_imagen[0]}
                  alt={`Habitación ${room.habitacion.nro_habitacion}`}
                  className="w-full h-full object-cover"
                />
              )}
              {room.habitacion.url_imagen && room.habitacion.url_imagen.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                  {room.habitacion.url_imagen.slice(0, 4).map((url, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 border-white"
                    >
                      <img
                        src={url}
                        alt={`Imagen ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    {room.habitacion.tipo_habitacion.nombre}
                  </h2>
                  <p className="text-muted-foreground">
                    Habitación #{room.habitacion.nro_habitacion} - Piso {room.habitacion.piso}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    {room.tarifa.moneda} {room.tarifa.precio}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {room.tarifa.unidad === 'NOCHE'
                      ? 'por noche'
                      : room.tarifa.unidad.toLowerCase()}
                  </p>
                </div>
              </div>

              {room.habitacion.descripcion && (
                <p className="text-muted-foreground mb-6">{room.habitacion.descripcion}</p>
              )}

              {features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Características</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <FaStar className="text-accent text-xs" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Servicios</h3>
                  <div className="flex flex-wrap gap-3">
                    {amenities.map((amenity, i) => {
                      const Icon = amenitiesIcons[amenity.toLowerCase()];
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm"
                        >
                          {Icon && <Icon className="text-accent" />}
                          <span>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {room.habitacion.promociones && room.habitacion.promociones.length > 0 && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent">
                  <h3 className="font-semibold text-accent mb-2">Promociones disponibles</h3>
                  {(
                    room.habitacion.promociones as Array<{ nombre?: string; descripcion?: string }>
                  ).map((promo, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium">{promo.nombre}</p>
                      {promo.descripcion && (
                        <p className="text-muted-foreground">{promo.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Reservar ahora
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
