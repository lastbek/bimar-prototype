import { notFound } from 'next/navigation';

interface Disease {
  id: number;
  name: string;
  slug: string;
}

interface Symptom {
  id: number;
  name: string;
  slug: string;
  author: {
    name: string;
    avatar?: string;
  };
  shortDescription: string;
  content: string;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  image?: string;
  relatedDiseases: Disease[];
  updatedAt: string;
}

const symptoms: Symptom[] = [
  {
    id: 1,
    name: 'Bosh ogrigi',
    slug: 'bosh-ogrigi',
    author: {
      name: 'Dr. Aziz Aliev',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    shortDescription: 'Bosh ogrigi - bu turli xil kasalliklar va holatlar bilan boglik bolgan simptom.',
    content: `
      <h1>Bosh ogrigi haqida</h1>
      <p>Bosh ogrigi - bu turli xil kasalliklar va holatlar bilan boglik bolgan simptom. U turli darajada va turli xil korinishlarda namoyon bolishi mumkin.</p>
      <h2>Bosh ogrigi turlari</h2>
      <h3>1. Migren</h3>
      <p>Bir tomonlama kuchli bosh ogrigi, kop hollarda kongil aynishi va yoruglikka sezgirlik bilan birga keladi.</p>
      <h3>2. Taranglik bosh ogrigi</h3>
      <p>Boshning ikki tomonida bosim va taranglik his qilish bilan xarakterlanadi.</p>
      <h3>3. Klaster bosh ogrigi</h3>
      <p>Juda kuchli, bir tomonlama bosh ogrigi, qisqa muddat davom etadi.</p>
      <h2>Bosh ogrigining sabablari</h2>
      <ul>
        <li>Stress va charchash</li>
        <li>Uyqu rejimining buzilishi</li>
        <li>Gipertoniya</li>
        <li>Miya qon aylanishining buzilishi</li>
        <li>Infeksiyalar</li>
      </ul>
      <h2>Davolanish usullari</h2>
      <ol>
        <li>Ogriq qoldiruvchi dorilar</li>
        <li>Dam olish va uyqu</li>
        <li>Stress darajasini kamaytirish</li>
        <li>Massaj va fizioterapiya</li>
      </ol>
      <h2>Oldini olish choralari</h2>
      <ul>
        <li>Muntazam jismoniy faollik</li>
        <li>Yetarli uyqu</li>
        <li>Togri ovqatlanish</li>
        <li>Stress boshqaruvi</li>
      </ul>
      <div class="bg-red-50 p-4 rounded-lg border border-red-200 my-4">
        <p class="font-semibold text-red-800">Ogohlantirish:</p>
        <p class="mt-2 text-red-700">Quyidagi hollarda zudlik bilan shifokorga murojaat qiling:</p>
        <ul class="mt-2 space-y-1 text-red-700">
          <li>Kuchli va tosatdan boshlangan bosh ogrigi</li>
          <li>Bosh ogrigiga qusish qoshilganda</li>
          <li>Bosh ogrigi bilan birga nutq buzilishi yoki falajlik belgilari paydo bolganda</li>
        </ul>
      </div>
    `,
    tags: [
      { id: 1, name: 'Bosh ogrigi', slug: 'bosh-ogrigi' },
      { id: 2, name: 'Migren', slug: 'migren' },
      { id: 3, name: 'Nevrologiya', slug: 'nevrologiya' }
    ],
    image: 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?w=1200&h=800&fit=crop',
    relatedDiseases: [
      { id: 1, name: 'Gipertoniya', slug: 'gipertoniya' },
      { id: 2, name: 'Migren', slug: 'migren' },
      { id: 3, name: 'Nevrit', slug: 'nevrit' }
    ],
    updatedAt: '2024-12-11'
  }
];

interface SymptomPageProps {
  params: {
    slug: string;
  };
}

export default function SymptomPage({ params }: SymptomPageProps) {
  const symptom = symptoms.find((s) => s.slug === params.slug);

  if (!symptom) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="container">
        <article>
          {/* Hero section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-4">{symptom.name}</h1>
            <p className="text-xl text-gray-600 mb-8">{symptom.shortDescription}</p>
            
            {/* Author and date */}
            <div className="flex items-center gap-4">
              {symptom.author.avatar && (
                <img
                  src={symptom.author.avatar}
                  alt={symptom.author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <div className="font-medium">{symptom.author.name}</div>
                <div className="text-sm text-gray-500">
                  Yangilangan: {new Date(symptom.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: symptom.content }} />
          </div>

          {/* Related diseases */}
          {symptom.relatedDiseases && symptom.relatedDiseases.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-4">Boglik kasalliklar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symptom.relatedDiseases.map((disease) => (
                  <a
                    key={disease.id}
                    href={`/diseases/${disease.slug}`}
                    className="block p-4 rounded-lg border hover:border-primary transition-colors"
                  >
                    <h3 className="font-medium">{disease.name}</h3>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {symptom.tags && symptom.tags.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {symptom.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
