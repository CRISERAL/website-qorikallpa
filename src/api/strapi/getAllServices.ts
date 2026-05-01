import env from '@/src/environment';
import { Service } from '@/src/types/collection-types/service';
import { StrapiResponse } from '@/src/types/Strapi';

export async function getAllServices<T>(locale: string): Promise<StrapiResponse<Service[]>> {
  const res = await fetch(`${env.strapi.api}/api/services?populate=*&locale=${locale}`, {
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
