import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/lib/utils/image';
import { AlertTriangle, Activity, Stethoscope, ArrowRight } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: {
    slug: string;
  };
}

async function getDisease(slug: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: disease } = await supabase
    .from('diseases')
    .select('*, diseases_symptoms(symptom:symptoms(*))')
    .eq('slug', slug)
    .single();

  if (!disease) {
    notFound();
  }

  // Get related diseases based on common symptoms
  const { data: relatedDiseases } = await supabase
    .from('diseases')
    .select('*')
    .neq('id', disease.id)
    .limit(3);

  return {
    disease,
    relatedDiseases: relatedDiseases || []
  };
}

export default async function DiseasePage({ params }: PageProps) {
  const { disease, relatedDiseases } = await getDisease(params.slug);

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={getImageUrl(disease.image_url)}
                alt={disease.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end p-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">{disease.name}</h1>
                  <p className="text-white/90 text-lg">{disease.description}</p>
                </div>
              </div>
            </div>

            {/* Symptoms Section */}
            <Card className="p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold">Kasallik alomatlari</h2>
              </div>
              <div className="space-y-4">
                {disease.symptoms?.map((symptom, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                    </span>
                    <p className="text-gray-700">{symptom}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Causes Section */}
            <Card className="p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold">Kasallik sabablari</h2>
              </div>
              <div className="space-y-4">
                {disease.causes?.map((cause, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    </span>
                    <p className="text-gray-700">{cause}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Treatment Section */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold">Davolash usullari</h2>
              </div>
              <div className="space-y-4">
                {disease.treatments?.map((treatment, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="w-2 h-2 rounded-full bg-green-600" />
                    </span>
                    <p className="text-gray-700">{treatment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Diseases */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">O'xshash kasalliklar</h2>
              <div className="space-y-6">
                {relatedDiseases.map((related) => (
                  <Link
                    key={related.id}
                    href={`/diseases/${related.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={getImageUrl(related.image_url)}
                        alt={related.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Find Specialists */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-xl font-semibold mb-4">Mutaxassis maslahatiga murojaat qiling</h2>
              <p className="text-gray-600 mb-6">
                Malakali shifokorlarimiz sizga yordam berishga tayyor
              </p>
              <Link
                href="/specialists"
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                Mutaxassisni topish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
