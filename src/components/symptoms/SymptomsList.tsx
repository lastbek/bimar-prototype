'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { getImageUrl } from '@/lib/utils/image';

type Symptom = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  severity: 'mild' | 'moderate' | 'severe';
};

export function SymptomsList({ symptoms }: { symptoms: Symptom[] }) {
  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'Yengil';
      case 'moderate':
        return "O'rta";
      case 'severe':
        return 'Jiddiy';
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {symptoms.map((symptom) => (
        <Link key={symptom.id} href={`/symptoms/${symptom.slug}`}>
          <Card className="group h-full hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={getImageUrl(symptom.image_url)}
                alt={symptom.name}
                fill
                className="object-cover rounded-t-lg"
              />
              {symptom.severity && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                  symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getSeverityText(symptom.severity)}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {symptom.name}
              </h3>
              <p className="mt-2 text-gray-600 line-clamp-2">
                {symptom.description}
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
