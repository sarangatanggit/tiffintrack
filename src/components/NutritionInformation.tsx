'use client';

import React from 'react';
import { useNutritionStore } from '@/lib/store';
import { calculateNutrition } from '@/lib/utils/nutritionCalculator';

export function NutritionInformation() {
  const { selectedDish, preparationParams } = useNutritionStore();
  
  const nutrition = selectedDish 
    ? calculateNutrition(selectedDish, preparationParams)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedDish ? selectedDish.name : 'Select a Dish'}
            </h2>
            <p className="mt-1 text-gray-500">
              {selectedDish ? selectedDish.description : 'Choose a dish to view its details'}
            </p>
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
              <span>
                {selectedDish 
                  ? selectedDish.category.join(' • ')
                  : 'Category'}
              </span>
              <span>•</span>
              <span>
                {selectedDish ? selectedDish.region : 'Region'}
              </span>
            </div>
          </div>
          {selectedDish?.image && (
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
            Per serving ({selectedDish ? `${selectedDish.servingSize.amount}${selectedDish.servingSize.unit}` : '--'})
          </p>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {nutrition ? nutrition.calories : '--'}
                </div>
                <div className="text-sm text-gray-500">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {nutrition ? `${nutrition.protein}g` : '--'}
                </div>
                <div className="text-sm text-gray-500">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {nutrition ? `${nutrition.carbs}g` : '--'}
                </div>
                <div className="text-sm text-gray-500">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {nutrition ? `${nutrition.fat}g` : '--'}
                </div>
                <div className="text-sm text-gray-500">Fat</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {nutrition ? `${nutrition.fiber}g` : '--'}
                </div>
                <div className="text-sm text-gray-500">Fiber</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {nutrition ? `${nutrition.sugar}g` : '--'}
                </div>
                <div className="text-sm text-gray-500">Sugar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 