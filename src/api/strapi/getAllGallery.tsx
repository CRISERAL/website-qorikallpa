import env from '@/src/environment';
import { Gallery } from '@/src/types/collection-types/gallery';
import { StrapiResponse } from '@/src/types/Strapi';

export async function getAllGallery(locale: string): Promise<StrapiResponse<Gallery[]>> {
  const res = await fetch(`${env.strapi.api}/api/galleries?populate=*&locale=${locale}`, {
    headers: {
      Authorization: `Bearer ${env.strapi.token}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}
