import GalleryList from '@/src/app/[locale]/(root)/gallery/components/GalleryList';
import SharedHero from '@/src/components/pages/SharedHero';
import MainLayout from '@/src/components/templates/MainLayout';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gallery.hero');

  return (
    <MainLayout>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
      <GalleryList locale={locale} />
    </MainLayout>
  );
}
