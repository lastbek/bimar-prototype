import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { BlogCard } from '@/components/cards/BlogCard';

async function getTagAndBlogs(slug: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Fetch tag and its associated blogs
  const { data: tag, error: tagError } = await supabase
    .from('tags')
    .select(`
      id,
      name,
      description,
      blog_tags!inner (
        blogs (
          id,
          title,
          slug,
          excerpt,
          content,
          image_url,
          read_time,
          created_at,
          category:categories (
            id,
            name
          )
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (tagError) {
    console.error('Error fetching tag:', tagError);
    return null;
  }

  // Transform the data structure
  const blogs = tag?.blog_tags?.map((bt: any) => ({
    ...bt.blogs,
    category: bt.blogs.category
  })) || [];

  return {
    tag,
    blogs
  };
}

export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getTagAndBlogs(params.slug);

  if (!data?.tag) {
    notFound();
  }

  const { tag, blogs } = data;

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              #{tag.name}
            </h1>
            {tag.description && (
              <p className="text-lg text-gray-600">{tag.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {blogs.length} ta maqola
            </p>
          </header>

          {/* Blog Posts Grid */}
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog: any) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog}
                  className="h-full"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Bu teg bilan bog'liq maqolalar topilmadi.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
