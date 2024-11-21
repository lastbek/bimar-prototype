import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/lib/utils/image';
import { Clock, Calendar, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/buttons/ShareButton';

export const revalidate = 3600;

async function getBlogBySlug(slug: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: blog, error } = await supabase
    .from('blogs')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      image_url,
      read_time,
      created_at,
      category_id,
      categories (
        id,
        name
      ),
      blog_tags (
        tags (
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .single();

  console.log('Fetched blog:', { slug, blog, error });

  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }

  // Map the categories data to the category field
  if (blog && blog.categories) {
    blog.category = blog.categories;
    delete blog.categories;
  }

  // Map the tags data
  if (blog && blog.blog_tags) {
    blog.tags = blog.blog_tags.map((bt: any) => bt.tags);
    delete blog.blog_tags;
  }

  return blog;
}

async function getRelatedBlogs(currentBlogId: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, title, slug, image_url, excerpt, created_at')
    .neq('id', currentBlogId)
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  return blogs || [];
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.id);

  return (
    <main className="py-16">
      <article className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600">
                  {blog.category?.name || 'Uncategorized'}
                </span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">
                  {format(new Date(blog.created_at), 'MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{blog.read_time} daqiqa o'qish</span>
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <ShareButton url={`/blog/${blog.slug}`} title={blog.title} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{blog.excerpt}</p>

          {blog.image_url && (
            <div className="relative aspect-video w-full mb-12 rounded-lg overflow-hidden">
              <Image
                src={getImageUrl(blog.image_url)}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <Tag className="h-4 w-4 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: any) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Card key={relatedBlog.id} className="h-full">
                  <Link href={`/blog/${relatedBlog.slug}`}>
                    <div className="relative h-48">
                      <Image
                        src={getImageUrl(relatedBlog.image_url)}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {relatedBlog.excerpt}
                      </p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
