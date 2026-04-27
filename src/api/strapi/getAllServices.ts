import environment from '@/src/environment';
import { Service } from '@/src/types/collection-types/service';
import { StrapiResponse } from '@/src/types/Strapi';

export async function getAllServices<T>(locale: string): Promise<StrapiResponse<Service[]>> {
  const res = await fetch(
    `${environment.strapi.apiEndpoint}/api/services?populate=*&locale=${locale}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error(`Error en API: ${res.status}`);
  }

  return res.json();
}
