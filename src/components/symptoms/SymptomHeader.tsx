'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SymptomHeader() {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Kasallik alomatlari
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Kasallik alomatlarini aniqlang va mos keladigan kasalliklar haqida ma'lumot oling
      </p>
      <div className="relative max-w-2xl mx-auto">
        <Input
          type="search"
          placeholder="Alomatlarni qidirish..."
          className="w-full pl-12 pr-4 py-3 rounded-full"
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
