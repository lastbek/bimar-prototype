'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Eye, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/lib/database.types';

type Blog = Database['public']['Tables']['blogs']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'];
  tags: {
    tags: Database['public']['Tables']['tags']['Row'];
  }[];
  unique_views_count: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // First get all posts with their categories and tags
        const { data: postsData, error: postsError } = await supabase
          .from('blogs')
          .select(`
            *,
            categories:category_id (*),
            tags:blog_tags (
              tags:tag_id (*)
            )
          `)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        if (postsData) {
          // Then get unique view counts for all posts in a single query
          const { data: viewsData, error: viewsError } = await supabase
            .from('blog_views')
            .select('blog_id, ip_address')
            .in('blog_id', postsData.map(post => post.id));

          if (viewsError) throw viewsError;

          // Calculate unique views for each post
          const uniqueViewsMap = new Map<string, Set<string>>();
          viewsData?.forEach(view => {
            if (!uniqueViewsMap.has(view.blog_id)) {
              uniqueViewsMap.set(view.blog_id, new Set());
            }
            uniqueViewsMap.get(view.blog_id)?.add(view.ip_address);
          });

          // Combine posts with their unique view counts
          const postsWithViews = postsData.map(post => ({
            ...post,
            unique_views_count: uniqueViewsMap.get(post.id)?.size || 0
          }));

          setPosts(postsWithViews as Blog[]);
        }
      } catch (error: any) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Xato',
          description: 'Maqolalarni yuklashda xatolik yuz berdi',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [supabase, toast]);

  const handlePublish = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .update({ published })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, published } : post
        )
      );

      // Refresh the router to update all pages
      router.refresh();

      toast({
        title: 'Muvaffaqiyatli',
        description: published
          ? 'Maqola e\'lon qilindi'
          : 'Maqola e\'lon qilinmadi',
      });
    } catch (error: any) {
      console.error('Error publishing post:', error);
      toast({
        title: 'Xato',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Maqolalar</h1>
        <Button onClick={() => router.push('/admin/posts/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Yangi maqola
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Hozircha maqolalar yo'q
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex items-start justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString("uz-UZ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views || 0} ko'rildi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{post.unique_views_count || 0} noyob ko'rish</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {post.categories.name}
                  </span>
                  {post.tags.map(({ tags }) => (
                    <span
                      key={tags.id}
                      className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded"
                    >
                      {tags.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={post.published ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => handlePublish(post.id, !post.published)}
                >
                  {post.published ? 'Yashirish' : 'E\'lon qilish'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                >
                  Tahrirlash
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
