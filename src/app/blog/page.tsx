import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { format } from 'date-fns';
import Link from 'next/link';
import { Database } from '@/lib/database.types';
import { Button } from '@/components/ui/button';

type Blog = Database['public']['Tables']['blogs']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface BlogWithRelations extends Blog {
  category: Category | null;
  blog_tags: Array<{
    tags: Tag;
  }>;
}

export const dynamic = 'force-dynamic';

interface BlogPageProps {
  searchParams: {
    category?: string;
    tag?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Get all categories for the sidebar
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('show_in_nav', true);

  // Base query for blogs
  let query = supabase
    .from('blogs')
    .select(`
      *,
      category:category_id (
        id,
        name,
        description,
        slug,
        created_at,
        show_in_nav
      ),
      blog_tags (
        tags (
          id,
          name,
          slug,
          description,
          created_at
        )
      )
    `)
    .eq('published', true);

  // If category is specified, join with categories and filter
  if (searchParams.category) {
    // First get the category ID from the slug
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', searchParams.category)
      .single();

    if (categoryData) {
      query = query.eq('category_id', categoryData.id);
    }
  }

  // If tag is specified, filter by tag
  if (searchParams.tag) {
    const { data: tagData } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', searchParams.tag)
      .single();

    if (tagData) {
      query = query.eq('blog_tags.tag_id', tagData.id);
    }
  }

  // If search query is specified, filter by title or content
  if (searchParams.search) {
    const searchTerm = searchParams.search.trim();
    console.log('Search query:', searchTerm);

    // Only search in title and excerpt (text fields)
    query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);

    // Log the generated query
    const { data: searchResults, error } = await query;
    console.log('Search results:', searchResults);
    if (error) console.error('Search error:', error);
  }

  // Execute the query with ordering
  const { data: blogs, error: blogsError } = await query.order('created_at', { ascending: false });
  
  if (blogsError) {
    console.error('Error fetching blogs:', blogsError);
  }

  console.log('Final blogs data:', blogs);

  const blogList = (blogs || []) as unknown as BlogWithRelations[];

  // Get the current category name for the heading
  let currentCategory: Category | null = null;
  if (searchParams.category && categories) {
    currentCategory = categories.find(cat => cat.slug === searchParams.category) || null;
  }

  // Get the current tag name
  let currentTag: Tag | null = null;
  if (searchParams.tag) {
    const { data: tagData } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', searchParams.tag)
      .single();
    currentTag = tagData;
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Bo'limlar</h2>
            <div className="space-y-2">
              <Button
                variant={!searchParams.category ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href="/blog">
                  Barchasi
                </Link>
              </Button>
              {categories?.map((category) => (
                <Button
                  key={category.id}
                  variant={searchParams.category === category.slug ? "default" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/blog?category=${category.slug}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-8">
            {currentCategory ? currentCategory.name : 
             currentTag ? `#${currentTag.name}` : 
             searchParams.search ? `Qidiruv natijalari: ${searchParams.search}` :
             'Barcha maqolalar'}
          </h1>
          {blogList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                {currentCategory ? 'Bu bo\'limda maqolalar mavjud emas.' :
                 currentTag ? 'Bu teg bo\'yicha maqolalar mavjud emas.' :
                 searchParams.search ? `Qidiruv natijalari topilmadi.` :
                 'Maqolalar mavjud emas.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogList.map((blog) => (
                <article
                  key={blog.id}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {blog.image_url && (
                    <Link href={`/blog/${blog.slug}`}>
                      <div className="relative h-48">
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span>{blog.category?.name || 'Turkumlanmagan'}</span>
                      <span>•</span>
                      <span>{format(new Date(blog.created_at), 'MMMM d, yyyy')}</span>
                      {blog.read_time && (
                        <>
                          <span>•</span>
                          <span>{blog.read_time} daqiqa o'qish</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {blog.title}
                      </Link>
                    </h2>
                    {blog.excerpt && (
                      <p className="text-muted-foreground line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                    )}
                    {blog.blog_tags && blog.blog_tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.blog_tags.map(({ tags }) => (
                          <Link
                            key={tags.id}
                            href={`/blog?tag=${tags.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            #{tags.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
