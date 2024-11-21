'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
  created_at: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'hero' | 'compact';
  className?: string;
  priority?: boolean;
}

export function BlogCard({ post, variant = 'default', className = '', priority = false }: BlogCardProps) {
  if (!post?.slug) {
    console.error('BlogCard: Missing required slug', post);
    return null;
  }

  const href = `/blog/${encodeURIComponent(post.slug)}`;

  const variants = {
    default: {
      article: 'flex flex-col group',
      imageContainer: 'relative aspect-video rounded-xl overflow-hidden mb-4',
      contentContainer: '',
      title: 'text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors',
      category: 'inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mb-3',
    },
    featured: {
      article: 'group bg-card rounded-xl overflow-hidden shadow-sm',
      imageContainer: 'relative aspect-[16/9]',
      contentContainer: 'p-4',
      title: 'text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors',
      category: 'absolute top-4 left-4 text-sm bg-primary px-3 py-1 rounded-full text-white',
    },
    hero: {
      article: 'relative overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[3/4]',
      imageContainer: 'h-full',
      contentContainer: 'absolute inset-0 bg-gradient-to-t from-[#1F3028]/70 to-[#1F3028]/20 p-6 flex flex-col justify-end hover:from-[#1F3028]/80 transition-all duration-300',
      title: 'text-2xl md:text-3xl font-bold text-white mb-2',
      category: 'text-sm bg-primary px-3 py-1 rounded-full text-white w-fit mb-4',
    },
    compact: {
      article: 'group flex gap-4 items-start',
      imageContainer: 'relative aspect-[4/3] w-24 rounded-lg overflow-hidden flex-shrink-0',
      contentContainer: 'flex-1 min-w-0',
      title: 'text-base font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors',
      category: 'inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary mb-2',
    },
  };

  const style = variants[variant];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: variant === 'compact' ? 0 : -5 }}
      className={`${style.article} ${className}`}
    >
      <Link href={href}>
        <div className={style.imageContainer}>
          <Image
            src={post.image_url || "/images/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105 duration-300"
            priority={priority}
          />
          {variant === 'featured' && post.categories && (
            <span className={style.category}>
              {post.categories.name}
            </span>
          )}
        </div>
        <div className={style.contentContainer}>
          {variant !== 'featured' && post.categories && (
            <span className={style.category}>
              {post.categories.name}
            </span>
          )}
          <h3 className={style.title}>
            {post.title}
          </h3>
          {post.excerpt && variant !== 'compact' && (
            <p className={`text-muted-foreground ${variant === 'hero' ? 'text-gray-200' : ''} line-clamp-2 mb-4`}>
              {post.excerpt}
            </p>
          )}
          <div className={`flex items-center gap-2 text-sm ${variant === 'hero' ? 'text-gray-200' : 'text-muted-foreground'}`}>
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
