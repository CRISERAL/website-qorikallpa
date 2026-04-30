import { getAllRoomsByLocale } from '@/src/api/backend/getAllRoomsByLocale';

interface Props {
  locale: string;
  fecha_inicio?: string;
  fecha_fin?: string;
}

export default async function RoomsListV2({ locale, fecha_inicio, fecha_fin }: Props) {
  const res = await getAllRoomsByLocale(locale);

  const content = res.data;
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
    </section>
  );
}
