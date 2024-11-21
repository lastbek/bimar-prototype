'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

export function ViewCounter({ 
  slug, 
  initialViews = 0,
  trackView = true
}: { 
  slug: string; 
  initialViews?: number;
  trackView?: boolean;
}) {
  const [views, setViews] = useState(initialViews);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchUniqueViews = async () => {
      try {
        // First get the blog post id
        const { data: post } = await supabase
          .from('blogs')
          .select('id')
          .eq('slug', slug)
          .single();

        if (!post) return;

        // Get unique views count
        const { data: viewsData } = await supabase
          .from('blog_views')
          .select('ip_address')
          .eq('blog_id', post.id);

        const uniqueViews = new Set(viewsData?.map(view => view.ip_address)).size;
        setViews(uniqueViews);
        setIsLoading(false);

        // Track the view if needed
        if (trackView) {
          await supabase.from('blogs')
            .select('id')
            .eq('slug', slug)
            .single()
            .then(async ({ data: post }) => {
              if (post) {
                await fetch('/api/blog/view', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ slug }),
                });
              }
            });
        }
      } catch (error) {
        console.error('Error fetching views:', error);
        setIsLoading(false);
      }
    };

    fetchUniqueViews();
  }, [slug, trackView, supabase]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground">
        <Eye className="h-4 w-4" />
        <span>...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Eye className="h-4 w-4" />
      <span>{views} noyob ko'rish</span>
    </div>
  );
}
