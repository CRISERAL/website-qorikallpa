import { getAllGallery } from '@/src/api/strapi/getAllGallery';
import Container from '../../../../../components/templates/Container';
import PolaroidV2 from '@/src/components/PolaroidV2';
import { getStrapiMedia } from '@/src/utils/getStrapiMedia';

interface Props {
  locale: string;
}

export default async function GalleryList({ locale }: Props) {
  const response = await getAllGallery(locale);
  const gallery = response.data;
  const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
          {gallery.map((item, index) => {
            const rotation = rotations[index % rotations.length];
            const imageUrl = getStrapiMedia(item.image);
            return (
              <PolaroidV2 key={item.id} url={imageUrl} className={rotation}>
                <p className="mt-1.5 text-center text-[10px] font-lato font-light italic text-brown-700/70 leading-tight px-1 truncate">
                  {item.label}
                </p>
              </PolaroidV2>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
