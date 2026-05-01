import env from '@/src/environment';
import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomType } from '@/src/types/models/RoomType';

export async function getAllRoomTypesLocale(locale: string): Promise<ApiResponse<RoomType[]>> {
  const res = await fetch(`${env.backend.api}/api/public/tipos-habitacion?locale=${locale}`);
  if (!res.ok) {
    throw new Error(`Error API: ${res.status}`);
  }

  return res.json();
}
