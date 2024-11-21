import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, Stethoscope, Pill, UserRound, Building2, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils/image';
import { BlogCard } from '@/components/cards/BlogCard';

export const revalidate = 3600;

async function getHomePageData() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Get blogs with categories and tags
  const { data: blogs, error: blogsError } = await supabase
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
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  console.log('Raw blogs data:', blogs);
  console.log('Blogs error:', blogsError);

  if (blogsError) {
    console.error('Error fetching blogs:', blogsError);
    return {
      diseases: [],
      symptoms: [],
      blogs: [],
    };
  }

  // Map the categories and tags data
  const blogsWithCategoriesAndTags = blogs?.map(blog => ({
    ...blog,
    category: blog.categories,
    categories: undefined,
    tags: blog.blog_tags?.map(bt => bt.tags) || [],
    blog_tags: undefined,
    author: null
  })) || [];

  console.log('Final blogs data:', blogsWithCategoriesAndTags);

  const { data: diseases } = await supabase
    .from('diseases')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: symptoms } = await supabase
    .from('symptoms')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  return {
    diseases: diseases || [],
    symptoms: symptoms || [],
    blogs: blogsWithCategoriesAndTags,
  };
}

export default async function HomePage() {
  const data = await getHomePageData();
  
  console.log('Blogs in HomePage:', data.blogs);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sog'lom hayot uchun ishonchli tibbiy ma'lumot
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Kasalliklar, alomatlar, klinikalar va mutaxassislar haqida batafsil ma'lumot
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Kasallik yoki alomat qidirish..."
                className="w-full px-6 py-4 rounded-full border-2 border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">
                <Search className="mr-2 h-5 w-5" />
                Qidirish
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Diseases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Keng tarqalgan kasalliklar</h2>
            <Link href="/diseases" className="text-primary hover:text-primary/80 flex items-center">
              Barchasi <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.diseases.map((disease) => (
              <Card key={disease.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/diseases/${disease.slug}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={getImageUrl(disease.image_url)}
                      alt={disease.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{disease.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{disease.description}</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Kasallik alomatlari</h2>
            <Link href="/symptoms" className="text-primary hover:text-primary/80 flex items-center">
              Barchasi <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.symptoms.map((symptom) => (
              <Card key={symptom.id} className="group hover:shadow-lg transition-shadow">
                <Link href={`/symptoms/${symptom.slug}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={getImageUrl(symptom.image_url)}
                      alt={symptom.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{symptom.name}</h3>
                    <p className="text-gray-600 line-clamp-2">{symptom.description}</p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tibbiy xizmatlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Clinics */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Klinikalar</h3>
              <p className="text-gray-600 mb-4">Ishonchli va zamonaviy klinikalarni toping</p>
              <Link href="/clinics">
                <Button variant="outline" className="w-full">
                  Klinikalarni ko'rish
                </Button>
              </Link>
            </Card>

            {/* Pharmacies */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Pill className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dorixonalar</h3>
              <p className="text-gray-600 mb-4">Yaqin atrofdagi dorixonalarni toping</p>
              <Link href="/pharmacies">
                <Button variant="outline" className="w-full">
                  Dorixonalarni ko'rish
                </Button>
              </Link>
            </Card>

            {/* Specialists */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <UserRound className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mutaxassislar</h3>
              <p className="text-gray-600 mb-4">Malakali shifokorlarni toping</p>
              <Link href="/specialists">
                <Button variant="outline" className="w-full">
                  Mutaxassislarni ko'rish
                </Button>
              </Link>
            </Card>

            {/* Blog & News */}
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Blog va Yangiliklar</h3>
              <p className="text-gray-600 mb-4">Sog'liq haqida so'nggi ma'lumotlar</p>
              <Link href="/blog">
                <Button variant="outline" className="w-full">
                  Blogni o'qish
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              So'nggi maqolalar
            </h2>
            <p className="text-xl text-gray-600">
              Sog'liq va tibbiyot sohasidagi eng so'nggi yangiliklar va foydali ma'lumotlar
            </p>
          </div>

          {data.blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.blogs.map((blog) => (
                  <div key={blog.id} className="h-full">
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Link href="/blog">
                  <Button variant="outline" className="gap-2">
                    <ArrowRight className="h-4 w-4" />
                    Barcha maqolalarni ko'rish
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              Hozircha maqolalar mavjud emas
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
