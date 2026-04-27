import { Img, SharedSectionHero } from '@/src/types/Shared';
import { StrapiEntity } from '@/src/types/Strapi';

export interface GalleryListEntity {
  __component: 'gallery.gallery-list';
  id: number;
  images: Img[];
}

export type GalleryBlocks = SharedSectionHero | GalleryListEntity;

export type GalleryContent = StrapiEntity<{
  content: GalleryBlocks[];
}>;
