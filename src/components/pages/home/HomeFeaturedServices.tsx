import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import HeadingBlock from '@/src/components/molecules/HeadingBlock';
import { HomeServicesEntity } from '@/src/types/pages/Home';
import { FaAngleRight } from 'react-icons/fa';
import RoomService from '@/src/components/organisms/RoomService';
import { routes } from '@/src/lib/routes';

interface Props {
  data: HomeServicesEntity;
}

export default function HomeFeaturedServices({ data }: Props) {
  const t = useTranslations('home.services');
  const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];

  return (
    <section className="py-8 bg-background">
      <Container>
        <div className="flex items-center lg:gap-8 flex-col lg:flex-row">
          <HeadingBlock
            subtitle={t('subtitle')}
            title={t('title')}
            description={t('description')}
            primaryButtonLabel={t('primaryButtonLabel')}
            href={routes.services}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-6">
            {data.services.map((item, i) => {
              const rotate = rotations[i];
              return <RoomService key={item.id} data={item} className={rotate} />;
            })}
          </div>
          <Link
            href={routes.services}
            className="lg:hidden inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-xs font-semibold uppercase tracking-widest hover:bg-accent-light transition-colors"
          >
            {t('primaryButtonLabel')}
            <FaAngleRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
