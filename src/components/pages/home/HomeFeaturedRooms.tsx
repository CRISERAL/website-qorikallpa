import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';
import { HomeRoomsEntity } from '@/src/types/pages/Home';
import RoomCard from '@/src/components/organisms/RoomCard';
import { FaAngleRight } from 'react-icons/fa';

interface Props {
  data: HomeRoomsEntity;
}

export default function HomeFeaturedRooms({ data }: Props) {
  const t = useTranslations('home.rooms');
  const rotations = ['-rotate-3', 'rotate-1', '-rotate-1', 'rotate-2'];

  return (
    <section className="py-8">
      <Container>
        <div className="hidden lg:flex items-center gap-8">
          <div className="w-64 shrink-0 space-y-4">
            <div>
              <p className="uppercase">{t('subtitle')}</p>
              <h2 className="text-3xl font-bold mt-1 leading-tight">{t('title')}</h2>
            </div>
            <div className="w-10 h-px bg-black"></div>
            <p className="leading-relaxed">{t('description')}</p>
            <Link
              href=""
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              {t('primaryButtonLabel')}
              <FaAngleRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 py-6">
            {data.rooms.map((item, i) => {
              const rotate = rotations[i];
              return <RoomCard key={item.id} data={item} className={rotate} />;
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
