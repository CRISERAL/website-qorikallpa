import { getAllRoomsByLocale } from '@/src/api/backend/getAllRoomsByLocale';
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
  };
};

export default async function RoomsListV2({ locale, searchParams }: Props) {
  const rooms = await getFilterRooms({
    locale,
    tipo: searchParams.tipo,
    fecha_inicio: searchParams.fecha_inicio,
    fecha_fin: searchParams.fecha_fin,
  });

  const resType = await getAllRoomTypesLocale(locale);
  const contentType = resType.data;

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 shrink-0">
            <RoomsFilterClient
              roomTypes={contentType}
              currentTipo={searchParams.tipo}
              currentFechaInicio={searchParams.fecha_inicio}
              currentFechaFin={searchParams.fecha_fin}
            />
          </div>
          <div className="flex-1">
            <RoomsGridClient rooms={rooms.data} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  );
}
