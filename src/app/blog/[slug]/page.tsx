import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Tag } from 'lucide-react';
import Link from 'next/link';
import { Database } from '@/lib/database.types';

type Categories = Database['public']['Tables']['categories']['Row'];
type Tags = Database['public']['Tables']['tags']['Row'];

type BlogWithRelations = Database['public']['Tables']['blogs']['Row'] & {
  category: Categories | null;
  blog_tags: Array<{
    tags: Tags;
  }>;
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  console.log('Fetching blog post with slug:', params.slug);

  // Get the blog post with its relations
  const { data, error: blogError } = await supabase
    .from('blogs')
    .select(`
      *,
      category:category_id (
        id,
        name,
        slug,
        description,
        created_at,
        show_in_nav
      ),
      blog_tags (
        tags:tag_id (
          id,
          name,
          slug,
          description,
          created_at
        )
      )
    `)
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (blogError) {
    console.error('Error fetching blog post:', blogError);
    return notFound();
  }

  console.log('Blog post data:', data);

  if (!data) {
    console.log('No blog post found with slug:', params.slug);
    return notFound();
  }

  const blog = data as unknown as BlogWithRelations;

  return (
    <div className="container mx-auto py-10">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          {blog.excerpt && (
            <p className="text-xl text-muted-foreground mb-4">
              {blog.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {blog.category?.name || 'Uncategorized'}
            </span>
            <span>•</span>
            <span>
              {format(new Date(blog.created_at), 'MMMM d, yyyy')}
            </span>
            {blog.read_time && (
              <>
                <span>•</span>
                <span>{blog.read_time} daqiqa o'qish</span>
              </>
            )}
          </div>
        </header>

        {blog.image_url && (
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
        )}

        <div 
          className="prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ 
            __html: blog.content as string 
          }}
        />

        {blog.blog_tags && 
         blog.blog_tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center gap-3">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {blog.blog_tags.map(({ tags }) => (
                  <Link
                    key={tags.id}
                    href={`/tags/${tags.slug}`}
                    className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full hover:bg-secondary/20 transition-colors"
                  >
                    #{tags.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
