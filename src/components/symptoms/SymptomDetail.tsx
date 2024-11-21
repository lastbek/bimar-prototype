'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { getImageUrl } from '@/lib/utils/image';

type Symptom = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  causes: string;
  treatment: string;
  prevention: string;
  when_to_see_doctor: string;
  severity: 'mild' | 'moderate' | 'severe';
  related_diseases: {
    id: string;
    name: string;
    slug: string;
    description: string;
  }[];
};

export function SymptomDetail({ symptom }: { symptom: Symptom }) {
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800'
        };
      case 'moderate':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800'
        };
      case 'severe':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800'
        };
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {symptom.name}
        </h1>
        <div className="relative h-64 md:h-96 mb-8">
          <Image
            src={getImageUrl(symptom.image_url)}
            alt={symptom.name}
            fill
            className="object-cover rounded-lg"
          />
          {symptom.severity && (
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${
              getSeverityColor(symptom.severity).bg
            } ${
              getSeverityColor(symptom.severity).text
            }`}>
              {getSeverityText(symptom.severity)}
            </div>
          )}
        </div>
        <p className="text-xl text-gray-600">
          {symptom.description}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        {/* Causes */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sabablari</h2>
          <p className="text-gray-600">{symptom.causes}</p>
        </Card>

        {/* Treatment */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Davolash</h2>
          <p className="text-gray-600">{symptom.treatment}</p>
        </Card>

        {/* Prevention */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Oldini olish</h2>
          <p className="text-gray-600">{symptom.prevention}</p>
        </Card>

        {/* When to See Doctor */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shifokorga murojaat qilish</h2>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-gray-600">{symptom.when_to_see_doctor}</p>
          </div>
        </Card>
      </div>

      {/* Related Diseases */}
      {symptom.related_diseases && symptom.related_diseases.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bog'liq kasalliklar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {symptom.related_diseases.map((disease) => (
              <Card key={disease.id} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {disease.name}
                </h3>
                <p className="text-gray-600">{disease.description}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
