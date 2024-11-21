import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BlogCard } from '@/components/cards/BlogCard';

export const revalidate = 3600;

async function getBlogs() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: blogs, error } = await supabase
    .from('blogs')
    .select(`
      id,
      title,
      slug,
      excerpt,
      image_url,
      read_time,
      created_at,
      category_id,
      published
    `)
    .eq('published', true)
    .order('created_at', { ascending: false });

  console.log('Fetched blogs raw:', { blogs, error });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  // If we have blogs, get their categories
  if (blogs && blogs.length > 0) {
    const categoryIds = [...new Set(blogs.map(blog => blog.category_id))].filter(Boolean);
    
    if (categoryIds.length > 0) {
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name, image_url')
        .in('id', categoryIds);

      console.log('Fetched categories:', categories);

      if (categories) {
        const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
        blogs.forEach(blog => {
          blog.category = blog.category_id ? categoryMap.get(blog.category_id) : undefined;
        });
      }
    }
  }

  console.log('Final blogs with categories:', blogs);

  return blogs || [];
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            So'nggi maqolalar
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sog'liq va tibbiyot sohasidagi eng so'nggi yangiliklar va foydali ma'lumotlar
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="Maqolalarni qidirish..."
              className="w-full pl-12 pr-4 py-3 rounded-full"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Blog Grid */}
        {blogs && blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">Hozircha maqolalar mavjud emas</p>
          </div>
        )}
      </div>
    </main>
  );
}
