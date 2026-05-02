import { StrapiImage } from '@/src/types/StrapiImage';

export interface Service {
  id: number;
  title: string;
  description: string;
  image: StrapiImage;
}
