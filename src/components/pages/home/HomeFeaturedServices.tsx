import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';

export default function HomeFeaturedServices() {
  const t = useTranslations('home.services');
  return (
    <section>
      <Container>
        {t('title')}
        {t('subtitle')}
        {t('description')}
        <Link href="">{t('primaryButtonLabel')}</Link>
      </Container>
    </section>
  );
}
