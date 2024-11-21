"use client";

import { motion } from 'framer-motion';
import { BlogCard, BlogPost } from '@/components/blog/BlogCard';

interface LatestPostsProps {
  posts: BlogPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <section className="container py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        So'nggi Maqolalar
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} variant="default" />
        ))}
      </motion.div>
    </section>
  );
}
