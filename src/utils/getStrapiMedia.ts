import { StrapiImage } from '@/src/types/StrapiImage';

export function getStrapiMedia(image?: StrapiImage | null): string {
  if (!image) return '';

  // si ya es absoluta (ej: CDN o externa)
  if (image.url.startsWith('http')) {
    return image.url;
  }

  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`;
}
