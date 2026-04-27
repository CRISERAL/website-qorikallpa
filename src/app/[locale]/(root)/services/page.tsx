import SharedHero from '@/src/components/pages/SharedHero';
import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services.hero');
  return (
    <>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
    </>
  );
}
