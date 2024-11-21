'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, Language } from '@/config/languages';
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale() as Language;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Language) => {
    // Get the current path without the locale
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    // Navigate to the same path with new locale
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-[#BAEDD1]/20"
        >
          <span className="text-lg">{languages[locale].flag}</span>
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.entries(languages) as [Language, { name: string, flag: string }][]).map(([key, { name, flag }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleLocaleChange(key)}
            className={`cursor-pointer ${key === locale ? 'bg-[#BAEDD1]/20' : ''}`}
          >
            <span className="text-lg mr-2">{flag}</span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
