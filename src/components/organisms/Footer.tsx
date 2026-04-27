import Container from '@/src/components/templates/Container';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/textura-de-seda.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <Container className="relative z-10 flex flex-col items-center space-y-4 py-12 text-center">
        <img
          src="/logo.webp"
          alt="Qorikallpa"
          className="w-32 brightness-0 invert opacity-90 drop-shadow-lg"
        />

        <p className="max-w-sm text-sm leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {t('description')}
        </p>

        <div className="flex w-48 items-center gap-3">
          <div className="h-px flex-1 bg-white/30" />
          <span className="text-sm text-accent-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            ✦
          </span>
          <div className="h-px flex-1 bg-white/30" />
        </div>

        <p className="font-serif text-sm italic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          &ldquo;{t('quote')}&rdquo;
        </p>
      </Container>

      <div className="relative z-10 border-t border-white/30 bg-black/60">
        <div className="mx-auto max-w-7xl px-6 py-3 text-center">
          <p className="text-xs text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            © {currentYear} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
