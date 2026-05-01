import { Tarifa } from './Tarifa';

export interface Habitacion {
  id: string;
  nro_habitacion: string;
  tipo_habitacion: {
    id: string;
    nombre: string;
  };
  piso: number;
  feature: string | null;
  amenities: string | null;
  url_imagen: string[] | null;
  estado: boolean;
  descripcion: string | null;
  promociones: unknown[];
}

export interface HabitacionId {
  id: string;
  nro_habitacion: string;
  tipo_habitacion: {
    id: string;
    nombre: string;
  };
  piso: number;
  feature: string | null;
  amenities: string | null;
  url_imagen: string[] | null;
  estado: boolean;
  descripcion: string | null;
  promociones: unknown[];
  mubles: unknown[];
  tarifa: Tarifa;
}
