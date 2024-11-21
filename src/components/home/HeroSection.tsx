"use client";

import { motion } from 'framer-motion';
import { BlogCard, BlogPost } from '@/components/blog/BlogCard';

interface HeroSectionProps {
  posts: BlogPost[];
}

export function HeroSection({ posts }: HeroSectionProps) {
  if (!posts?.length) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="container py-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Featured Post */}
        <BlogCard post={posts[0]} variant="hero" priority />

        {/* Side Posts */}
        <div className="grid gap-6">
          {posts.slice(1, 3).map((post) => (
            <BlogCard key={post.id} post={post} variant="compact" />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
