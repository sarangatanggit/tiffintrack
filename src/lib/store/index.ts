import { create } from 'zustand';
import { StateCreator } from 'zustand';
import { Dish, PreparationParameters } from '../types';

interface NutritionStore {
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Selected Dish
  selectedDish: Dish | null;
  setSelectedDish: (dish: Dish | null) => void;
  
  // Preparation Parameters
  preparationParams: PreparationParameters;
  setPreparationParams: (params: PreparationParameters) => void;
  updatePreparationParam: <K extends keyof PreparationParameters>(
    key: K,
    value: PreparationParameters[K]
  ) => void;
  
  // Filtered Dishes
  filteredDishes: Dish[];
  setFilteredDishes: (dishes: Dish[]) => void;
}

export const useNutritionStore = create<NutritionStore>((set, get) => ({
  // Search
  searchQuery: '',
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    // Update filtered dishes based on search - temporarily using empty array
    set({ filteredDishes: [] });
  },
  
  // Selected Dish
  selectedDish: null,
  setSelectedDish: (dish: Dish | null) => {
    if (dish) {
      const currentParams = get().preparationParams;
      set({
        selectedDish: dish,
        preparationParams: {
          ...dish.defaultPreparation,
          ...currentParams, // Preserve any user-modified parameters
        },
        searchQuery: dish.name,
      });
    } else {
      set({
        selectedDish: null,
        // Don't clear preparationParams when dish is deselected
      });
    }
  },
  
  // Preparation Parameters
  preparationParams: {
    servingSize: 1,
    oilType: 'Ghee',
    oilAmount: 'Normal',
    creamContent: 'Normal',
    cookingMethod: 'No Fry',
    overallHealthiness: 3
  },
  setPreparationParams: (params: PreparationParameters) => set({ preparationParams: params }),
  updatePreparationParam: <K extends keyof PreparationParameters>(
    key: K,
    value: PreparationParameters[K]
  ) => {
    const currentParams = get().preparationParams;
    set({
      preparationParams: {
        ...currentParams,
        [key]: value,
      },
    });
  },
  
  // Filtered Dishes
  filteredDishes: [],
  setFilteredDishes: (dishes: Dish[]) => set({ filteredDishes: dishes }),
})); 