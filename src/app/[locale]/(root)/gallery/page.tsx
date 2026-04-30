import { getContentPage } from '@/src/api/strapi/getContentPage';
import GalleryList from '@/src/components/pages/gallery/GalleryList';
import SharedHero from '@/src/components/pages/SharedHero';
import { GalleryBlocks, GalleryContent, GalleryListEntity } from '@/src/types/pages/Gallery';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function renderComponent(component: GalleryBlocks, index: number, t: Translator) {
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

    case 'gallery.gallery-list':
      return <GalleryList key={key} />;

    default:
      return null;
  }
}

export default async function Gallery({ params }: Props) {
  const endpoint = 'gallery-page';
  const { locale } = await params;

  setRequestLocale(locale);

  const res = await getContentPage<GalleryContent>(endpoint, locale);
  const content = res.data.content;

  const t = await getTranslations('gallery.hero');

  return <>{content.map((component, index) => renderComponent(component, index, t))}</>;
}
