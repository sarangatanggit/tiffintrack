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
  preparationParams: PreparationParameters | null;
  setPreparationParams: (params: PreparationParameters) => void;
  updatePreparationParam: <K extends keyof PreparationParameters>(
    key: K,
    value: PreparationParameters[K]
  ) => void;
  
  // Filtered Dishes
  filteredDishes: Dish[];
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
      set({
        selectedDish: dish,
        preparationParams: dish.defaultPreparation,
        searchQuery: dish.name,
      });
    } else {
      set({
        selectedDish: null,
        preparationParams: null,
      });
    }
  },
  
  // Preparation Parameters
  preparationParams: null,
  setPreparationParams: (params: PreparationParameters) => set({ preparationParams: params }),
  updatePreparationParam: <K extends keyof PreparationParameters>(
    key: K,
    value: PreparationParameters[K]
  ) => {
    const currentParams = get().preparationParams;
    if (currentParams) {
      set({
        preparationParams: {
          ...currentParams,
          [key]: value,
        },
      });
    }
  },
  
  // Filtered Dishes - temporarily using empty array
  filteredDishes: [],
})); 