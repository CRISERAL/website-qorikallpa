import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { HomeRoomsEntity } from '@/src/types/pages/Home';
import RoomCard from '@/src/components/organisms/RoomCard';
import { FaAngleRight } from 'react-icons/fa';
import HeadingBlock from '@/src/components/molecules/HeadingBlock';
import { routes } from '@/src/lib/routes';

interface Props {
  data: HomeRoomsEntity;
}

export default function HomeFeaturedRooms({ data }: Props) {
  const t = useTranslations('home.rooms');
  const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];

  return (
    <section className="py-8 bg-background">
      <Container>
        <div className="flex items-center lg:gap-8 flex-col lg:flex-row-reverse">
          <HeadingBlock
            subtitle={t('subtitle')}
            title={t('title')}
            description={t('description')}
            primaryButtonLabel={t('primaryButtonLabel')}
            href={routes.rooms}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-6">
            {data.rooms.map((item, i) => {
              const rotate = rotations[i];
              return <RoomCard key={item.id} data={item} className={rotate} />;
            })}
          </div>
          <Link
            href={routes.rooms}
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
