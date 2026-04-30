'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
];

export const LanguageSelector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (newLocale: string) => {
    const newPathname = pathName.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-brown-300 rounded-md hover:border-accent-500 transition-all shadow-sm hover:shadow-md group"
      >
        <FaGlobe className="w-4 h-4 text-brown-700 group-hover:text-accent-500 transition-colors" />
        <span className="text-sm font-bold text-brown-900 uppercase">{currentLanguage?.label}</span>
        <FaChevronDown
          className={`w-3 h-3 text-accent-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-brown-300 rounded-md shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-3 text-left text-sm font-bold uppercase transition-colors ${
                lang.code === currentLocale
                  ? 'bg-accent-500 text-white'
                  : 'text-brown-900 hover:bg-cream-200'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
