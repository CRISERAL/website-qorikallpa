import Container from '@/src/components/templates/Container';
import { Link } from '@/src/i18n/navigation';
import { routes } from '@/src/lib/routes';
import { FaAngleRight } from 'react-icons/fa';

export default function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-cream-100 py-16 lg:min-h-[85vh] lg:py-20">
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/bg-about-3.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-60 mask-[url('/mask.png')] mask-[180%_auto] mask-center mask-no-repeat [-webkit-mask-image:url('/mask.png')] [-webkit-mask-size:180%_auto] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
        />
      </div>

      <div className="absolute inset-0 bg-cream-100/50 lg:hidden" />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="text-center lg:text-left">
            <h1 className="font-playfair text-4xl font-black leading-tight text-brown-900 sm:text-5xl md:text-6xl xl:text-7xl">
              Tu aventura
              <br />
              comienza en
              <br />
              <span className="text-accent-500">San Blas</span>
            </h1>

            <div className="my-4 flex justify-center lg:justify-start" aria-hidden="true">
              <svg viewBox="0 0 200 12" fill="none" width={200} height={12}>
                <path
                  d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6"
                  stroke="var(--color-gold-500)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>

            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brown-700 md:text-lg lg:mx-0">
              San Blas es conocido como el barrio de los artesanos y la creatividad, un lugar
              perfecto para que tu aventura cusqueña comience con energía positiva y auténtica.
            </p>

            <div className="mt-8">
              <Link
                href={routes.contact}
                aria-label="Ir a la página de contacto"
                className="inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-accent-600 sm:w-auto"
              >
                Contáctanos <FaAngleRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="relative h-[560px] w-full xl:h-[680px] 2xl:h-[720px]">
              <img
                src="/bg-about-3.jpg"
                alt="Vista de San Blas en Cusco"
                className="h-full w-full object-cover mask-[url('/mask.png')] mask-size-[100%_100%] mask-center mask-no-repeat [-webkit-mask-image:url('/mask.png')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
