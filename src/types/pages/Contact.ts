import { StrapiEntity } from '@/src/types/Strapi';
import { SharedSectionHero } from '@/src/types/Shared';

export interface ContactInfoEntity {
  __component: 'contact.contact-info';
  id: number;
}

export type ContactBlocks = SharedSectionHero | ContactInfoEntity;

export type ContactContent = StrapiEntity<{
  content: ContactBlocks[];
}>;
