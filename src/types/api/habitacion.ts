export interface TipoHabitacion {
  id: string;
  nombre: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export interface Habitacion {
  id: string;
  nro_habitacion: string;
  tipo_habitacion: TipoHabitacion;
  piso: number;
  feature: string | null;
  amenities: string | null;
  url_imagen: string[] | null;
  estado: boolean;
  descripcion: string | null;
  promociones: string[];
  created_at: string;
  updated_at: string;
}

export interface HabitacionWithPrice {
  habitacion: Habitacion;
  precio_noche: number | null;
}

export interface Mueble {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  url_imagen: string | null;
  condicion: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface MuebleWithCategoria extends Mueble {
  categoria: Categoria;
  fecha_adquisicion: string;
  ultima_revision: string;
  habitacion_id: string;
  created_at: string;
  updated_at: string;
}

export interface FechaReserva {
  fecha_inicio: string;
  fecha_fin: string;
  estado: 'TENTATIVA' | 'CONFIRMADA' | 'EN_CASA' | 'COMPLETADA' | 'CANCELADA' | 'NO_LLEGO';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: number;
}

export interface ListHabitacionesResponse {
  list: Habitacion[];
  pagination: Pagination;
}

export interface HabitacionDetalleResponse {
  habitacion: Habitacion & { muebles: MuebleWithCategoria[] };
  fechas_reserva: FechaReserva[];
}

export interface HabitacionWithMuebles {
  id: string;
  nro_habitacion: string;
  tipo_habitacion_id: string;
  piso: number;
  feature: string | null;
  amenities: string | null;
  url_imagen: string[] | null;
  estado: boolean;
  descripcion: string | null;
  muebles: Mueble[];
}

export interface Filters {
  page?: number;
  limit?: number;
  numero?: string;
  tipo?: string;
  estado?: boolean;
}

export interface PublicFilters extends Filters {
  fecha_inicio?: string;
  fecha_fin?: string;
  orden_precio?: 'asc' | 'desc';
  locale?: 'es' | 'en' | 'fr';
}

export interface HabitacionFilters {
  page?: number;
  limit?: number;
  numero?: string;
  tipo?: string;
  estado?: boolean;
}
