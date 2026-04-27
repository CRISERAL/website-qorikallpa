'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export const LanguageSelector = () => {
  const router = useRouter();
  const pathName = usePathname();
  const currentLocale = useLocale();

  const changeLanguage = (newLocale: string) => {
    const newPathname = pathName.replace(`/${currentLocale}`, `/${newLocale}`);

    router.push(newPathname);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      value={currentLocale}
      className="px-4 py-2 text-sm font-bold text-foreground bg-white border-2 border-accent/30 rounded-none hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all cursor-pointer uppercase shadow-md hover:shadow-lg appearance-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b45309' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        paddingRight: '2rem',
      }}
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
  );
};
