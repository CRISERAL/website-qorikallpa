import environment from '@/src/environment';
import {
  ApiResponse,
  Habitacion,
  HabitacionDetalleResponse,
  HabitacionFilters,
  HabitacionWithMuebles,
  HabitacionWithPrice,
  ListHabitacionesResponse,
  PublicFilters,
} from '@/src/types/api/habitacion';

const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND || environment.apiBackend;

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BACKEND}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || `Error API: ${res.status}`);
  }

  return res.json();
}

export async function getHabitacionesDisponibles(
  filters?: PublicFilters
): Promise<ApiResponse<HabitacionWithPrice[]>> {
  const params = new URLSearchParams();

  if (filters?.tipo) params.append('tipo', filters.tipo);
  if (filters?.fecha_inicio) params.append('fecha_inicio', filters.fecha_inicio);
  if (filters?.fecha_fin) params.append('fecha_fin', filters.fecha_fin);
  if (filters?.orden_precio) params.append('orden_precio', filters.orden_precio);
  if (filters?.locale) params.append('locale', filters.locale);

  const query = params.toString();
  return fetchApi(`/api/public/habitaciones${query ? `?${query}` : ''}`);
}

export async function getHabitacionById(
  id: string,
  locale?: 'es' | 'en' | 'fr'
): Promise<ApiResponse<HabitacionWithMuebles>> {
  const params = new URLSearchParams();
  if (locale) params.append('locale', locale);

  const query = params.toString();
  return fetchApi(`/api/public/habitaciones/${id}${query ? `?${query}` : ''}`);
}

export async function getHabitaciones(
  filters?: HabitacionFilters
): Promise<ApiResponse<ListHabitacionesResponse>> {
  const params = new URLSearchParams();

  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.limit) params.append('limit', String(filters.limit));
  if (filters?.numero) params.append('numero', filters.numero);
  if (filters?.tipo) params.append('tipo', filters.tipo);
  if (filters?.estado !== undefined) {
    params.append('estado', String(filters.estado));
  }

  const query = params.toString();
  return fetchApi(`/api/private/habitaciones${query ? `?${query}` : ''}`);
}

export async function getHabitacionDetalle(
  id: string,
  tipoReserva?: string
): Promise<ApiResponse<HabitacionDetalleResponse>> {
  const params = new URLSearchParams();
  if (tipoReserva) params.append('tipo_reserva', tipoReserva);

  const query = params.toString();
  return fetchApi(`/api/private/habitaciones/${id}${query ? `?${query}` : ''}`);
}
