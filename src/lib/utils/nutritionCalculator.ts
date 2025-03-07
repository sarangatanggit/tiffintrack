import { Dish, PreparationParameters, Nutrition } from '../types';

const OIL_TYPE_MULTIPLIERS = {
  'Ghee': 1.2,
  'Coconut Oil': 1.1,
  'Olive Oil': 1.0
};

const OIL_AMOUNT_MULTIPLIERS = {
  'Little': 0.8,
  'Normal': 1.0,
  'Extra': 1.3
};

const CREAM_CONTENT_MULTIPLIERS = {
  'None': 0.7,
  'Little': 0.9,
  'Normal': 1.0,
  'Extra': 1.4
};

const COOKING_METHOD_MULTIPLIERS = {
  'No Fry': 1.0,
  'Pan Fry or Sauteed': 1.2,
  'Deep Fried': 1.5,
  'Baked': 1.1,
  'Air Fried': 1.05
};

export function calculateNutrition(
  dish: Dish,
  params: PreparationParameters
): Nutrition {
  if (!dish || !dish.baseNutrition) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0
    };
  }

  const baseNutrition = dish.baseNutrition;
  
  // Calculate multipliers based on preparation parameters
  const oilMultiplier = OIL_TYPE_MULTIPLIERS[params.oilType] * OIL_AMOUNT_MULTIPLIERS[params.oilAmount];
  const creamMultiplier = CREAM_CONTENT_MULTIPLIERS[params.creamContent];
  const cookingMethodMultiplier = COOKING_METHOD_MULTIPLIERS[params.cookingMethod];
  
  // Apply serving size multiplier
  const servingSizeMultiplier = params.servingSize;
  
  // Calculate final values
  const finalMultiplier = oilMultiplier * creamMultiplier * cookingMethodMultiplier * servingSizeMultiplier;
  
  return {
    calories: Math.round(baseNutrition.calories * finalMultiplier),
    protein: Math.round(baseNutrition.protein * servingSizeMultiplier),
    carbs: Math.round(baseNutrition.carbs * servingSizeMultiplier),
    fat: Math.round(baseNutrition.fat * finalMultiplier),
    fiber: Math.round(baseNutrition.fiber * servingSizeMultiplier),
    sugar: Math.round(baseNutrition.sugar * servingSizeMultiplier)
  };
} 