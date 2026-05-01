import env from '@/src/environment';
import { ApiResponse, HabitacionWithPrice } from '@/src/types/api/habitacion';
import { Habitacion } from '@/src/types/models/Habitacion';
import { Tarifa } from '@/src/types/models/Tarifa';

interface RoomItem {
  habitacion: Habitacion;
  tarifa: Tarifa;
}

export async function getAllRoomsByLocale(locale: string): Promise<ApiResponse<RoomItem[]>> {
  const res = await fetch(`${env.backend.api}/api/public/habitaciones?locale=${locale}`);

  return res.json();
}
