import env from '@/src/environment';
import { StrapiResponse } from '@/src/types/Strapi';

export async function getContentPage<T>(
  endpoint: string,
  locale: string
): Promise<StrapiResponse<T>> {
  const res = await fetch(`${env.strapi.api}/api/${endpoint}?populate=*&locale=${locale}`, {
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
