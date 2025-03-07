export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export type OilType = 'Ghee' | 'Coconut Oil' | 'Olive Oil';
export type OilAmount = 'Little' | 'Normal' | 'Extra';
export type CreamContent = 'None' | 'Little' | 'Normal' | 'Extra';
export type CookingMethod = 'No Fry' | 'Pan Fry or Sauteed' | 'Deep Fried' | 'Baked' | 'Air Fried';
export type ServingSize = 0.5 | 1 | 1.5 | 2;

export type PreparationStyle = 'Basic' | 'Traditional' | 'Modern' | 'Fusion';
export type FryingLevel = 'Light' | 'Medium' | 'Deep';

export interface PreparationParameters {
  servingSize: ServingSize;
  oilType: OilType;
  oilAmount: OilAmount;
  creamContent: CreamContent;
  cookingMethod: CookingMethod;
  overallHealthiness: number;
}

export interface APINutrients {
  fats: number;
  carbs: number;
  protein: number;
  calories: number;
}

export interface APIDish {
  food_name: string;
  common_names: string;
  food_unique_id: string;
  food_id: number;
  serving_type: string;
  calories_calculated_for: number;
  basic_unit_measure: number;
  nutrients: APINutrients;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  alternateNames: string[];
  category: string[];
  region: string;
  baseNutrition: Nutrition;
  servingSize: {
    amount: number;
    unit: string;
  };
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