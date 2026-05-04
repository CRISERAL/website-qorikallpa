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
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros - Izquierda */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24 z-10">
              <RoomsFilterClient
                roomTypes={contentType}
                currentTipo={searchParams.tipo}
                currentFechaInicio={searchParams.fecha_inicio}
                currentFechaFin={searchParams.fecha_fin}
                currentUnidadTarifa={searchParams.unidad_tarifa}
              />
            </div>
          </aside>

          {/* Grid de Habitaciones - Derecha */}
          <div className="flex-1 min-w-0 ">
            <RoomsGridClient rooms={rooms.data} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
