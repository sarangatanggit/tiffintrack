'use client';

import React from 'react';
import { useNutritionStore } from '@/lib/store';

export function NutritionInformation() {
  const { selectedDish } = useNutritionStore();

  if (!selectedDish) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{selectedDish.name}</h2>
            <p className="mt-1 text-gray-500">{selectedDish.description}</p>
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
              <span>{selectedDish.category.join(' • ')}</span>
              <span>•</span>
              <span>{selectedDish.region}</span>
            </div>
          </div>
          {selectedDish.image && (
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Nutrition Information</h3>
          <p className="text-sm text-gray-500">
            Per serving ({selectedDish.servingSize.amount}{selectedDish.servingSize.unit})
          </p>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-center text-gray-500">
              Nutrition calculation is currently unavailable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 