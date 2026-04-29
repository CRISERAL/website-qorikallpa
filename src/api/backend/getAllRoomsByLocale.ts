import environment from '@/src/environment';
import { ApiResponse, HabitacionWithPrice } from '@/src/types/api/habitacion';

export async function getAllRoomsByLocale(
  locale: string
): Promise<ApiResponse<HabitacionWithPrice[]>> {
  const res = await fetch(
    `${environment.backend.apiEndpoint}/api/public/habitaciones?locale=${locale}`
  );

  return res.json();
}
