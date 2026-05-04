import ServicesList from '@/src/components/pages/services/ServicesList';
import SharedHero from '@/src/components/pages/SharedHero';
import MainLayout from '@/src/components/templates/MainLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services.hero');

  return (
    <MainLayout>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
      <ServicesList locale={locale} />
    </MainLayout>
  );
}
