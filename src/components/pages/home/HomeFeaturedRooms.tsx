import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/i18n/navigation';

export default function HomeFeaturedRooms() {
  const t = useTranslations('home.rooms');
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
