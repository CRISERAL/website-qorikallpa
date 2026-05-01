'use client';

import Container from '@/src/components/templates/Container';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HabitacionWithPrice, PublicFilters } from '@/src/types/api/habitacion';
import { FaSearch, FaFilter, FaCalendar, FaSortAmountUp } from 'react-icons/fa';

function getQueryParam(key: string): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || '';
}

export default function RoomsList() {
  const router = useRouter();
  const pathname = usePathname();

  const getLocaleFromPath = () => {
    const match = pathname.match(/^\/([^/]+)/);
    return match && ['es', 'en', 'fr'].includes(match[1]) ? match[1] : 'es';
  };

  const [habitaciones, setHabitaciones] = useState<HabitacionWithPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [tipo, setTipo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState<'asc' | 'desc' | ''>('');

  useEffect(() => {
    setTipo(getQueryParam('tipo'));
    setFechaInicio(getQueryParam('fecha_inicio'));
    setFechaFin(getQueryParam('fecha_fin'));
    setOrdenPrecio((getQueryParam('orden_precio') as 'asc' | 'desc') || '');
    setIsInitialized(true);
  }, []);

  const fetchHabitaciones = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const locale = getLocaleFromPath();
      const filters: PublicFilters = {
        tipo: tipo || undefined,
        fecha_inicio: fechaInicio || undefined,
        fecha_fin: fechaFin || undefined,
        orden_precio: ordenPrecio || undefined,
        locale: locale as 'es' | 'en' | 'fr',
      };

      const params = new URLSearchParams();
      if (filters.tipo) params.append('tipo', filters.tipo);
      if (filters.fecha_inicio) params.append('fecha_inicio', filters.fecha_inicio);
      if (filters.fecha_fin) params.append('fecha_fin', filters.fecha_fin);
      if (filters.orden_precio) params.append('orden_precio', filters.orden_precio);
      if (filters.locale) params.append('locale', filters.locale);

      const query = params.toString();
      const apiUrl = `/api/habitaciones${query ? `?${query}` : ''}`;

      const res = await fetch(apiUrl);
      console.log('API response status:', res.status);
      const data = await res.json();
      console.log('API response:', data);

      if (data.success) {
        setHabitaciones(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [tipo, fechaInicio, fechaFin, ordenPrecio]);

  useEffect(() => {
    if (isInitialized) {
      fetchHabitaciones();
    }
  }, [fetchHabitaciones, isInitialized]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (tipo) params.set('tipo', tipo);
    if (fechaInicio) params.set('fecha_inicio', fechaInicio);
    if (fechaFin) params.set('fecha_fin', fechaFin);
    if (ordenPrecio) params.set('orden_precio', ordenPrecio);

    router.push(`/${getLocaleFromPath()}/rooms?${params.toString()}`);
  };

  const getImagenUrl = (url_imagen: string[] | null) => {
    if (!url_imagen || url_imagen.length === 0) {
      return '/placeholder-room.png';
    }
    return url_imagen[0];
  };

  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-card p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-card-foreground flex items-center gap-2">
                <FaFilter className="w-4 h-4" />
                Filtros
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-card-foreground">
                    Tipo
                  </label>
                  <input
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    placeholder="Suite, Estándar"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-card-foreground items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    Entrada
                  </label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-card-foreground items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    Salida
                  </label>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-card-foreground items-center gap-1">
                    <FaSortAmountUp className="w-3 h-3" />
                    Precio
                  </label>
                  <select
                    value={ordenPrecio}
                    onChange={(e) => setOrdenPrecio(e.target.value as 'asc' | 'desc' | '')}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="">Cualquiera</option>
                    <option value="asc">Menor a mayor</option>
                    <option value="desc">Mayor a menor</option>
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="w-full px-4 py-2.5 bg-accent text-white font-semibold rounded-md hover:bg-accent-light transition-colors flex items-center justify-center gap-2"
                >
                  <FaSearch className="w-4 h-4" />
                  Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Cargando habitaciones...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : habitaciones.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron habitaciones disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {habitaciones.map((item, i) => {
                  const habitacion = item.habitacion;
                  const imageUrl = getImagenUrl(habitacion.url_imagen);
                  const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];
                  const rotate = rotations[i % rotations.length];

                  return (
                    <div
                      key={habitacion.id}
                      className={`flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative shadow ${rotate}`}
                    >
                      <div className="p-2 pb-0 bg-card">
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={imageUrl}
                            alt={habitacion.nro_habitacion}
                            className="w-full h-full object-cover"
                          />
                          {item.precio_noche && (
                            <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-1.5 py-0.5 leading-none">
                              S/{item.precio_noche}
                            </div>
                          )}
                        </div>
                        <div className="py-2 px-1 text-center">
                          <p className="text-xs font-semibold truncate text-stone-600">
                            Habitación
                          </p>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">
                            tipo
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">Piso</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
