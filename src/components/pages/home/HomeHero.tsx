import Container from '@/src/components/templates/Container';
import { Link } from '@/src/i18n/navigation';
import { routes } from '@/src/lib/routes';
import { useTranslations } from 'next-intl';
import { FaAngleRight } from 'react-icons/fa';

export default function HomeHero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg-about-2.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
      </div>
      <Container className="relative z-10 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {t('title')}
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={routes.contact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white text-xs font-semibold uppercase tracking-widest hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('primaryButtonLabel')}
              <FaAngleRight className="w-3 h-3" />
            </Link>
            <Link
              href={routes.rooms}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white/20 transition-all duration-300"
            >
              {t('secondaryButtonLabel')}
              <FaAngleRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent z-10" />
    </section>
  );
}
