import GalleryList from '@/src/components/pages/gallery/GalleryList';
import SharedHero from '@/src/components/pages/SharedHero';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Gallery({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gallery.hero');

  return (
    <>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
      <GalleryList />
    </>
  );
}
