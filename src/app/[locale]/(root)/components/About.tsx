import Container from '@/src/components/templates/Container';
import { getTranslations } from 'next-intl/server';

export default async function About() {
  const t = await getTranslations('home.about');

  return (
    <section className="relative overflow-hidden bg-cream-200 py-12">
      <div className="absolute right-0 bottom-0 top-1/2 -translate-y-1/2 w-50 h-auto z-100 hidden 2xl:block pointer-events-none">
        <img
          src="/icons/marcador-2.webp"
          alt="Aribalo decorativo andino"
          className="w-full h-auto object-contain "
        />
      </div>
      <div className="absolute left-0 scale-x-[-1] bottom-0 top-1/2 -translate-y-1/2 w-50 h-auto z-100 hidden 2xl:block pointer-events-none">
        <img
          src="/icons/marcador-2.webp"
          alt="Aribalo decorativo andino"
          className="w-full h-auto object-contain "
        />
      </div>
      <Container>
        <div className="py-12">
          <div className="mx-auto text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-4xl mx-auto">
              <div className="flex flex-1 items-center gap-2 sm:gap-3">
                <span className="h-px w-full bg-brown-300" />
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-500 sm:h-2 sm:w-2" />
              </div>

              <h2 className="max-w-45 text-center font-playfair text-xl font-bold leading-tight text-accent-500 sm:max-w-none sm:text-2xl md:text-3xl">
                “ {t('title')} ”
              </h2>

              <div className="flex flex-1 items-center gap-2 sm:gap-3">
                <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-500 sm:h-2 sm:w-2" />
                <span className="h-px w-full bg-brown-300" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brown-700 md:text-base">
              {t('description')}
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="relative h-50 w-full md:h-62 lg:h-90">
              <img
                src="/bg-about-2.jpg"
                alt="Hostal Qorikallpa"
                className="
                  h-full w-full object-cover object-center
    
                  mask-[url('/mask2.png')]
                  mask-size-[100%_100%]
                  mask-position-center
                  mask-no-repeat
    
                  [-webkit-mask-image:url('/mask2.png')]
                  [-webkit-mask-size:100%_100%]
                  [-webkit-mask-position:center]
                  [-webkit-mask-repeat:no-repeat]
                "
              />
            </div>
            <div className="hidden flex-col items-center gap-2 md:flex">
              <span className="h-3 w-3 rotate-45 border-2 border-accent-500" />
              <span className="h-3 w-3 rotate-45 border-2 border-gold-500" />
              <span className="h-3 w-3 rotate-45 border-2 border-brown-700" />
              <span className="h-3 w-3 rotate-45 border-2 border-accent-500" />
            </div>
            <div className="relative h-50 w-full md:h-62 lg:h-90">
              <img
                src="/bg-about-3.jpg"
                alt="San Blas Cusco"
                className="
                  h-full w-full object-cover object-center
    
                  mask-[url('/mask2.png')]
                  mask-size-[100%_100%]
                  mask-position-center
                  mask-no-repeat
    
                  [-webkit-mask-image:url('/mask2.png')]
                  [-webkit-mask-size:100%_100%]
                  [-webkit-mask-position:center]
                  [-webkit-mask-repeat:no-repeat]
                "
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
