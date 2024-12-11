import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Heart,
  MessageCircle,
  Stethoscope,
  Users,
  Search,
  Brain,
  Pill,
  Activity,
  TrendingUp,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const topics = [
  { name: 'COVID-19', href: '/topics/covid-19' },
  { name: 'Mental Health', href: '/topics/mental-health' },
  { name: 'Nutrition', href: '/topics/nutrition' },
  { name: 'Fitness', href: '/topics/fitness' },
];

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F3F9F3] to-white py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tibbiy bilimlarning ishonchli manbai
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Mutaxassislar tomonidan yozilgan maqolalar, sogliq boyicha maslahatlar va tibbiy malumotlarni kashf eting. Ishonchli mutaxassislardan songi tibbiy yangiliklar bilan tanishing.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <input
                  type="text"
                  placeholder="Maqolalar, mavzular yoki kasalliklarni qidiring"
                  className="w-full pl-12 pr-4 py-3 text-base rounded-full border border-gray-200 focus:outline-none focus:border-green-500"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600">
                  Qidirish
                </button>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              {/* Topics */}
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-3">Ommabop mavzular:</p>
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <Link
                      key={topic.name}
                      href={topic.href}
                      className="px-4 py-2 bg-white rounded-full text-sm border hover:border-green-500 transition-colors"
                    >
                      {topic.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="relative hidden md:block">
              {/* Main Image Card */}
              <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
                <img
                  src="/images/hero-image.jpg"
                  alt="Medical professionals"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Tibbiyotdagi so'nggi yangiliklar</h3>
                  <p className="text-white/90 text-sm">Eng so'nggi tibbiy yangiliklar va tadqiqotlar</p>
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Trend bo'layotgan</span>
                  </div>
                  <div className="text-xl font-semibold">20+</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">Kategoriyalar</span>
                  </div>
                  <div className="text-xl font-semibold">15+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/diseases" className="group">
              <Card className="p-6 text-center hover:border-primary transition-colors">
                <Activity className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Kasalliklar</h3>
                <p className="text-sm text-muted-foreground">Kasalliklar haqida ma'lumot</p>
              </Card>
            </Link>
            <Link href="/symptoms" className="group">
              <Card className="p-6 text-center hover:border-primary transition-colors">
                <Search className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Simptomlar</h3>
                <p className="text-sm text-muted-foreground">Kasallik belgilari</p>
              </Card>
            </Link>
            <Link href="/medicines" className="group">
              <Card className="p-6 text-center hover:border-primary transition-colors">
                <Pill className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Dorilar</h3>
                <p className="text-sm text-muted-foreground">Dori vositalari haqida</p>
              </Card>
            </Link>
            <Link href="/doctors" className="group">
              <Card className="p-6 text-center hover:border-primary transition-colors">
                <Users className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Shifokorlar</h3>
                <p className="text-sm text-muted-foreground">Mutaxassislar ro'yxati</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nega aynan biz?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ishonchli va professional tibbiy ma'lumotlar platformasi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 mb-4 text-primary" />,
                title: "Sun'iy intellekt",
                description: "Barcha maqolalar zamonaviy AI texnologiyalari yordamida yaratiladi",
              },
              {
                icon: <BookOpen className="h-8 w-8 mb-4 text-primary" />,
                title: "Dolzarb mavzular",
                description: "Eng so'nggi tibbiy yangiliklar va tadqiqotlar",
              },
              {
                icon: <Users className="h-8 w-8 mb-4 text-primary" />,
                title: "Katta jamiyat",
                description: "Faol o'quvchilar va mutaxassislar jamoasi",
              },
              {
                icon: <Award className="h-8 w-8 mb-4 text-primary" />,
                title: "Ishonchli ma'lumotlar",
                description: "Faqat tekshirilgan va tasdiqlangan ma'lumotlar",
              },
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Sog'ligingiz biz uchun muhim</h2>
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
        <div className="container">
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
