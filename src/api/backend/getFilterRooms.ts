import env from '@/src/environment';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';

interface GetFilterRoomsProps {
  locale: string;
  tipo?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  unidad_tarifa?: string;
}

export async function getFilterRooms({
  locale,
  tipo,
  fecha_inicio,
  fecha_fin,
  unidad_tarifa,
}: GetFilterRoomsProps): Promise<ApiResponse<RoomItem[]>> {
  const params = new URLSearchParams();

  params.set('locale', locale);

  if (tipo) {
    params.set('tipo', tipo);
  }

  if (fecha_inicio) {
    params.set('fecha_inicio', fecha_inicio);
  }

  if (fecha_fin) {
    params.set('fecha_fin', fecha_fin);
  }

  if (unidad_tarifa) {
    params.set('unidad_tarifa', unidad_tarifa);
  }

  const res = await fetch(`${env.backend.api}/api/public/habitaciones?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error API: ${res.status}`);
  }

  return res.json();
}
