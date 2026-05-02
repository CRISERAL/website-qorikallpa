import { getAllServices } from '@/src/api/strapi/getAllServices';
import { getStrapiMedia } from '@/src/utils/getStrapiMedia';
import Container from '../../templates/Container';
import PolaroidV2 from '../../PolaroidV2';

interface Props {
  locale: string;
}

const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1'];

export default async function ServicesList({ locale }: Props) {
  const servicesResponse = await getAllServices(locale);
  const services = servicesResponse.data;

  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {services.map((item, index) => {
            const rotation = rotations[index % rotations.length];
            const imageUrl = getStrapiMedia(item.image);

            return (
              <article
                key={item.id}
                className="group flex flex-col items-center text-center w-full max-w-[270px]"
              >
                <div className="flex justify-center w-full pt-7 px-8">
                  <div className="w-full">
                    <PolaroidV2 url={imageUrl} className={rotation}>
                      <p className="mt-1.5 text-center text-[10px] font-lato font-light italic text-brown-700/70 leading-tight px-1 truncate">
                        {item.title}
                      </p>
                    </PolaroidV2>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-5 px-6 w-full">
                  <span className="h-px flex-1 bg-brown-800/20" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-brown-800/30 shrink-0" />
                  <span className="h-px flex-1 bg-brown-800/20" />
                </div>
                <div className="flex flex-col flex-1 items-center px-5 pt-3 pb-6 gap-2">
                  <h3 className="font-playfair text-xl font-bold text-brown-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-lato italic text-brown-800/70 leading-relaxed flex-1">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
