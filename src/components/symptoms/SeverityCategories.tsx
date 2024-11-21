'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function SeverityCategories() {
  const severities = [
    {
      level: "Yengil",
      description: "Kundalik hayotga ta'sir qilmaydigan alomatlar"
    },
    {
      level: "O'rta",
      description: "E'tiborga olinishi kerak bo'lgan alomatlar"
    },
    {
      level: "Jiddiy",
      description: "Tez tibbiy yordam talab qiladigan alomatlar"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Yengil":
        return {
          bg: 'bg-green-100',
          text: 'text-green-600'
        };
      case "O'rta":
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-600'
        };
      case "Jiddiy":
        return {
          bg: 'bg-red-100',
          text: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {severities.map((severity) => (
        <Card key={severity.level} className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${getSeverityColor(severity.level).bg}`}>
              <AlertTriangle className={`h-6 w-6 ${getSeverityColor(severity.level).text}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {severity.level} alomatlar
              </h3>
              <p className="text-gray-600">
                {severity.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
