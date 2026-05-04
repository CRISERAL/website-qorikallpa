'use client';

import { RoomType } from '@/src/types/models/RoomType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Props = {
  roomTypes: RoomType[];
  currentTipo?: string;
  currentFechaInicio?: string;
  currentFechaFin?: string;
};

export default function RoomsFilterClient({
  roomTypes,
  currentTipo,
  currentFechaInicio,
  currentFechaFin,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  function handleSubmit(formData: FormData) {
    const params = new URLSearchParams(searchParams.toString());

    const tipo = formData.get('tipo')?.toString();
    const fecha_inicio = formData.get('fecha_inicio')?.toString();
    const fecha_fin = formData.get('fecha_fin')?.toString();

    if (tipo) {
      params.set('tipo', tipo);
    } else {
      params.delete('tipo');
    }

    if (fecha_inicio) {
      params.set('fecha_inicio', `${fecha_inicio}T00:00:00.000Z`);
    } else {
      params.delete('fecha_inicio');
    }

    if (fecha_fin) {
      params.set('fecha_fin', `${fecha_fin}T00:00:00.000Z`);
    } else {
      params.delete('fecha_fin');
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="border-2 border-gray-900 px-6 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          SHOW FILTERS
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Form - Shown only when showFilters is true */}
      {showFilters && (
        <form
          action={handleSubmit}
          className="space-y-4 border p-4 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">Tipo de habitación</label>

            <select
              name="tipo"
              defaultValue={currentTipo ?? ''}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Todos</option>

              {roomTypes.map((item) => (
                <option key={item.id} value={item.nombre}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Fecha inicio</label>

            <input
              type="date"
              name="fecha_inicio"
              defaultValue={currentFechaInicio?.split('T')[0] ?? ''}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Fecha fin</label>

            <input
              type="date"
              name="fecha_fin"
              defaultValue={currentFechaFin?.split('T')[0] ?? ''}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-[linear-gradient(to_right,var(--color-primary-500)_70%,#BB5E05_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 w-full"
          >
            Buscar
          </button>

          <button
            type="button"
            onClick={clearFilters}
            className="w-full px-6 py-3 text-sm font-semibold uppercase tracking-wide 
               text-primary-500 border-2 border-primary-500 
               transition-all duration-300 
               hover:bg-primary-500 hover:text-white 
               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Limpiar filtros
          </button>
        </form>
      )}
    </div>
  );
}
