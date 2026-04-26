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
    <>
      <select onChange={(e) => changeLanguage(e.target.value)} value={currentLocale}>
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </>
  );
};
