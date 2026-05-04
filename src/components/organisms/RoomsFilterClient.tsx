'use client';

import { RoomType } from '@/src/types/models/RoomType';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/style.css';

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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header del Sidebar */}
      <div className="bg-linear-to-r from-primary-500 to-[#BB5E05] p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white uppercase tracking-wide">Filtros</h2>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
            aria-label="Toggle filters"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Form */}
      <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
        <form action={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de habitación */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Tipo de habitación
            </label>
            <select
              name="tipo"
              defaultValue={currentTipo ?? ''}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 
                       focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                       transition-all duration-200 outline-none"
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
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Unidad de tarifa
            </label>
            <select
              name="unidad_tarifa"
              defaultValue={currentUnidadTarifa ?? ''}
              className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-gray-700 
                       focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                       transition-all duration-200 outline-none"
            >
              <option value="">Todas las tarifas</option>
              <option value="NOCHE">Por Noche</option>
              <option value="HORA">Por Hora</option>
            </select>
          </div>

          {/* Rango de Fechas con Calendario */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Rango de Fechas
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-left text-gray-700 
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-200 
                         transition-all duration-200 outline-none
                         hover:border-gray-300 flex items-center justify-between"
              >
                <span className={dateRange?.from ? 'text-gray-900' : 'text-gray-500'}>
                  {dateRangeText}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>

              {/* Calendario desplegable */}
              {showCalendar && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setShowCalendar(false)}
                  />

                  {/* Modal del calendario */}
                  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-fit">
                    <style jsx global>{`
                      .rdp {
                        --rdp-accent-color: #ca8a04;
                        --rdp-background-color: #fef3c7;
                        --rdp-accent-color-dark: #a16207;
                        --rdp-background-color-dark: #fde68a;
                        --rdp-outline: 2px solid var(--rdp-accent-color);
                        --rdp-outline-selected: 2px solid var(--rdp-accent-color);
                      }
                      .rdp-months {
                        display: flex;
                        gap: 2rem;
                        flex-wrap: wrap;
                      }
                      .rdp-month {
                        min-width: 300px;
                      }
                      .rdp-caption {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 1rem;
                        font-weight: 700;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        color: #374151;
                      }
                      .rdp-nav {
                        display: flex;
                        gap: 0.5rem;
                      }
                      .rdp-nav_button {
                        width: 32px;
                        height: 32px;
                        border-radius: 0.375rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.2s;
                      }
                      .rdp-nav_button:hover {
                        background-color: #f3f4f6;
                      }
                      .rdp-table {
                        margin-top: 0.5rem;
                      }
                      .rdp-head_cell {
                        font-weight: 600;
                        font-size: 0.75rem;
                        color: #6b7280;
                        text-transform: uppercase;
                        padding: 0.5rem;
                      }
                      .rdp-cell {
                        padding: 2px;
                      }
                      .rdp-day {
                        width: 40px;
                        height: 40px;
                        font-size: 0.875rem;
                        margin: 0;
                      }
                      .rdp-day_button {
                        width: 100%;
                        height: 100%;
                        border-radius: 0.375rem;
                        border: none;
                        font-weight: 500;
                        transition: all 0.2s;
                      }
                      .rdp-day_button:hover:not(.rdp-day_selected):not(.rdp-day_disabled) {
                        background-color: #f3f4f6;
                      }
                      .rdp-day_selected {
                        background-color: var(--rdp-accent-color) !important;
                        color: white !important;
                        font-weight: 700;
                      }
                      .rdp-day_range_start,
                      .rdp-day_range_end {
                        background-color: var(--rdp-accent-color) !important;
                        color: white !important;
                      }
                      .rdp-day_range_middle {
                        background-color: var(--rdp-background-color) !important;
                        color: #78350f !important;
                      }
                      .rdp-day_disabled {
                        opacity: 0.3;
                        cursor: not-allowed;
                      }
                      .rdp-day_today:not(.rdp-day_selected) {
                        font-weight: 700;
                        color: var(--rdp-accent-color);
                      }
                    `}</style>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        Selecciona tu estadía
                      </h3>
                      <p className="text-sm text-gray-600">
                        {dateRange?.from && dateRange?.to
                          ? `${format(dateRange.from, 'dd MMM yyyy', { locale: es })} - ${format(dateRange.to, 'dd MMM yyyy', { locale: es })}`
                          : 'Elige las fechas de entrada y salida'}
                      </p>
                    </div>

                    <DayPicker
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      locale={es}
                      disabled={{ before: new Date() }}
                      className="rdp-custom"
                    />

                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setDateRange(undefined);
                          setShowCalendar(false);
                        }}
                        className="flex-1 px-4 py-3 text-sm font-bold uppercase tracking-wide text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCalendar(false)}
                        className="flex-1 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white bg-linear-to-r from-primary-500 to-[#BB5E05] rounded-lg hover:shadow-lg transition-all"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-linear-to-r from-primary-500 to-[#BB5E05] 
                       px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white 
                       rounded-lg shadow-md
                       transition-all duration-300 
                       hover:shadow-lg hover:scale-[1.02]
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Aplicar Filtros
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="w-full px-6 py-3.5 text-sm font-bold uppercase tracking-wide 
                       text-gray-700 bg-gray-100 rounded-lg
                       transition-all duration-300 
                       hover:bg-gray-200 hover:text-gray-900
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Limpiar Filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
