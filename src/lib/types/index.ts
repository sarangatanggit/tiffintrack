export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface ServingSize {
  amount: number;
  unit: string;
}

export type OilType = 'Regular Oil' | 'Ghee' | 'Finishing Oil';
export type PreparationStyle = 'Homemade' | 'Restaurant Style';
export type FryingLevel = 'Not Fried' | 'Pan Fried' | 'Deep Fried';

export interface PreparationParameters {
  oilType: OilType;
  oilAmount: number;
  creamContent: number;
  preparationStyle: PreparationStyle;
  sugarContent: number;
  fryingLevel: FryingLevel;
  overallHealthiness: number;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  alternateNames: string[];
  category: string[];
  region: string;
  baseNutrition: Nutrition;
  servingSize: ServingSize;
  defaultPreparation: PreparationParameters;
  image?: string;
}

export interface NutritionCalculationMultipliers {
  oilType: Record<OilType, number>;
  oilAmount: (amount: number) => number;
  creamContent: (percentage: number) => number;
  preparationStyle: Record<PreparationStyle, number>;
  sugarContent: (grams: number) => number;
  fryingLevel: Record<FryingLevel, number>;
  overallHealthiness: (rating: number) => number;
} 