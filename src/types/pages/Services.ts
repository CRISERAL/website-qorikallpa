import { SharedSectionHero } from '@/src/types/Shared';
import { StrapiEntity } from '@/src/types/Strapi';

export interface ServiceListEntity {
  __component: 'service.service-list';
  id: number;
}

export type ServiceBlocks = SharedSectionHero | ServiceListEntity;

export type ServiceContent = StrapiEntity<{
  content: ServiceBlocks[];
}>;
