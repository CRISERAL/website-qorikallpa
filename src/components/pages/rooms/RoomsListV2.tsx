import Container from '../../templates/Container';
import RoomsGridClient from '../../organisms/RoomsGridClient';
import { getAllRoomTypesLocale } from '@/src/api/backend/getAllRoomTypesLocale';
import { getFilterRooms } from '@/src/api/backend/getFilterRooms';
import RoomsFilterClient from '../../organisms/RoomsFilterClient';

type Props = {
  locale: string;
  searchParams: {
    tipo?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    unidad_tarifa?: string;
  };
};

export default async function RoomsListV2({ locale, searchParams }: Props) {
  const rooms = await getFilterRooms({
    locale,
    tipo: searchParams.tipo,
    fecha_inicio: searchParams.fecha_inicio,
    fecha_fin: searchParams.fecha_fin,
    unidad_tarifa: searchParams.unidad_tarifa,
  });

  const resType = await getAllRoomTypesLocale(locale);
  const contentType = resType.data;

  return (
    <section className="py-16 bg-cream-50/50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brown-900 mb-4">
            Nuestras Habitaciones
          </h1>
          <p className="text-brown-800/70 text-lg max-w-2xl mx-auto font-lato">
            Descubre nuestras habitaciones cómodas y lujosas diseñadas para tu estadía perfecta
          </p>
          <div className="w-24 h-0.5 bg-gold-500 mx-auto mt-6" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros - Izquierda */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-28 z-10">
              <div className=" bg-neutral-600 shadow-md bg-" style={{ padding: '6px 6px 20px 6px' }}>
                <div className="flex items-center gap-3 mb-6 px-4 pt-4">
                  <div className="w-9 h-9 bg-brown-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cream-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-playfair font-bold text-brown-900">Filtrar Habitaciones</h2>
                </div>
                <RoomsFilterClient
                  roomTypes={contentType}
                  currentTipo={searchParams.tipo}
                  currentFechaInicio={searchParams.fecha_inicio}
                  currentFechaFin={searchParams.fecha_fin}
                  currentUnidadTarifa={searchParams.unidad_tarifa}
                />
              </div>
            </div>
          </aside>

          {/* Grid de Habitaciones - Derecha */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-brown-800/70 font-lato">
                <span className="font-bold text-brown-900">{rooms.data.length}</span> habitaciones disponibles
              </p>
              <div className="flex items-center gap-2 text-sm text-brown-700/60">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-lato text-xs tracking-wide">Mostrando todas las habitaciones</span>
              </div>
            </div>
            <RoomsGridClient rooms={rooms.data} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
