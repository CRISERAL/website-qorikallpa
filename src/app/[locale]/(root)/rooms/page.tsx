import { getContentPage } from '@/src/api/strapi/getContentPage';
import RoomsListV2 from '@/src/components/pages/rooms/RoomsListV2';
import SharedHero from '@/src/components/pages/SharedHero';
import { RoomsBlocks, RoomsContent } from '@/src/types/pages/Rooms';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    fecha_inicio?: string;
    fecha_fin?: string;
  }>;
};

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function renderComponent(
  component: RoomsBlocks,
  index: number,
  t: Translator,
  locale: string,
  fecha_inicio?: string,
  fecha_fin?: string
) {
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

    case 'room.room-list':
      return (
        <RoomsListV2 key={key} locale={locale} fecha_inicio={fecha_inicio} fecha_fin={fecha_fin} />
      );

    default:
      return null;
  }
}

export default async function Rooms({ params, searchParams }: Props) {
  const endpoint = 'room-page';

  const { locale } = await params;
  const { fecha_inicio, fecha_fin } = await searchParams;

  setRequestLocale(locale);

  const res = await getContentPage<RoomsContent>(endpoint, locale);
  const content = res.data.content;

  const t = await getTranslations('rooms.hero');

  return (
    <>
      {content.map((component, index) =>
        renderComponent(component, index, t, locale, fecha_inicio, fecha_fin)
      )}
    </>
  );
}
