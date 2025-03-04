'use client';

import React from 'react';
import { useNutritionStore } from '@/lib/store';
import { OilType, PreparationStyle, FryingLevel } from '@/lib/types';

export function PreparationParameters() {
  const { preparationParams, updatePreparationParam } = useNutritionStore();

  if (!preparationParams) return null;

  const oilTypes: OilType[] = ['Regular Oil', 'Ghee', 'Finishing Oil'];
  const preparationStyles: PreparationStyle[] = ['Homemade', 'Restaurant Style'];
  const fryingLevels: FryingLevel[] = ['Not Fried', 'Pan Fried', 'Deep Fried'];

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">Preparation Details</h2>

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
        <label className="block text-sm font-medium text-gray-700">
          Oil Amount <span className="text-gray-500">(ml)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="50"
            value={preparationParams.oilAmount}
            onChange={(e) => updatePreparationParam('oilAmount', Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-900 min-w-[3ch]">
            {preparationParams.oilAmount}ml
          </span>
        </div>
      </div>

      {/* Preparation Style */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Preparation Style</label>
        <div className="flex gap-4">
          {preparationStyles.map((style) => (
            <label key={style} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.preparationStyle === style}
                onChange={() => updatePreparationParam('preparationStyle', style)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{style}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cream/Dairy Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Cream/Dairy Content <span className="text-gray-500">(%)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={preparationParams.creamContent}
            onChange={(e) => updatePreparationParam('creamContent', Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-900 min-w-[3ch]">
            {preparationParams.creamContent}%
          </span>
        </div>
      </div>

      {/* Frying Level */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Frying Level</label>
        <div className="flex gap-4">
          {fryingLevels.map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                checked={preparationParams.fryingLevel === level}
                onChange={() => updatePreparationParam('fryingLevel', level)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="text-sm text-gray-900">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sugar Content */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sugar Content <span className="text-gray-500">(g)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="20"
            value={preparationParams.sugarContent}
            onChange={(e) => updatePreparationParam('sugarContent', Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-900 min-w-[3ch]">
            {preparationParams.sugarContent}g
          </span>
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