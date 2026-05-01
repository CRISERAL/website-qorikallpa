import RoomsListV2 from '@/src/components/pages/rooms/RoomsListV2';
import SharedHero from '@/src/components/pages/SharedHero';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    tipo?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
  }>;
};

export default async function Rooms({ params, searchParams }: Props) {
  const { locale } = await params;
  const filters = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('rooms.hero');
  return (
    <>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />

      <RoomsListV2 locale={locale} searchParams={filters} />
    </>
  );
}
