import Container from '@/src/components/templates/Container';
import { Link } from '@/src/i18n/navigation';
import { routes } from '@/src/lib/routes';
import { FaAngleRight } from 'react-icons/fa';

const features = [
  {
    icon: '/icons/location.webp',
    title: 'Ubicación Privilegiada',
    desc: 'En el corazón de San Blas, Cusco.',
  },
  {
    icon: '/icons/location.webp',
    title: 'Cultura Viva',
    desc: 'Rodeados de arte, tradición y creatividad.',
  },
  {
    icon: '/icons/location.webp',
    title: 'Atención Cálida',
    desc: 'Hospitalidad andina que te hace sentir en casa.',
  },
  {
    icon: '/icons/location.webp',
    title: 'Energía Positiva',
    desc: 'Un ambiente pensado para tu bienestar y descanso.',
  },
];

export default function Home() {
  return (
    <>
      <div className="absolute left-0 top-0 h-screen w-auto z-100 hidden 2xl:block pointer-events-none">
        <img
          src="/icons/kipu.webp"
          alt="Kipu decorativo andino"
          className="h-full w-auto object-contain"
        />
      </div>
      <section className="relative min-h-screen overflow-hidden bg-cream-100">
        <div className="absolute inset-0 z-0 lg:hidden">
          <img
            src="/bg-about-3.jpg"
            alt=""
            aria-hidden="true"
            className="
              h-full w-full object-cover object-center opacity-60
              mask-[url('/mask2.png')]
              mask-[180%_auto]
              mask-center
              mask-no-repeat
              [-webkit-mask-image:url('/mask2.png')]
              [-webkit-mask-size:180%_auto]
              [-webkit-mask-repeat:no-repeat]
              [-webkit-mask-position:center]
            "
          />
        </div>

        <div className="absolute inset-0 z-0 bg-cream-100/70 lg:hidden" />

        <div className="absolute right-0 top-0 z-0 hidden h-full w-1/2 lg:block">
          <img
            src="/bg-about-3.jpg"
            alt="San Blas Cusco"
            className="
              h-full w-full object-cover object-center
              mask-[url('/mask2.png')]
              mask-size-[120%_100%]
              mask-position-left
              mask-no-repeat
              [-webkit-mask-image:url('/mask2.png')]
              [-webkit-mask-size:120%_100%]
              [-webkit-mask-position:left]
              [-webkit-mask-repeat:no-repeat]
            "
          />
          <div className="absolute right-0 bottom-0 w-50 h-auto z-100 hidden 2xl:block pointer-events-none">
            <img
              src="/icons/ceramica.webp"
              alt="Aribalo decorativo andino"
              className="w-full h-auto object-contain "
            />
          </div>
        </div>

        <Container className="relative z-10 grid min-h-screen items-center lg:grid-cols-2">
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
                className="inline-flex items-center gap-2 bg-accent-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-accent-600"
              >
                Contáctanos <FaAngleRight />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section className="relative overflow-hidden bg-cream-100">
        <Container>
          <div className="relative border-y border-brown-300 py-8 md:py-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
              {features.map((f, index) => (
                <article key={f.title} className="relative flex flex-col items-center text-center">
                  {index !== 0 && (
                    <span className="absolute left-0 top-1/2 hidden h-24 -translate-y-1/2 border-l border-dashed border-brown-300 lg:block" />
                  )}
                  <img
                    src={f.icon}
                    alt=""
                    aria-hidden="true"
                    className="mb-4 hidden h-14 w-14 object-contain lg:block"
                  />
                  <h3 className="text-xs font-black uppercase tracking-wide text-brown-900 sm:text-sm">
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-40 text-xs leading-relaxed text-brown-700 sm:text-sm">
                    {f.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="relative w-full ">
        <img
          src="/bg-about.jpg"
          alt="Hostal Qorikallpa Cusco"
          className="h-75 w-full object-cover md:h-100 lg:h-125"
        />
      </section>
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
                  “ Vive la esencia andina ”
                </h2>

                <div className="flex flex-1 items-center gap-2 sm:gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-500 sm:h-2 sm:w-2" />
                  <span className="h-px w-full bg-brown-300" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brown-700 md:text-base">
                Cada rincón de nuestro hostal refleja la cultura, el arte y la calidez de nuestro
                pueblo. Aquí, cada detalle está hecho con amor para que tu estadía sea inolvidable.
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
    </>
  );
}
