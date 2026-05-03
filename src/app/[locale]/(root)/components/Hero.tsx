import Container from '@/src/components/templates/Container';
import { Link } from '@/src/i18n/navigation';
import { routes } from '@/src/lib/routes';
import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('home.hero');
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 lg:hidden">
        <img
          src="/bg-about-3.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-60 mask-[url('/mask2.png')] mask-[180%_auto] mask-center mask-no-repeat [-webkit-mask-image:url('/mask2.png')] [-webkit-mask-size:180%_auto] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
        />
      </div>
      <div className="absolute right-0 top-0 z-0 hidden h-full w-1/2 lg:block">
        <img
          src="/bg-about-3.jpg"
          alt="San Blas Cusco"
          className="h-full w-full object-cover object-center mask-[url('/mask2.png')] mask-size-[120%_100%] mask-position-left mask-no-repeat [-webkit-mask-image:url('/mask2.png')] [-webkit-mask-size:120%_100%] [-webkit-mask-position:left] [-webkit-mask-repeat:no-repeat]"
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
          <h1 className="font-playfair text-4xl font-black leading-tight text- sm:text-5xl md:text-6xl xl:text-7xl">
            {t('title')}
            <br />
            <span className="text-primary-500">{t('highlight')}</span>
          </h1>

          <div className="my-4 flex justify-center lg:justify-start" aria-hidden="true">
            <svg viewBox="0 0 200 12" fill="none" width={200} height={12}>
              <path
                d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6"
                stroke="var(--color-primary-500)"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>

          <p className="mx-auto mt-4 max-w-md leading-relaxed lg:mx-0">{t('description')}</p>

          <div className="mt-8">
            <Link
              href={routes.contact}
              className="inline-flex items-center gap-2 bg-[linear-gradient(to_right,var(--color-primary-500)_70%,#BB5E05_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {t('primaryButtonLabel')}
              <img
                src="/icons/chakana-icon.png"
                alt=""
                className=" object-contain brightness-0 invert"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
