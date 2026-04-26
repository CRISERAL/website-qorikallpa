import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function HomeHero() {
  const t = useTranslations('home.hero');
  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <div>
        <Link href="">{t('primaryButtonLabel')}</Link>
        <Link href="">{t('secondaryButtonLabel')}</Link>
      </div>
    </section>
  );
}
