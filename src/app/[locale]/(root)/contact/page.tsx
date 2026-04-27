import { getContentPage } from '@/src/api/strapi/getContentPage';
import ContactInfo from '@/src/components/pages/contact/ContactInfo';
import SharedHero from '@/src/components/pages/SharedHero';
import { ContactBlocks, ContactContent, ContactInfoEntity } from '@/src/types/pages/Contact';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function renderComponent(component: ContactBlocks, index: number, t: Translator) {
  const key = `${component.id}-${index}`;

  switch (component.__component) {
    case 'shared.section-hero':
      return (
        <SharedHero
          key={key}
          title={t('title')}
          description={t('description')}
          backgroundImage="/bg-about-2.jpg"
        />
      );

    case 'contact.contact-info':
      return <ContactInfo key={key} data={component as ContactInfoEntity} />;

    default:
      return null;
  }
}

export default async function Contact({ params }: Props) {
  const endpoint = 'contact-page';
  const { locale } = await params;

  setRequestLocale(locale);

  const res = await getContentPage<ContactContent>(endpoint, locale);
  const content = res.data.content;

  const t = await getTranslations('contact.hero');

  return <>{content.map((component, index) => renderComponent(component, index, t))}</>;
}
