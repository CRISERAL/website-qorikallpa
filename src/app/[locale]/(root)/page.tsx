import HomeAbout from '@/src/components/pages/home/HomeAbout';
import HomeFeaturedRooms from '@/src/components/pages/home/HomeFeaturedRooms';
import HomeFeaturedServices from '@/src/components/pages/home/HomeFeaturedServices';
import HomeHero from '@/src/components/pages/home/HomeHero';

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeFeaturedRooms />
      <HomeFeaturedServices />
    </>
  );
}
