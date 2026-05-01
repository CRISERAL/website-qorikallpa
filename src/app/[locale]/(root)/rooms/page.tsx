import RoomsListV2 from '@/src/components/pages/rooms/RoomsListV2';
import SharedHero from '@/src/components/pages/SharedHero';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Rooms({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('rooms.hero');

  return (
    <>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
      <RoomsListV2 locale={locale} />
    </>
  );
}
