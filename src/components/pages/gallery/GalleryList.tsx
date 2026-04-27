'use client';

import environment from '@/src/environment';
import { cn } from '@/src/lib/cn';
import { GalleryListEntity } from '@/src/types/pages/Gallery';
import { useState } from 'react';
import Container from '../../templates/Container';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface Props {
  data: GalleryListEntity;
}
export default function GalleryList({ data }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = data.images.map((image) => ({
    src: `${environment.strapi.apiEndpoint}${image.src.url}`,
    alt: image.alt,
    title: image.alt,
    category: image.category,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
          {galleryImages.map((image, index) => {
            const rotation = rotations[index % rotations.length];
            return (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className={cn(
                  'group cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:z-10 relative',
                  rotation
                )}
              >
                <div className="p-3 pb-6 bg-card">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={galleryImages.map((img) => ({
          src: img.src,
          title: img.title,
        }))}
        styles={{
          container: {
            width: '100vw',
            maxWidth: '100%',
          },
        }}
      />
    </section>
  );
}
