import { getAllGallery } from '@/src/api/strapi/getAllGallery';
import { cn } from '@/src/lib/cn';
import Container from '../../templates/Container';
import env from '@/src/environment';

export default async function GalleryList() {
  const response = await getAllGallery();
  const images = response.data.flatMap((gallery) => gallery.images);
  const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
          {images.map((image, index) => {
            const imageUrl = image.formats?.medium?.url || image.url;
            const rotation = rotations[index % rotations.length];
            return (
              <div
                key={image.id}
                className={cn(
                  'group cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative',
                  rotation
                )}
              >
                <div className="p-3 pb-6 bg-card">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={`${env.strapi.api}${imageUrl}`}
                      alt={image.alternativeText || image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
