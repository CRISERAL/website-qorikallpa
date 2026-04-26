import { StrapiImage } from '@/src/types/StrapiImage';

export interface Room {
  id: number;
  name: string;
  description: string;
  type: string;
  images: StrapiImage[];
  features: string;
  amenities: string;
  slug: string;
  price: number;
}
