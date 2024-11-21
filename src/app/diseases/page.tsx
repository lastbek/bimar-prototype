import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getImageUrl } from '@/lib/utils/image';
import { Search } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

async function getDiseases() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: diseases } = await supabase
    .from('diseases')
    .select('*')
    .order('name');

  return diseases || [];
}

export default async function DiseasesPage() {
  const diseases = await getDiseases();

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kasalliklar haqida ma'lumot
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Barcha kasalliklar haqida batafsil ma'lumot, alomatlari va davolash usullari
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="Kasallik qidirish..."
              className="w-full pl-12 pr-4 py-3 rounded-full"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Disease Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease) => (
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
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{disease.name}</h2>
                  <p className="text-gray-600 line-clamp-2">{disease.description}</p>
                  {disease.symptoms && disease.symptoms.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Asosiy alomatlar:</h3>
                      <div className="flex flex-wrap gap-2">
                        {disease.symptoms.slice(0, 3).map((symptom, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {symptom}
                          </span>
                        ))}
                        {disease.symptoms.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{disease.symptoms.length - 3} ko'proq
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
