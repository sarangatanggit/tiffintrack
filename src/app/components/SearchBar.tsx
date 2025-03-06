'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/app/lib/hooks/useDebounce';

interface SearchResult {
  food_name: string;
  common_names: string;
  food_unique_id: string;
  food_id: number;
  serving_type: string;
  calories_calculated_for: number;
  basic_unit_measure: number;
  nutrients: {
    fats: number;
    carbs: number;
    protein: number;
    calories: number;
  };
}

interface SearchBarProps {
  onSelect: (result: SearchResult) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchFood = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?value=${encodeURIComponent(debouncedQuery)}`);
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        setResults(data.items || []);
      } catch (err) {
        setError('Failed to fetch results');
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    searchFood();
  }, [debouncedQuery]);

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for food items..."
          className="w-full px-4 py-2 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.food_unique_id}
              onClick={() => {
                onSelect(result);
                setQuery('');
                setResults([]);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <div className="font-medium">{result.food_name}</div>
              <div className="text-sm text-gray-600">
                {result.nutrients.calories} cal | {result.nutrients.protein}g protein | {result.nutrients.carbs}g carbs | {result.nutrients.fats}g fat
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 