import env from '@/src/environment';
import { ApiResponse } from '@/src/types/api/habitacion';
import { HabitacionId } from '@/src/types/models/Habitacion';

export async function getRoomById(id: string, locale: string): Promise<ApiResponse<HabitacionId>> {
  const res = await fetch(
    `${env.backend.api}/api/public/habitaciones/${id}?locale=${locale}`
  );
  

  return res.json();
}
