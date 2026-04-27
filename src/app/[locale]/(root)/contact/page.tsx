import ContactInfo from '@/src/components/pages/contact/ContactInfo';
import SharedHero from '@/src/components/pages/SharedHero';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contact.hero');
  return (
    <>
      <SharedHero
        title={t('title')}
        description={t('description')}
        backgroundImage="/bg-about-2.jpg"
      />
      <ContactInfo />
    </>
  );
}
