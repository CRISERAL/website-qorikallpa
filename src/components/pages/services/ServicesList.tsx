import { getAllServices } from '@/src/api/strapi/getAllServices';
import Container from '@/src/components/templates/Container';
import env from '@/src/environment';

interface Props {
  locale: string;
}

const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];

export default async function ServicesList({ locale }: Props) {
  const servicesResponse = await getAllServices(locale);
  const services = servicesResponse.data;

  return (
    <section className="py-16 bg-background">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const imageUrl = service.image?.url
              ? `${env.strapi.api}${service.image.url}`
              : '/placeholder-room.png';

            const rotate = rotations[i % rotations.length];

            return (
              <div
                key={service.id}
                className={`transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative shadow ${rotate}`}
              >
                <div className="p-2 pb-4 bg-card">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text content */}
                  <div className="px-2 pt-3 space-y-2">
                    <p className="text-sm font-semibold text-card-foreground">{service.title}</p>
                    {service.description && (
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    {service.details && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {service.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
