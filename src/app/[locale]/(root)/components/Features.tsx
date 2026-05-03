import Container from '@/src/components/templates/Container';
import { getTranslations } from 'next-intl/server';

const featureIcons = [
  '/icons/location.webp',
  '/icons/location.webp',
  '/icons/location.webp',
  '/icons/location.webp',
];

type Feature = {
  title: string;
  description: string;
};

export default async function Features() {
  const t = await getTranslations('home.features');

  const features = t.raw('items') as Feature[];

  return (
    <section className="relative overflow-hidden">
      <Container>
        <div className="relative border-t border-tertiary-500 py-8 md:py-10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
            {features.map((f, index) => (
              <article key={f.title} className="relative flex flex-col items-center text-center">
                {index !== 0 && (
                  <span className="absolute left-0 top-1/2 hidden h-24 -translate-y-1/2 border-l border-dashed border-tertiary-500 lg:block" />
                )}
                <img
                  src={featureIcons[index]}
                  alt=""
                  aria-hidden="true"
                  className="mb-4 hidden h-14 w-14 object-contain lg:block"
                />
                <h3 className="font-black uppercase tracking-wide text-xs sm:text-sm">{f.title}</h3>
                <p className="mt-2 max-w-40 text-xs leading-relaxed sm:text-sm">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
