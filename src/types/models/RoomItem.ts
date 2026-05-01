import { Habitacion } from './Habitacion';
import { Tarifa } from './Tarifa';

export interface RoomItem {
  habitacion: Habitacion;
  tarifa: Tarifa;
}
