import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';
import BlogCard from '@/components/blog-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Award, BookOpen, Calendar, Heart, MessageCircle, Stethoscope, Users } from 'lucide-react';

type Blog = Database['public']['Tables']['blogs']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface BlogWithRelations extends Blog {
  category: Category;
  blog_tags: Array<{
    tags: Tag;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch latest blogs
  const { data: blogsData } = await supabase
    .from('blogs')
    .select(`
      *,
      category: categories (
        id,
        name,
        slug
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
    .limit(6);

  const blogs = (blogsData || []) as BlogWithRelations[];
  const featuredPost = blogs[0];

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .limit(6);

  // Fetch popular tags
  const { data: tags } = await supabase
    .from('tags')
    .select('*')
    .limit(8);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Post */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto py-20 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Sog'liq va tibbiyot haqida ishonchli ma'lumotlar
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Malakali shifokorlar va sog'liqni saqlash mutaxassislaridan professional maslahatlar
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/blog">
                    Maqolalarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Biz haqimizda</Link>
                </Button>
              </div>
            </div>
            {featuredPost && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
                <Button variant="secondary" asChild>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    Batafsil o'qish <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Asosiy bo'limlar</h2>
            <p className="text-muted-foreground">Qiziqtirgan mavzular bo'yicha ma'lumotlar toping</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.map((category) => (
              <Link 
                key={category.id} 
                href={`/blog?category=${category.slug}`}
                className="group"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold mb-2 group-hover:text-primary">
                    {category.name}
                  </h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">So'nggi maqolalar</h2>
            <p className="text-muted-foreground">Eng so'nggi yangiliklar va maslahatlar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="h-full">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">
                Barcha maqolalarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nega aynan biz?</h2>
            <p className="text-muted-foreground">Ishonchli va professional tibbiy ma'lumotlar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Stethoscope className="h-8 w-8 mb-4 text-primary" />,
                title: "Sun'iy intellekt",
                description: "Barcha maqolalar zamonaviy AI texnologiyalari yordamida yaratiladi"
              },
              {
                icon: <BookOpen className="h-8 w-8 mb-4 text-primary" />,
                title: "Dolzarb mavzular",
                description: "Eng so'nggi tibbiy yangiliklar va tadqiqotlar"
              },
              {
                icon: <Users className="h-8 w-8 mb-4 text-primary" />,
                title: "Katta jamiyat",
                description: "Faol o'quvchilar va mutaxassislar jamoasi"
              },
              {
                icon: <Award className="h-8 w-8 mb-4 text-primary" />,
                title: "Ishonchli ma'lumotlar",
                description: "Faqat tekshirilgan va tasdiqlangan ma'lumotlar"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ommabop mavzular</h2>
            <p className="text-muted-foreground">Ko'p o'qilgan mavzular bo'yicha ma'lumotlar</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {tags?.map((tag) => (
              <Link 
                key={tag.id} 
                href={`/blog?tag=${tag.slug}`}
                className="inline-block"
              >
                <Button variant="outline" size="sm">
                  #{tag.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Sog'ligingiz biz uchun muhim
            </h2>
            <p className="text-xl mb-8">
              Shifokor maslahatiga muhtojmisiz? Bizning mutaxassislarimiz sizga yordam berishga tayyor.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Bog'lanish <MessageCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Calendar className="h-12 w-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Yangiliklardan xabardor bo'ling</h2>
            <p className="text-muted-foreground mb-8">
              Eng so'nggi maqolalar va maslahatlarni elektron pochtangizga olish uchun obuna bo'ling
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Elektron pochta"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button type="submit">Obuna bo'lish</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
