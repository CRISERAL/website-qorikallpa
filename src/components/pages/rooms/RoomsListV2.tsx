import { getAllRoomsByLocale } from '@/src/api/backend/getAllRoomsByLocale';

interface Habitacion {
  id: string;
  nro_habitacion: string;
  tipo_habitacion: {
    id: string;
    nombre: string;
  };
  piso: number;
  feature: string | null;
  amenities: string | null;
  url_imagen: string[] | null;
  estado: boolean;
  descripcion: string | null;
  promociones: unknown[];
}

interface RoomItem {
  habitacion: Habitacion;
  precio_noche: number | null;
}

interface Props {
  locale: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export default async function RoomsListV2({ locale, fecha_inicio, fecha_fin }: Props) {
  const res = await getAllRoomsByLocale(locale);

  const content: RoomItem[] = res.data;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Habitaciones Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <div key={item.habitacion.id} className="border rounded-lg overflow-hidden shadow-md">
            {item.habitacion.url_imagen && item.habitacion.url_imagen.length > 0 && (
              <img
                src={item.habitacion.url_imagen[0]}
                alt={`Habitación ${item.habitacion.nro_habitacion}`}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">
                  Habitación {item.habitacion.nro_habitacion}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${item.habitacion.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {item.habitacion.estado ? 'Disponible' : 'No disponible'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.habitacion.tipo_habitacion.nombre}</p>
              <p className="text-gray-700 mb-2">Piso: {item.habitacion.piso}</p>
              <p className="text-gray-600 text-sm mb-2">{item.habitacion.descripcion}</p>
              {item.habitacion.amenities && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-500">Amenities:</p>
                  <p className="text-sm text-gray-600">{item.habitacion.amenities}</p>
                </div>
              )}
              {item.habitacion.feature && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-500">Características:</p>
                  <p className="text-sm text-gray-600">{item.habitacion.feature}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
