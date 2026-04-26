import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';

export default function HomeAbout() {
  const t = useTranslations('home.about');
  return (
    <section>
      <Container>
        {t('title')}
        {t('subtitle')}
        {t('description')}
      </Container>
    </section>
  );
}
