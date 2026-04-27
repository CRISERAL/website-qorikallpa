import { getContentPage } from '@/src/api/strapi/getContentPage';
import HomeAbout from '@/src/components/pages/home/HomeAbout';
import HomeFeaturedRooms from '@/src/components/pages/home/HomeFeaturedRooms';
import HomeFeaturedServices from '@/src/components/pages/home/HomeFeaturedServices';
import HomeHero from '@/src/components/pages/home/HomeHero';
import {
  HomeBlocks,
  HomeContent,
  HomeRoomsEntity,
  HomeServicesEntity,
} from '@/src/types/pages/Home';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

function renderComponent(component: HomeBlocks, index: number) {
  const key = `${component.id}-${index}`;
  switch (component.__component) {
    case 'shared.section-hero':
      return <HomeHero key={key} />;
    case 'shared.section-about':
      return <HomeAbout key={key} />;
    case 'home.home-rooms':
      return <HomeFeaturedRooms key={key} data={component as HomeRoomsEntity} />;
    case 'home.home-services':
      return <HomeFeaturedServices key={key} data={component as HomeServicesEntity} />;
    default:
      return null;
  }
}

export default async function Home({ params }: Props) {
  const endpoint = 'home-page';
  const { locale } = await params;
  setRequestLocale(locale);
  const res = await getContentPage<HomeContent>(endpoint, locale);
  const content = res.data.content;
  return (
    <>{content.map((component: HomeBlocks, index: number) => renderComponent(component, index))}</>
  );
}
