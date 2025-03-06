'use client';

import React from 'react';
import { useNutritionStore } from '@/lib/store';
import { OilType, OilAmount, CreamContent, CookingMethod, ServingSize } from '@/lib/types';

export function PreparationParameters() {
  const { preparationParams, updatePreparationParam, selectedDish } = useNutritionStore();

  const oilTypes: OilType[] = ['Ghee', 'Coconut Oil', 'Olive Oil'];
  const oilAmounts: OilAmount[] = ['Little', 'Normal', 'Extra'];
  const creamContents: CreamContent[] = ['None', 'Little', 'Normal', 'Extra'];
  const cookingMethods: CookingMethod[] = ['No Fry', 'Pan Fry or Sauteed', 'Deep Fried', 'Baked', 'Air Fried'];
  const servingSizes: ServingSize[] = [0.5, 1, 1.5, 2];

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">
        {selectedDish ? 'Preparation Details' : 'Default Preparation Settings'}
      </h2>

      {/* Serving Size */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Serving Size</label>
        <div className="flex gap-4">
          {servingSizes.map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.servingSize === size}
                onChange={() => updatePreparationParam('servingSize', size)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{size}x</span>
            </label>
          ))}
        </div>
      </div>

      {/* Oil Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Oil Type</label>
        <div className="flex gap-4">
          {oilTypes.map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.oilType === type}
                onChange={() => updatePreparationParam('oilType', type)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Oil Amount */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Oil Amount</label>
        <div className="flex gap-4">
          {oilAmounts.map((amount) => (
            <label key={amount} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.oilAmount === amount}
                onChange={() => updatePreparationParam('oilAmount', amount)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{amount}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cream/Dairy Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Cream/Dairy Content</label>
        <div className="flex gap-4">
          {creamContents.map((content) => (
            <label key={content} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.creamContent === content}
                onChange={() => updatePreparationParam('creamContent', content)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{content}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cooking Method */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Cooking Method</label>
        <div className="flex flex-wrap gap-4">
          {cookingMethods.map((method) => (
            <label key={method} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.cookingMethod === method}
                onChange={() => updatePreparationParam('cookingMethod', method)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Overall Healthiness */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Overall Healthiness <span className="text-gray-500">(★)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="5"
            value={preparationParams.overallHealthiness}
            onChange={(e) => updatePreparationParam('overallHealthiness', Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-900 min-w-[3ch]">
            {'★'.repeat(preparationParams.overallHealthiness)}
          </span>
        </div>
      </div>
    </div>
  );
} 