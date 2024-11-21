import Link from 'next/link';
import { Folder } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  post_count?: number;
}

export function ExploreCategories({ categories = [] }: { categories: Category[] }) {
  // Filter out categories without required fields
  const validCategories = categories.filter(
    category => category && category.id && category.slug && category.name
  );

  if (validCategories.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Kategoriyalar</h2>
      <div className="space-y-2">
        {validCategories.map((category) => {
          // Double check slug existence before rendering Link
          if (!category.slug) return null;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-primary" />
                <span>{category.name}</span>
              </div>
              {typeof category.post_count === 'number' && (
                <span className="text-sm text-muted-foreground">
                  {category.post_count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
