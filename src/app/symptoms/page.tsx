import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';

// This is a server component
export const revalidate = 3600;

type Symptom = Database['public']['Tables']['symptoms']['Row'];

// Function to generate a URL-friendly slug from a string
function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-'); // Replace multiple hyphens with single hyphen
}

export default async function SymptomsPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: symptoms } = await supabase
    .from('symptoms')
    .select('*')
    .order('name');

  const symptomsData = (symptoms || []) as Symptom[];

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kasallik belgilari</h1>
        <p className="text-xl text-muted-foreground">
          Kasallik belgilari va ularning darajasi bo&apos;yicha ma&apos;lumot
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {symptomsData.map((symptom) => (
          <a
            key={symptom.id}
            href={`/symptoms/${generateSlug(symptom.name)}`}
            className="group block"
          >
            <div className="bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {symptom.name}
                </h2>
                {symptom.description && (
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {symptom.description}
                  </p>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
