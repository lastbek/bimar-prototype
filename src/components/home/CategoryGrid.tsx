"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FileText } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  post_count: number;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  // Validate categories array and ensure required fields exist
  const validCategories = (categories || []).filter(
    (category): category is Category => 
      Boolean(category && category.id && category.name && category.slug)
  );

  if (validCategories.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      }
    },
  };

  return (
    <section className="container py-12 bg-muted/30">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Kategoriyalar
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {validCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="group relative overflow-hidden rounded-xl bg-card shadow-sm"
          >
            <Link href={`/category/${category.slug}`}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image_url || "/images/placeholder.jpg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3028]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-gray-200 text-sm">
                  <FileText className="h-4 w-4" />
                  <span>{category.post_count} maqola</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
