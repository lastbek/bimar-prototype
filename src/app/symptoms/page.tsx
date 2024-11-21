import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getImageUrl } from '@/lib/utils/image';
import { Search, AlertTriangle } from 'lucide-react';

export const revalidate = 3600;

async function getSymptoms() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: symptoms } = await supabase
    .from('symptoms')
    .select('*')
    .order('name');

  return symptoms || [];
}

export default async function SymptomsPage() {
  const symptoms = await getSymptoms();

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kasallik alomatlari
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Kasallik alomatlarini aniqlang va mos keladigan kasalliklar haqida ma'lumot oling
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="search"
              placeholder="Alomatlarni qidirish..."
              className="w-full pl-12 pr-4 py-3 rounded-full"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Severity Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {['Yengil', 'O'rta', 'Jiddiy'].map((severity) => (
            <Card key={severity} className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  severity === 'Yengil' ? 'bg-green-100' :
                  severity === 'O'rta' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <AlertTriangle className={`h-6 w-6 ${
                    severity === 'Yengil' ? 'text-green-600' :
                    severity === 'O'rta' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <h2 className="text-xl font-semibold">{severity} alomatlar</h2>
              </div>
              <p className="text-gray-600">
                {severity === 'Yengil' ? 'Kundalik hayotga ta'sir qilmaydigan yengil alomatlar' :
                 severity === 'O'rta' ? 'E'tiborga olish kerak bo'lgan o'rtacha alomatlar' :
                 'Zudlik bilan shifokorga murojaat qilish kerak bo'lgan jiddiy alomatlar'}
              </p>
            </Card>
          ))}
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {symptoms.map((symptom) => (
            <Card key={symptom.id} className="group hover:shadow-lg transition-shadow">
              <Link href={`/symptoms/${symptom.slug}`}>
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={getImageUrl(symptom.image_url)}
                    alt={symptom.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {symptom.severity && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      symptom.severity === 'Yengil' ? 'bg-green-100 text-green-800' :
                      symptom.severity === 'O'rta' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {symptom.severity}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{symptom.name}</h2>
                  <p className="text-gray-600 line-clamp-2">{symptom.description}</p>
                  {symptom.common_causes && symptom.common_causes.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Ko'p uchraydigan sabablar:</h3>
                      <div className="flex flex-wrap gap-2">
                        {symptom.common_causes.slice(0, 3).map((cause, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {cause}
                          </span>
                        ))}
                        {symptom.common_causes.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{symptom.common_causes.length - 3} ko'proq
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
