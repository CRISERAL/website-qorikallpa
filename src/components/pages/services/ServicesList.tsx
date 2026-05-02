import { getAllServices } from '@/src/api/strapi/getAllServices';
import Container from '@/src/components/templates/Container';
import env from '@/src/environment';
import Polaroid from '../../Polaroid';
import ContactCard from '../../ContactCard';

interface Props {
  locale: string;
}

const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];

export default async function ServicesList({ locale }: Props) {
  const servicesResponse = await getAllServices(locale);
  const services = servicesResponse.data;
  return (
    <section className="bg-background">
      {services.map((item) => {
        return (
          <div key={item.id} className="py-8">
            <Container>
              <div className="hidden lg:flex items-center gap-8">
                <div className="w-64 shrink-0 space-y-4">
                  <ContactCard title={item.title} description={item.description} />
                </div>
                <div className="flex-1 flex items-center justify-between gap-3 py-6">
                  {item.images.map((photo, i) => {
                    const imageUrl = `${env.strapi.api}${photo.formats?.thumbnail?.url ?? photo.url}`;
                    const rotation = rotations[i % rotations.length];
                    return <Polaroid key={i} photo={imageUrl} rotation={rotation} />;
                  })}
                </div>
              </div>
            </Container>
          </div>
        );
      })}
    </section>
  );
}
