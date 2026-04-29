import { getAllRoomsByLocale } from '@/src/api/backend/getAllRoomsByLocale';
import { getRoomsByFetch } from '@/src/api/backend/getRoomsByFetch';

interface Props {
  locale: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export default async function RoomsListV2({ locale, fecha_inicio, fecha_fin }: Props) {
  const res = await getAllRoomsByLocale(locale);
  const response = await getRoomsByFetch({
    locale,
    fecha_inicio,
    fecha_fin,
  });

  const content = res.data;
  const feth = response.data;
  console.log(res.data);
  return (
    <section>
      <div></div>
      <div className="bg-red-500">
        {content.map((item, index) => (
          <div key={index}>
            {item.habitacion.nro_habitacion}
            <div>{item.habitacion.descripcion}</div>
          </div>
        ))}
      </div>
      <div className="bg-blue-500">
        {feth.map((item, index) => (
          <div key={index}>
            {item.habitacion.nro_habitacion}
            <div>{item.habitacion.descripcion}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
