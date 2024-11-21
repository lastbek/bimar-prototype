'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { SearchModal } from "./SearchModal";

type Category = {
  id: string;
  name: string;
  slug: string;
};

const locales = ['uz', 'ru'];

export default function Navigation() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  React.useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (data) setCategories(data);
    };

    fetchCategories();
  }, [supabase]);

  const currentLocale = pathname.startsWith('/ru') ? 'ru' : 'uz';

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(/^\/[^\/]+/, '');
    router.push(`/${newLocale}${currentPath}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#BAEDD1]/20 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container flex h-14 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Bimar</span>
          </Link>
          <div className="flex gap-6 text-sm">
            <Link
              href="/blog"
              className={pathname === "/blog" ? "text-[#4C9D67]" : ""}
            >
              Blog
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={pathname === `/categories/${category.slug}` ? "text-[#4C9D67]" : ""}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="px-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
            </svg>
            <span className="sr-only">Search</span>
          </Button>
          <div className="flex gap-2">
            {locales.map((locale) => (
              <Button
                key={locale}
                variant={currentLocale === locale ? "default" : "ghost"}
                size="sm"
                onClick={() => switchLocale(locale)}
              >
                {locale.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </nav>
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
