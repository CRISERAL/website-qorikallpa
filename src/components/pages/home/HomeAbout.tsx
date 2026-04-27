import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';
import HeadingBlock from '../../molecules/HeadingBlock';

const images = ['/bg-about.jpg', '/bg-about-2.jpg', '/bg-about-3.jpg'];

const imageStyles = [
  'lg:top-8 lg:left-8 lg:w-[62%] lg:rotate-2 lg:z-30',
  'lg:top-0 lg:right-8 lg:w-[36%] lg:-rotate-3 lg:z-20',
  'lg:bottom-4 lg:right-20 lg:w-[46%] lg:rotate-3 lg:z-40',
];

export default function HomeAbout() {
  const t = useTranslations('home.about');

  return (
    <section className="bg-background py-16 lg:py-20 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          <div className="w-full max-w-md lg:w-[35%] lg:pr-6">
            <HeadingBlock
              subtitle={t('subtitle')}
              title={t('title')}
              description={t('description')}
            />
          </div>

          <div className="relative w-full lg:w-[65%]">
            <div className="grid grid-cols-2 gap-3 lg:block lg:h-130">
              {images.map((src, index) => (
                <div
                  key={src}
                  className={`
                    relative lg:absolute
                    ${index === 0 ? 'col-span-2' : ''}
                    ${imageStyles[index]}
                    transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-50
                  `}
                >
                  <div className="bg-card p-2 pb-5 shadow-xl">
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
