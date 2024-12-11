'use client';

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Category = {
  id: string;
  name: string;
};

type SearchResult = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  categories?: Category[];
  category_name?: string;
  image_url?: string;
};

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const t = useTranslations('search');

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement your search logic here
      // This is a placeholder that you can replace with your actual search implementation
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Example Result',
          slug: 'example-result',
          excerpt: 'This is an example search result',
          category_name: 'General'
        }
      ];
      
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(debouncedSearch);
  }, [debouncedSearch, performSearch]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="sr-only">
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </div>
        
        <div className="border-b border-[#BAEDD1]/20">
          <div className="relative">
            <Input
              placeholder={t('placeholder')}
              className="w-full border-0 bg-transparent py-4 pl-12 text-base focus-visible:ring-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('placeholder')}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-0" role="region" aria-label={t('title')}>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#4C9D67] border-t-transparent" role="status">
                <span className="sr-only">{t('loading')}</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-[#BAEDD1]/20">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/blog/${result.slug}`}
                  onClick={onClose}
                  className="flex items-start gap-4 p-4 transition-colors hover:bg-[#BAEDD1]/10"
                >
                  {result.image_url && (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={result.image_url}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1F3028]">{result.title}</h3>
                    {result.category_name && (
                      <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-[#BAEDD1] text-[#1F3028] rounded-full">
                        {result.category_name}
                      </span>
                    )}
                    {result.excerpt && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {result.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-8 text-center text-gray-500" role="status">
              {t('noResults')} "{searchQuery}"
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
