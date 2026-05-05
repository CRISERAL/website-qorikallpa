'use client';

import { RoomType } from '@/src/types/models/RoomType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import RoomsCalendar from './RoomsCalendar';

type Props = {
  roomTypes: RoomType[];
  currentTipo?: string;
  currentFechaInicio?: string;
  currentFechaFin?: string;
  currentUnidadTarifa?: string;
};

export default function RoomsFilterClient({
  roomTypes,
  currentTipo,
  currentFechaInicio,
  currentFechaFin,
  currentUnidadTarifa,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  // Inicializar el rango de fechas
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const from = currentFechaInicio ? new Date(currentFechaInicio) : undefined;
    const to = currentFechaFin ? new Date(currentFechaFin) : undefined;
    return from || to ? { from, to } : undefined;
  });

  // Validar fechas cuando cambian
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      if (dateRange.from > dateRange.to) {
        setDateRange({ from: dateRange.from, to: undefined });
      }
    }
  }, [dateRange]);

  function handleSubmit(formData: FormData) {
    const params = new URLSearchParams(searchParams.toString());

    const tipo = formData.get('tipo')?.toString();
    const unidad_tarifa = formData.get('unidad_tarifa')?.toString();

    if (tipo) {
      params.set('tipo', tipo);
    } else {
      params.delete('tipo');
    }

    if (dateRange?.from) {
      params.set('fecha_inicio', dateRange.from.toISOString());
    } else {
      params.delete('fecha_inicio');
    }

    if (dateRange?.to) {
      params.set('fecha_fin', dateRange.to.toISOString());
    } else {
      params.delete('fecha_fin');
    }

    if (unidad_tarifa) {
      params.set('unidad_tarifa', unidad_tarifa);
    } else {
      params.delete('unidad_tarifa');
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function clearFilters() {
    setDateRange(undefined);
    router.push(pathname);
  }

  // Formatear el texto del rango de fechas
  const dateRangeText = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, 'dd MMM yyyy', { locale: es })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: es })}`
      : format(dateRange.from, 'dd MMM yyyy', { locale: es })
    : 'Seleccionar fechas';

  return (
    <div className="px-4 py-4">
      {/* Filter Form */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <form action={handleSubmit} className="space-y-5">
          {/* Tipo de habitación */}
          <div>
            <label className="block text-xs font-bold text-brown-700 mb-2 uppercase tracking-[0.15em]">
              Tipo de Habitación
            </label>
            <select
              name="tipo"
              defaultValue={currentTipo ?? ''}
              className="w-full bg-cream-50 border border-brown-200 px-3 py-2.5 text-brown-900 text-sm 
                       focus:border-gold-500 focus:ring-1 focus:ring-gold-500 
                       transition-all duration-200 outline-none font-lato"
            >
              <option value="">Todos los tipos</option>
              {roomTypes.map((item) => (
                <option key={item.id} value={item.nombre}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Unidad de tarifa */}
          <div>
            <label className="block text-xs font-bold text-brown-700 mb-2 uppercase tracking-[0.15em]">
              Tarifa
            </label>
            <select
              name="unidad_tarifa"
              defaultValue={currentUnidadTarifa ?? ''}
              className="w-full bg-cream-50 border border-brown-200 px-3 py-2.5 text-brown-900 text-sm 
                       focus:border-gold-500 focus:ring-1 focus:ring-gold-500 
                       transition-all duration-200 outline-none font-lato"
            >
              <option value="">Todas las tarifas</option>
              <option value="NOCHE">Por Noche</option>
              <option value="HORA">Por Hora</option>
            </select>
          </div>

          {/* Rango de Fechas con Calendario */}
          <div>
            <label className="block text-xs font-bold text-brown-700 mb-2 uppercase tracking-[0.15em]">
              Fechas
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-cream-50 border border-brown-200 px-3 py-2.5 text-left text-sm 
                         focus:border-gold-500 focus:ring-1 focus:ring-gold-500 
                         transition-all duration-200 outline-none
                         hover:border-brown-300 flex items-center justify-between font-lato"
              >
                <span className={dateRange?.from ? 'text-brown-900' : 'text-brown-500/60'}>
                  {dateRangeText}
                </span>
                <svg
                  className="w-4 h-4 text-brown-500/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>

              {/* Calendario desplegable */}
              {showCalendar && (
                <RoomsCalendar
                  dateRange={dateRange}
                  onSelect={setDateRange}
                  onClose={() => setShowCalendar(false)}
                  onClear={() => setDateRange(undefined)}
                />
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-2 pt-3 border-t border-brown-100">
            <button
              type="submit"
              className="bg-[linear-gradient(to_right,var(--color-primary-500)_70%,#BB5E05_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 w-full"
            >
              Aplicar Filtros
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.15em] 
                       text-brown-700 bg-transparent border border-brown-300 rounded
                       transition-all duration-300 
                       hover:bg-brown-100 hover:border-brown-400
                       focus:outline-none focus:ring-2 focus:ring-brown-300 focus:ring-offset-1 font-lato"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
