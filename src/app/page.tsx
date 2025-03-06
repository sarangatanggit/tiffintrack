'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { PreparationParameters } from '@/components/PreparationParameters';
import { NutritionInformation } from '@/components/NutritionInformation';

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<any>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Indian Cuisine Nutrition Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the nutritional content of your favorite Indian dishes and understand how
            different preparation methods affect their values.
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSelect={setSelectedFood} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <PreparationParameters />
          </div>
          <div>
            <NutritionInformation data={selectedFood} />
          </div>
        </div>
      </div>
    </main>
  );
}
