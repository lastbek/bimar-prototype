import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Database } from '@/lib/database.types';

export const revalidate = 3600;

// Function to generate a URL-friendly slug from a string
function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-'); // Replace multiple hyphens with single hyphen
}

async function getSymptomBySlug(slug: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });

  const { data: symptoms } = await supabase
    .from('symptoms')
    .select(`
      *,
      disease_symptoms!disease_symptoms_symptom_id_fkey(
        diseases(
          id,
          name,
          slug,
          description,
          image_url
        )
      )
    `);

  if (!symptoms) return null;

  // Find the symptom whose name matches the slug
  const symptom = symptoms.find(s => generateSlug(s.name) === slug);
  return symptom || null;
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
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{symptom.name}</h1>
        
        {symptom.description && (
          <div className="prose prose-lg max-w-none mb-12">
            <p>{symptom.description}</p>
          </div>
        )}

        {symptom.disease_symptoms && symptom.disease_symptoms.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Bog&apos;liq kasalliklar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptom.disease_symptoms.map(({ diseases }) => (
                diseases && (
                  <a
                    key={diseases.id}
                    href={`/diseases/${diseases.slug}`}
                    className="group block"
                  >
                    <div className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {diseases.image_url && (
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={diseases.image_url}
                            alt={diseases.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {diseases.name}
                        </h3>
                        {diseases.description && (
                          <p className="text-muted-foreground line-clamp-2">
                            {diseases.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
