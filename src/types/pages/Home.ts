import { SharedSectionAbout, SharedSectionHero } from '@/src/types/Shared';
import { Room } from '@/src/types/collection-types/room';
import { Service } from '@/src/types/collection-types/service';
import { StrapiEntity } from '@/src/types/Strapi';

export interface HomeRoomsEntity {
  __component: 'home.home-rooms';
  id: number;
  rooms: Room[];
}

export interface HomeServicesEntity {
  __component: 'home.home-services';
  id: number;
  services: Service[];
}

export type HomeBlocks =
  | SharedSectionHero
  | SharedSectionAbout
  | HomeRoomsEntity
  | HomeServicesEntity;

export type HomeContent = StrapiEntity<{
  content: HomeBlocks[];
}>;
