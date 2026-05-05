'use client';

import { Link } from '@/src/i18n/navigation';
import { routes } from '@/src/lib/routes';
import { RoomItem } from '@/src/types/models/RoomItem';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  loading: boolean;
  room: RoomItem | null;
  onClose: () => void;
}

export default function RoomModal({ open, loading, room, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setActiveImg(0);
  }, [room]);

  if (!open) return null;

  const hab = room?.habitacion;
  const tarifa = room?.tarifa;
  const images = hab?.url_imagen ?? [];

  const features = hab?.feature
    ? hab.feature
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  const amenities = hab?.amenities
    ? hab.amenities
        .split('\n')
        .map((a) => a.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={hab?.tipo_habitacion.nombre ?? 'Habitación'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown-900/75 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel
          Mobile  : full-width sheet that slides up from bottom, stacked vertically
          Desktop : two-column side-by-side card
      */}
      <div className="bg-neutral-600 relative z-10 w-full sm:max-w-5xl max-h-[92vh] sm:max-h-[88vh] flex flex-col sm:flex-row shadow-2xl overflow-hidden">
        {/* ══ TOP / LEFT — gallery ══ */}
        <div className="flex sm:w-[58%] sm:shrink-0 bg-brown-900 h-56 sm:h-auto">
          {/* Vertical thumbnail strip — hidden on mobile */}
          {images.length > 1 && (
            <div className="hidden sm:flex flex-col gap-2 p-2 overflow-y-auto w-[72px] shrink-0 scrollbar-none bg-brown-900/80">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                  className={`shrink-0 w-full aspect-square overflow-hidden transition-all duration-200 ${
                    i === activeImg
                      ? 'ring-2 ring-offset-1 ring-offset-brown-900 ring-gold-500 opacity-100'
                      : 'opacity-35 hover:opacity-65'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="relative flex-1 overflow-hidden group">
            {images.length > 0 ? (
              <img
                key={activeImg}
                src={images[activeImg]}
                alt={`Habitación ${hab?.nro_habitacion} — imagen ${activeImg + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brown-800">
                <span className="text-cream-300/30 text-xs uppercase tracking-widest">
                  Sin imagen
                </span>
              </div>
            )}

            {/* Gradient overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-brown-900/80 to-transparent pointer-events-none" />

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                  aria-label="Imagen anterior"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-cream-50/30 bg-brown-900/40 hover:bg-brown-900/70 text-cream-50 backdrop-blur-sm transition-all sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                  aria-label="Imagen siguiente"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center border border-cream-50/30 bg-brown-900/40 hover:bg-brown-900/70 text-cream-50 backdrop-blur-sm transition-all sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Room badge */}
            <div className="absolute bottom-3 left-3">
              <span className="text-cream-100/90 text-xs tracking-[0.2em] uppercase font-light">
                Hab. {hab?.nro_habitacion} &nbsp;·&nbsp; Piso {hab?.piso}
              </span>
            </div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3">
                <span className="text-cream-100/60 text-xs tabular-nums tracking-widest">
                  {activeImg + 1} / {images.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile thumbnail dots — shown only on mobile when 2+ images */}
        {images.length > 1 && (
          <div className="flex sm:hidden gap-1.5 justify-center py-2 bg-brown-900">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === activeImg ? 'bg-cream-50 scale-125' : 'bg-cream-50/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* ══ BOTTOM / RIGHT — info ══ */}
        <div className="flex-1 flex flex-col bg-cream-50 overflow-y-auto">
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center text-brown-700/50 hover:text-brown-900 transition-colors bg-cream-50/80 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12">
              <div className="w-6 h-6 border-2 border-brown-200 border-t-accent-500 rounded-full animate-spin" />
              <p className="text-[10px] text-brown-700/60 tracking-[0.25em] uppercase">Cargando</p>
            </div>
          )}

          {/* Content */}
          {!loading && room && (
            <div className="flex flex-col flex-1 px-6 sm:px-7 py-6 sm:py-7 gap-0">
              {/* Room type */}
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent-500 mb-2">
                {hab?.tipo_habitacion.nombre}
              </p>

              {/* Title + price */}
              <div className="flex items-end justify-between gap-4 pr-6">
                <h2 className="font-playfair text-2xl sm:text-[1.6rem] leading-tight text-brown-900">
                  Habitación {hab?.nro_habitacion}
                </h2>
                {tarifa && (
                  <div className="text-right shrink-0 pb-0.5">
                    <p className="text-[9px] uppercase tracking-[0.25em] text-brown-700/60 mb-0.5">
                      {tarifa.unidad}
                    </p>
                    <p className="font-playfair text-xl sm:text-2xl text-gold-500 leading-none">
                      {tarifa.moneda} {tarifa.precio.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Gold divider */}
              <div className="mt-4 mb-5 h-px bg-linear-to-r from-gold-500/60 via-brown-300/40 to-transparent" />

              {/* Description */}
              {hab?.descripcion && (
                <div className="mb-5">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-brown-700/50 mb-2">
                    Descripción
                  </p>
                  <p className="text-brown-800 text-[0.8rem] leading-relaxed whitespace-pre-line">
                    {hab.descripcion}
                  </p>
                </div>
              )}

              {/* Features + Amenities — side by side on mobile too if space allows */}
              {(features.length > 0 || amenities.length > 0) && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-5">
                  {features.length > 0 && (
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-brown-700/50 mb-2.5">
                        Características
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-[0.75rem] text-brown-800"
                          >
                            <span className="w-3 h-px bg-accent-500/70 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {amenities.length > 0 && (
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-brown-700/50 mb-2.5">
                        Amenities
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {amenities.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-[0.75rem] text-brown-800"
                          >
                            <span className="w-3 h-px bg-gold-500/70 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* IGV note */}
              {tarifa && tarifa.iva > 0 && (
                <p className="text-[9px] text-brown-700/40 tracking-wide mb-4">
                  * Precio incluye {tarifa.iva}% IGV
                </p>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA */}
              <div className="mt-4">
                <div className="h-px bg-linear-to-r from-transparent via-brown-300/50 to-transparent mb-5" />
                <Link
                href={routes.contact}
                  className="bg-[linear-gradient(to_right,var(--color-primary-500)_70%,#BB5E05_100%)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Reservar ahora
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
