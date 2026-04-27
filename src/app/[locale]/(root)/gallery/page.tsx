import GalleryList from '@/src/components/pages/gallery/GalleryList';
import SharedHero from '@/src/components/pages/SharedHero';
import { useTranslations } from 'next-intl';

export default function Gallery() {
  const t = useTranslations('gallery.hero');
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
