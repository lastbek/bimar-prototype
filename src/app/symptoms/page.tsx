interface Symptom {
  id: number;
  name: string;
  slug: string;
}

const symptoms: Symptom[] = [
  { id: 1, name: 'Aksirish', slug: 'aksirish' },
  { id: 2, name: 'Bosh aylanishi', slug: 'bosh-aylanishi' },
  { id: 3, name: 'Bosh ogrigi', slug: 'bosh-ogrigi' },
  { id: 4, name: 'Charchash', slug: 'charchash' },
  { id: 5, name: 'Diareya', slug: 'diareya' },
  { id: 6, name: 'Hansirash', slug: 'hansirash' },
  { id: 7, name: 'Isitma', slug: 'isitma' },
  { id: 8, name: 'Jigildash', slug: 'jigildash' },
  { id: 9, name: 'Kongil aynish', slug: 'kongil-aynish' },
  { id: 10, name: 'Koz yoshlanishi', slug: 'koz-yoshlanishi' },
  { id: 11, name: 'Mushaklarda ogrik', slug: 'mushaklarda-ogrik' },
  { id: 12, name: 'Nafas qisilishi', slug: 'nafas-qisilishi' },
  { id: 13, name: 'Qichishish', slug: 'qichishish' },
  { id: 14, name: 'Terlash', slug: 'terlash' },
  { id: 15, name: 'Yotal', slug: 'yotal' },
];

export default function SymptomsPage() {
  // Group symptoms by first letter
  const groupedSymptoms: { [key: string]: Symptom[] } = {};
  symptoms.forEach((symptom) => {
    const firstLetter = symptom.name[0].toUpperCase();
    if (!groupedSymptoms[firstLetter]) {
      groupedSymptoms[firstLetter] = [];
    }
    groupedSymptoms[firstLetter].push(symptom);
  });

  const letters = Object.keys(groupedSymptoms).sort();

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Simptomlar</h1>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Symptom list by letter */}
          <div className="grid grid-cols-3 gap-8 h-[800px]">
            {letters.map((letter) => (
              <div key={letter} id={letter} className="scroll-mt-24">
                <div className="columns-3 gap-8">
                  <div className="break-inside-avoid-column">
                    <div className="flex gap-4">
                      <div>
                        <span className="text-primary font-bold text-xl">
                          {letter}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-4">
                          {groupedSymptoms[letter].map((symptom) => (
                            <a
                              key={symptom.id}
                              href={`/symptoms/${symptom.slug}`}
                              className="block text-gray-600 hover:text-primary transition-colors"
                            >
                              {symptom.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
