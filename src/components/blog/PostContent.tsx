'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CalendarDays, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { BlogPost } from './BlogCard';

interface PostContentProps {
  post: BlogPost & {
    content: string;
    author?: {
      id: string;
      full_name: string;
      avatar_url?: string;
    } | null;
  };
}

export function PostContent({ post }: PostContentProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          {post.categories && (
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary/10 text-primary mb-4">
              {post.categories.name}
            </span>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-center gap-6 text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author.full_name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.created_at}>
                {formatDate(post.created_at)}
              </time>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </article>
  );
}
