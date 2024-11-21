import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, Clock, Activity, Stethoscope, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/utils/image';

export const revalidate = 3600;

async function getSymptomBySlug(slug: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: symptom } = await supabase
    .from('symptoms')
    .select(`
      *,
      related_diseases:disease_symptoms(
        disease:diseases(
          id,
          name,
          slug,
          image_url
        )
      )
    `)
    .eq('slug', slug)
    .single();

  return symptom;
}

export default async function SymptomPage({
  params,
}: {
  params: { slug: string };
}) {
  const symptom = await getSymptomBySlug(params.slug);

  if (!symptom) {
    notFound();
  }

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={getImageUrl(symptom.image_url)}
              alt={symptom.name}
              fill
              className="object-cover"
            />
            {symptom.severity && (
              <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-medium ${
                symptom.severity === 'Yengil' ? 'bg-green-100 text-green-800' :
                symptom.severity === 'O'rta' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  {symptom.severity} darajali alomat
                </div>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{symptom.name}</h1>
          <p className="text-xl text-gray-600">{symptom.description}</p>
        </div>

        {/* Key Information Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Duration */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Davomiyligi</h2>
                <p className="text-gray-600">{symptom.duration || 'Har xil bo'lishi mumkin'}</p>
              </div>
            </div>
          </Card>

          {/* Frequency */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Chastotasi</h2>
                <p className="text-gray-600">{symptom.frequency || 'Aniqlanmagan'}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Common Causes Section */}
        {symptom.common_causes && symptom.common_causes.length > 0 && (
          <section className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Ko'p uchraydigan sabablar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {symptom.common_causes.map((cause, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-gray-800">{cause}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Treatment Section */}
        {symptom.treatments && (
          <section className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Davolash usullari</h2>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-4">
                  {typeof symptom.treatments === 'string' ? (
                    <p className="text-gray-600">{symptom.treatments}</p>
                  ) : (
                    <ul className="space-y-2">
                      {symptom.treatments.map((treatment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Related Diseases Section */}
        {symptom.related_diseases && symptom.related_diseases.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Bog'liq kasalliklar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptom.related_diseases.map(({ disease }) => (
                <Link key={disease.id} href={`/diseases/${disease.slug}`}>
                  <Card className="group hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={getImageUrl(disease.image_url)}
                        alt={disease.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {disease.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Emergency Warning */}
        {symptom.severity === 'Jiddiy' && (
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="p-6 border-red-200 bg-red-50">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Shoshilinch tibbiy yordam talab qilinadi
                  </h3>
                  <p className="text-red-700 mb-4">
                    Bu jiddiy alomat. Agar sizda bu alomat kuzatilsa, zudlik bilan tibbiy yordamga murojaat qiling.
                  </p>
                  <Button variant="destructive">
                    <Link href="/emergency">Shoshilinch yordam raqamlari</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
