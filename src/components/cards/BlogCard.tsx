import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/lib/utils/image';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  image_url?: string;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url?: string;
  created_at: string;
  read_time?: number;
  category?: Category;
  tags?: Tag[];
}

interface BlogCardProps {
  blog: BlogPost;
  className?: string;
}

export function BlogCard({ blog, className }: BlogCardProps) {
  if (!blog || !blog.slug) {
    return null;
  }

  return (
    <div className={cn("group h-full", className)}>
      <Card className="h-full flex flex-col">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={getImageUrl(blog.image_url)}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            {blog.category && (
              <>
                <span className="text-sm font-medium text-primary">
                  {blog.category.name || 'Uncategorized'}
                </span>
                <span className="text-gray-500">•</span>
              </>
            )}
            <span className="text-sm text-gray-500">
              {format(new Date(blog.created_at), 'dd.MM.yyyy')}
            </span>
          </div>
          <Link href={`/blog/${blog.slug}`} className="block">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {blog.excerpt}
            </p>
          </Link>
          {blog.read_time && (
            <div className="text-sm text-gray-500 mt-auto mb-3">
              {blog.read_time} daqiqa o'qish
            </div>
          )}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {blog.tags.map((tag) => (
                <Link 
                  key={tag.id} 
                  href={`/tags/${tag.slug}`}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
