import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Database } from '@/lib/database.types';

type Disease = Database['public']['Tables']['diseases']['Row'];
type Symptom = Database['public']['Tables']['symptoms']['Row'];

interface DiseaseWithSymptoms extends Disease {
  disease_symptoms: Array<{
    symptoms: Symptom;
  }>;
}

interface DiseasePageProps {
  params: {
    slug: string;
  };
}

export default async function DiseasePage({ params }: DiseasePageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Get the disease with its symptoms
  const { data: disease, error } = await supabase
    .from('diseases')
    .select(`
      *,
      disease_symptoms (
        symptoms (
          id,
          name,
          description
        )
      )
    `)
    .eq('slug', params.slug)
    .single();

  if (error) {
    console.error('Error fetching disease:', error);
    return notFound();
  }

  if (!disease) {
    return notFound();
  }

  const diseaseWithSymptoms = disease as DiseaseWithSymptoms;

  // Get related diseases based on common symptoms
  const { data: relatedDiseases } = await supabase
    .from('diseases')
    .select('id, name, slug, description, image_url')
    .neq('id', diseaseWithSymptoms.id)
    .limit(3);

  return (
    <div className="container mx-auto py-16">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{diseaseWithSymptoms.name}</h1>
          {diseaseWithSymptoms.description && (
            <p className="text-xl text-muted-foreground">
              {diseaseWithSymptoms.description}
            </p>
          )}
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Symptoms and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Symptoms Section */}
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <div className="w-6 h-6 text-red-600">⚠️</div>
                </div>
                <h2 className="text-2xl font-semibold">Kasallik belgilari</h2>
              </div>

              {diseaseWithSymptoms.disease_symptoms &&
               diseaseWithSymptoms.disease_symptoms.length > 0 ? (
                <div className="space-y-4">
                  {diseaseWithSymptoms.disease_symptoms.map(({ symptoms }) => (
                    <div key={symptoms.id} className="flex items-start gap-4">
                      <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                      </span>
                      <div>
                        <h3 className="font-medium">{symptoms.name}</h3>
                        {symptoms.description && (
                          <p className="text-muted-foreground mt-1">
                            {symptoms.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Bu kasallik uchun belgilar kiritilmagan
                </p>
              )}
            </section>
          </div>

          {/* Right Column: Related Diseases */}
          <div>
            {relatedDiseases && relatedDiseases.length > 0 && (
              <aside className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">
                  O'xshash kasalliklar
                </h2>
                <div className="space-y-6">
                  {relatedDiseases.map((related) => (
                    <a
                      key={related.id}
                      href={`/diseases/${related.slug}`}
                      className="group block"
                    >
                      <div className="flex items-start gap-4">
                        {related.image_url && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={related.image_url}
                              alt={related.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {related.name}
                          </h3>
                          {related.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {related.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
