'use client';

import React, { useEffect, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNutritionStore } from '@/lib/store';
import { useDebounce } from '@/app/lib/hooks/useDebounce';
import { APIDish, Dish, OilType, PreparationStyle, FryingLevel } from '@/lib/types';

export function SearchBar() {
  const { 
    searchQuery,
    setSearchQuery,
    filteredDishes,
    setSelectedDish,
    setFilteredDishes
  } = useNutritionStore();

  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 150);

  useEffect(() => {
    const searchFood = async () => {
      if (!debouncedQuery.trim()) {
        setFilteredDishes([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?value=${encodeURIComponent(debouncedQuery)}`);
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        setFilteredDishes(data.items || []);
      } catch (err) {
        console.error('Search error:', err);
        setFilteredDishes([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchFood();
  }, [debouncedQuery, setFilteredDishes]);

  const handleDishSelect = (dish: APIDish) => {
    // Convert API dish to our internal Dish type
    const internalDish: Dish = {
      id: dish.food_unique_id,
      name: dish.food_name,
      description: dish.common_names,
      alternateNames: [],
      category: [],
      region: 'Indian',
      baseNutrition: {
        calories: dish.nutrients.calories,
        protein: dish.nutrients.protein,
        carbs: dish.nutrients.carbs,
        fat: dish.nutrients.fats,
        fiber: 0,
        sugar: 0
      },
      servingSize: {
        amount: dish.calories_calculated_for,
        unit: dish.serving_type
      },
      defaultPreparation: {
        oilType: 'Regular Oil' as OilType,
        oilAmount: 10,
        creamContent: 0,
        preparationStyle: 'Homemade' as PreparationStyle,
        sugarContent: 0,
        fryingLevel: 'Not Fried' as FryingLevel,
        overallHealthiness: 3
      }
    };
    
    setSelectedDish(internalDish);
    setTimeout(() => {
      setSearchQuery('');
    }, 100);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for Indian dishes..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors bg-white shadow-sm text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Autocomplete dropdown */}
      {searchQuery && (filteredDishes.length > 0 || isLoading) && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Searching...
            </div>
          ) : (
            (filteredDishes as unknown as APIDish[]).map((dish) => (
              <button
                key={dish.food_unique_id}
                onClick={() => handleDishSelect(dish)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
              >
                <div className="flex items-center">
                  <p className="font-medium text-gray-900">{dish.food_name}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
} 