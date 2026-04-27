import Container from '@/src/components/templates/Container';
import { Link } from '@/src/i18n/navigation';
import { cn } from '@/src/lib/cn';
import { routes } from '@/src/lib/routes';
import { useTranslations } from 'next-intl';
import { FaAngleRight } from 'react-icons/fa';

const images = ['/bg-about.jpg', '/bg-about-2.jpg', '/bg-about-3.jpg'];

const imageStyles = [
  'lg:top-8 lg:left-8 lg:w-[62%] lg:rotate-2 lg:z-30',
  'lg:top-0 lg:right-8 lg:w-[36%] lg:-rotate-3 lg:z-20',
  'lg:bottom-4 lg:right-20 lg:w-[46%] lg:rotate-3 lg:z-40',
];

export default function HomeAbout() {
  const t = useTranslations('home.about');

  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[38%] flex flex-col gap-6 text-center lg:text-left">
            <p className="text-xs text-accent uppercase tracking-[0.2em] font-medium">
              {t('subtitle')}
            </p>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
                {t('title')}
              </h2>
              <div className="w-12 h-0.5 bg-accent mt-4 mx-auto lg:mx-0" />
            </div>
            <p className="text-base text-stone-500 leading-relaxed whitespace-pre-line">
              {t('description')}
            </p>
            <div className="w-full h-px bg-border" />
            <div className="flex justify-center lg:justify-start">
              <Link
                href={routes.contact}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-xs font-semibold uppercase tracking-widest hover:bg-accent-light transition-colors"
              >
                {t('primaryButtonLabel')}
                <FaAngleRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-[62%]">
            <div className="grid grid-cols-2 gap-3 lg:block lg:h-130">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={cn(
                    'relative lg:absolute transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-50',
                    index === 0 ? 'col-span-2' : '',
                    imageStyles[index]
                  )}
                >
                  <div className="bg-card p-2 pb-6 shadow-xl">
                    <div className="aspect-4/3 overflow-hidden">
                      <img
                        src={src}
                        alt={`${t('title')} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
