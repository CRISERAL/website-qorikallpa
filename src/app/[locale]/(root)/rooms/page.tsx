import RoomsList from '@/src/components/pages/rooms/RoomsList';
import SharedHero from '@/src/components/pages/SharedHero';
import { useTranslations } from 'next-intl';

export default function Rooms() {
  const t = useTranslations('rooms.hero');
  return (
    <>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
      <RoomsList />
    </>
  );
}
