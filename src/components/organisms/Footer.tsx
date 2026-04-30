import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');

  return (
    <footer className="relative">
      {/* Textura de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/textura-de-seda.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brown-900/90" />
      </div>

      {/* Contenido principal con fondo marrón oscuro */}
      <div className="relative z-10 py-3">
        <Container>
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Logo - solo visible en móvil */}
            <img
              src="/logo.webp"
              alt="Hostal Koriqallpa"
              className="h-16 w-auto brightness-0 invert opacity-90 lg:hidden"
            />

            {/* Mensaje principal */}
            <p className="text-sm md:text-base text-cream-100 font-light">
              Gracias por elegir lo auténtico, gracias por elegir Koriqallpa.
            </p>

            {/* Decoración central con diamantes */}
            <div className="flex items-center gap-2 py-1">
              <div className="h-px w-8 bg-gold-500" />
              <span className="text-gold-500 text-sm">◆</span>
              <div className="w-1.5 h-1.5 rotate-45 bg-gold-500" />
              <span className="text-gold-500 text-sm">◆</span>
              <div className="h-px w-8 bg-gold-500" />
            </div>

            {/* Ubicación */}
            <p className="text-xs text-cream-200 uppercase tracking-[0.3em] font-semibold">
              Cusco · Perú
            </p>
          </div>
        </Container>

        {/* Badge circular con logo - sobresale hacia arriba - solo desktop */}
        <div className="absolute -top-16 right-8 hidden lg:block">
          <div className="relative w-32 h-32 rounded-full bg-brown-800 border-4 border-gold-500 shadow-2xl">
            {/* Logo centrado verticalmente y horizontalmente */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="/logo.webp"
                alt="Hostal Koriqallpa"
                className="w-14 h-14 object-contain mb-1 brightness-0 invert opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
