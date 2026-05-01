import env from '@/src/environment';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';

export async function getRoomsByType(locale: string, type: string): Promise<ApiResponse<RoomItem>> {
  const res = await fetch(
    `${env.backend.api}/api/public/habitaciones?locale=${locale}&tipo=${type}`
  );

  if (!res.ok) {
    throw new Error(`Error API: ${res.status}`);
  }

  return res.json();
}
