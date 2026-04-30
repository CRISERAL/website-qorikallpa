import environment from '@/src/environment';
import { Gallery } from '@/src/types/collection-types/gallery';
import { StrapiResponse } from '@/src/types/Strapi';

export async function getAllGallery(): Promise<StrapiResponse<Gallery[]>> {
  const res = await fetch(`${environment.strapi.apiEndpoint}/api/galleries?populate=*`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}
