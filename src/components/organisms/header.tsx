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
    <header className="relative z-50 bg-background shadow-md">
      {/* Top Section with Logo and Language Selector */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src="/textura-de-seda.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-3">
            {/* Left Side - Empty space for symmetry on desktop, Hamburger on mobile */}
            <div className="w-10 lg:w-24">
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-10 h-10 text-foreground hover:text-accent transition-colors lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>
            </div>

            {/* Logo - Center */}
            <Link href={routes.home} className="flex-shrink-0">
              <img src="/logo.webp" alt="Hostal Koriqallpa" className="h-14 w-auto" />
            </Link>

            {/* Right Side - Language Selector */}
            <div className="flex items-center justify-end w-10 lg:w-24">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden lg:block relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src="/textura-de-seda.webp"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ul className="flex items-center justify-center gap-10 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base font-bold text-white hover:text-[#C8860A] transition-colors tracking-wide relative group drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-muted">
          <nav className="mx-auto max-w-7xl px-6 py-4">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-xs font-semibold text-secondary hover:text-accent transition-colors tracking-wider py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
