import { ApiResponse } from '@/src/types/api/habitacion';
import { RoomItem } from '@/src/types/models/RoomItem';

export async function getRoomById(id: string, locale: string): Promise<ApiResponse<RoomItem>> {
  const res = await fetch(`/api/rooms/${id}?locale=${locale}`);

  return res.json();
}
