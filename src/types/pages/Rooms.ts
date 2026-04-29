import { SharedSectionHero } from '@/src/types/Shared';
import { StrapiEntity } from '@/src/types/Strapi';

export interface RoomsListEntity {
  __component: 'room.room-list';
  id: number;
}

export type RoomsBlocks = SharedSectionHero | RoomsListEntity;

export type RoomsContent = StrapiEntity<{
  content: RoomsBlocks[];
}>;
