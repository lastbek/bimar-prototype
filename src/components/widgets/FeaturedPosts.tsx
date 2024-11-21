import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Post {
  id: string;
  title: string;
  slug: string;
  image_url?: string;
  created_at: string;
}

export function FeaturedPosts({ posts = [] }: { posts: Post[] }) {
  // Filter out any posts without required fields
  const validPosts = posts.filter(post => post && post.id && post.slug && post.title);

  if (validPosts.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Mashhur maqolalar</h2>
      <div className="space-y-6">
        {validPosts.map((post) => {
          // Double check slug existence before rendering Link
          if (!post.slug) return null;

          return (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="flex gap-4">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={post.image_url || '/images/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="line-clamp-2 font-medium group-hover:text-primary">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.created_at}>
                      {formatDate(post.created_at)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
