import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

type Disease = Database['public']['Tables']['diseases']['Row'];
type Symptom = Database['public']['Tables']['symptoms']['Row'];

interface DiseaseWithSymptoms extends Disease {
  disease_symptoms: Array<{
    symptoms: Symptom;
  }>;
}

export default async function DiseasesPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: diseases } = await supabase
    .from('diseases')
    .select(`
      *,
      disease_symptoms (
        symptoms (
          id,
          name
        )
      )
    `)
    .order('name');

  const diseasesWithSymptoms = (diseases || []) as DiseaseWithSymptoms[];

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-12">Kasalliklar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseasesWithSymptoms.map((disease) => (
          <a
            key={disease.id}
            href={`/diseases/${disease.slug}`}
            className="group block"
          >
            <div className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {disease.image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={disease.image_url}
                    alt={disease.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {disease.name}
                </h2>
                {disease.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {disease.description}
                  </p>
                )}
                {disease.disease_symptoms && disease.disease_symptoms.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Asosiy belgilari:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {disease.disease_symptoms
                        .slice(0, 3)
                        .map(({ symptoms }) => (
                          <span
                            key={symptoms.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {symptoms.name}
                          </span>
                        ))}
                      {disease.disease_symptoms.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          +{disease.disease_symptoms.length - 3} ta belgi
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
