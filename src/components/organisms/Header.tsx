'use client';

import { LanguageSelector } from '@/src/components/molecules/LanguageSelector';
import { Link } from '@/src/i18n/navigation';
import { routes } from '@/src/lib/routes';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('header.nav');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: routes.home, label: t('home') },
    { href: routes.rooms, label: t('rooms') },
    { href: routes.services, label: t('services') },
    { href: routes.gallery, label: t('gallery') },
    { href: routes.contact, label: t('contact') },
  ];

  return (
    <header className="relative z-50 bg-cream-100 shadow-md">
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-4">
            <Link href={routes.home} className="flex items-center gap-4">
              <img src="/logo.webp" alt="Hostal Korikallpa" className="h-16 w-auto" />
            </Link>
            <nav className="flex-1 flex justify-center">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold text-brown-900 hover:text-accent-500 transition-colors tracking-wide uppercase relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-center w-10 h-10 text-brown-900 hover:text-accent-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
            <Link href={routes.home} className="flex items-center gap-2">
              <img src="/logo.webp" alt="Hostal Korikallpa" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="border-t border-brown-300 bg-cream-100">
            <nav className="mx-auto max-w-7xl px-6 py-4">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm font-bold text-brown-900 hover:text-accent-500 transition-colors tracking-wide uppercase py-2"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
