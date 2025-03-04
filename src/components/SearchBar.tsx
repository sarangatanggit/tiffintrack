'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useNutritionStore } from '@/lib/store';

export function SearchBar() {
  const { 
    searchQuery,
    setSearchQuery,
    filteredDishes,
    setSelectedDish
  } = useNutritionStore();

  const handleDishSelect = (dish: any) => {
    setSelectedDish(dish);
    // Clear the search query after a short delay to allow the selection to be visible
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
      {searchQuery && filteredDishes.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {filteredDishes.map((dish) => (
            <button
              key={dish.id}
              onClick={() => handleDishSelect(dish)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
            >
              <div className="flex items-center space-x-3">
                {dish.image && (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{dish.name}</p>
                  <p className="text-sm text-gray-500">{dish.category.join(' • ')}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 