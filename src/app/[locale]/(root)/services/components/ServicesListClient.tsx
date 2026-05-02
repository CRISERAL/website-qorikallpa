'use client';

import { Service } from '@/src/types/collection-types/service';
import { getStrapiMedia } from '@/src/utils/getStrapiMedia';
import React from 'react';

interface Props {
  services: Service[];
}

export default function ServicesListClient({ services }: Props) {
  const [stopScroll, setStopScroll] = React.useState(false);

  // dividir en 3 filas
  const rows = [
    services.filter((_, i) => i % 3 === 0),
    services.filter((_, i) => i % 3 === 1),
    services.filter((_, i) => i % 3 === 2),
  ];

  // offsets verticales (clave para efecto escalonado)
  const offsets = ['mt-0', '-mt-8', 'mt-4'];

  return (
    <div
      className="overflow-hidden w-full relative max-w-6xl mx-auto py-10"
      onMouseEnter={() => setStopScroll(true)}
      onMouseLeave={() => setStopScroll(false)}
    >
      {/* Fade izquierda */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />

      <div className="flex flex-col gap-6">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`marquee-inner flex w-fit gap-6 ${offsets[rowIndex]}`}
            style={{
              animationPlayState: stopScroll ? 'paused' : 'running',
              animationDuration: `${20 + rowIndex * 5}s`, // velocidades diferentes 🔥
            }}
          >
            {[...row, ...row].map((item, index) => (
              <div
                key={`${rowIndex}-${index}`}
                className="w-56 h-72 relative group rounded-xl overflow-hidden hover:scale-95 transition-all duration-300 shrink-0"
              >
                <img
                  src={getStrapiMedia(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md bg-black/20">
                  <p className="text-white text-lg font-semibold text-center">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Fade derecha */}
      <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
