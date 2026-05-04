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
    <section className="py-16">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <RoomsFilterClient
              roomTypes={contentType}
              currentTipo={searchParams.tipo}
              currentFechaInicio={searchParams.fecha_inicio}
              currentFechaFin={searchParams.fecha_fin}
              currentUnidadTarifa={searchParams.unidad_tarifa}
            />
            <RoomsGridClient rooms={rooms.data} locale={locale} />
          </div>
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white border border-gray-200 p-6 shadow-sm">
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3">DINING</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Peruvian cuisine restaurant, fine dining restaurant with live opera shows and
                    lobby bar with Peruvian liqueurs
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3">FEATURES</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Extensive Cusco School art collection, massage room with treatments using local
                    ingredients, San Antonio Abad chapel
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3">ACTIVITIES</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Art tour experience through our 17th century original paintings
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-3">
                    ALL STAYS INCLUDE
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Wi-Fi, water, breakfast, complimentary activities and welcome tea
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
