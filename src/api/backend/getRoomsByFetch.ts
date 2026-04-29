import environment from '@/src/environment';
import { ApiResponse, HabitacionWithPrice } from '@/src/types/api/habitacion';

interface Props {
  locale: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export async function getRoomsByFetch({
  locale,
  fecha_inicio,
  fecha_fin,
}: Props): Promise<ApiResponse<HabitacionWithPrice[]>> {
  const params = new URLSearchParams();
  params.set('locale', locale);
  if (fecha_inicio) {
    params.set('fecha_inicio', fecha_inicio);
  }
  if (fecha_fin) {
    params.set('fecha_fin', fecha_fin);
  }

  const res = await fetch(
    `${environment.backend.apiEndpoint}/api/public/habitaciones?${params.toString()}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error(`Error al obtener habitaciones: ${res.status}`);
  }

  return res.json();
}
