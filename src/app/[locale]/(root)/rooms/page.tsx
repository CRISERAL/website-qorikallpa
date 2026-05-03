import RoomsListV2 from '@/src/components/pages/rooms/RoomsListV2';
import SharedHero from '@/src/components/pages/SharedHero';
import MainLayout from '@/src/components/templates/MainLayout';
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
    <MainLayout>
      <RoomsListV2 locale={locale} searchParams={filters} />
    </MainLayout>
  );
}
