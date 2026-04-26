import { StrapiImage } from '@/src/types/StrapiImage';

export interface SharedSectionHero {
  __component: 'shared.section-hero';
  id: number;
}

export interface SharedSectionAbout {
  __component: 'shared.section-about';
  id: number;
}

export interface Img {
  id: number;
  category: string;
  src: StrapiImage;
  alt: string;
}
