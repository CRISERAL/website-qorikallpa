'use client';

import { HabitacionId } from '@/src/types/models/Habitacion';

interface Props {
  open: boolean;
  loading: boolean;
  room: HabitacionId | null;
  onClose: () => void;
}

export default function RoomModal({ open, loading, room, onClose }: Props) {
  if (!open) return null;
  return <div>{room?.descripcion}</div>;
}
