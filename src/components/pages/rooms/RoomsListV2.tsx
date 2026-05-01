import { getAllRoomsByLocale } from '@/src/api/backend/getAllRoomsByLocale';
import Container from '../../templates/Container';
import { cn } from '@/src/lib/cn';

interface Props {
  locale: string;
}

export default async function RoomsListV2({ locale }: Props) {
  const res = await getAllRoomsByLocale(locale);
  const content = res.data;
  console.log('Fetched rooms data:', content);

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 shrink-0"></div>
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {content.map((item, i) => {
                const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];
                const rotate = rotations[i % rotations.length];
                return (
                  <div
                    key={item.habitacion.id}
                    className={cn(
                      'flex-1 min-w-0 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative shadow',
                      rotate
                    )}
                  >
                    <div className="p-2 pb-0 bg-card">
                      <div className="aspect-square overflow-hidden relative">
                        {item.habitacion.url_imagen && item.habitacion.url_imagen.length > 0 && (
                          <img
                            src={item.habitacion.url_imagen[0]}
                            alt={`Habitación ${item.habitacion.nro_habitacion}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {item.tarifa.precio && (
                          <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-1.5 py-0.5 leading-none">
                            S/{item.tarifa.precio}
                          </div>
                        )}
                      </div>
                      <div className="py-2 px-1 text-center">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-0.5">
                          {item.habitacion.tipo_habitacion.nombre}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
