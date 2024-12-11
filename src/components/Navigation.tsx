'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/SearchModal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#BAEDD1]/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Medical Blog
            </span>
          </Link>
          <div className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href="/blog"
              className={`transition-colors hover:text-foreground/80 ${
                pathname?.startsWith("/blog")
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              {t('blog')}
            </Link>
            <Link
              href="/diseases"
              className={`transition-colors hover:text-foreground/80 ${
                pathname?.startsWith("/diseases")
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              {t('diseases')}
            </Link>
            <Link
              href="/symptoms"
              className={`transition-colors hover:text-foreground/80 ${
                pathname?.startsWith("/symptoms")
                  ? "text-foreground"
                  : "text-foreground/60"
              }`}
            >
              {t('symptoms')}
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="ghost"
              className="w-9 px-0 hover:bg-[#BAEDD1]/20"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">{t('search')}</span>
            </Button>
          </div>
          <LanguageSwitcher />
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
