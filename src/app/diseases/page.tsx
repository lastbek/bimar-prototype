interface Disease {
  id: number;
  name: string;
  slug: string;
}

const diseases: Disease[] = [
  { id: 1, name: 'Allergiya', slug: 'allergiya' },
  { id: 2, name: 'Angina', slug: 'angina' },
  { id: 3, name: 'Artroz', slug: 'artroz' },
  { id: 4, name: 'Bronxit', slug: 'bronxit' },
  { id: 5, name: 'Dermatit', slug: 'dermatit' },
  { id: 6, name: 'Diabet', slug: 'diabet' },
  { id: 7, name: 'Ekzema', slug: 'ekzema' },
  { id: 8, name: 'Gastrit', slug: 'gastrit' },
  { id: 9, name: 'Gepatit', slug: 'gepatit' },
  { id: 10, name: 'Gipertoniya', slug: 'gipertoniya' },
  { id: 11, name: 'Infarkt', slug: 'infarkt' },
  { id: 12, name: 'Insult', slug: 'insult' },
  { id: 13, name: 'Nevrit', slug: 'nevrit' },
  { id: 14, name: 'Osteoporoz', slug: 'osteoporoz' },
  { id: 15, name: 'Pnevmoniya', slug: 'pnevmoniya' },
];

export default function DiseasesPage() {
  // Group diseases by first letter
  const groupedDiseases: { [key: string]: Disease[] } = {};
  diseases.forEach((disease) => {
    const firstLetter = disease.name[0].toUpperCase();
    if (!groupedDiseases[firstLetter]) {
      groupedDiseases[firstLetter] = [];
    }
    groupedDiseases[firstLetter].push(disease);
  });

  const letters = Object.keys(groupedDiseases).sort();

  return (
    <div className="py-16">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">Kasalliklar</h1>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          {/* Disease list by letter */}
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
                          {groupedDiseases[letter].map((disease) => (
                            <a
                              key={disease.id}
                              href={`/diseases/${disease.slug}`}
                              className="block text-gray-600 hover:text-primary transition-colors"
                            >
                              {disease.name}
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
