import { getContentPage } from '@/src/api/strapi/getContentPage';
import ServicesList from '@/src/components/pages/services/ServicesList';
import SharedHero from '@/src/components/pages/SharedHero';
import { ServiceBlocks, ServiceContent } from '@/src/types/pages/Services';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function renderComponent(component: ServiceBlocks, index: number, t: Translator, locale: string) {
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

    case 'service.service-list':
      return <ServicesList key={key} locale={locale} />;

    default:
      return null;
  }
}

export default async function Gallery({ params }: Props) {
  const endpoint = 'service-page';
  const { locale } = await params;

  setRequestLocale(locale);

  const res = await getContentPage<ServiceContent>(endpoint, locale);
  const content = res.data.content;

  const t = await getTranslations('services.hero');

  return <>{content.map((component, index) => renderComponent(component, index, t, locale))}</>;
}
