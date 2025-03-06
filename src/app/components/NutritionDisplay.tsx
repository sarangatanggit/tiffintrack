'use client';

interface NutrientData {
  food_name: string;
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

interface NutritionDisplayProps {
  data?: NutrientData;
}

export default function NutritionDisplay({ data }: NutritionDisplayProps) {
  const defaultData: NutrientData = {
    food_name: "Select a Dish",
    serving_type: "Standard Serving",
    calories_calculated_for: 100,
    basic_unit_measure: 100,
    nutrients: {
      fats: 0,
      carbs: 0,
      protein: 0,
      calories: 0
    }
  };

  const displayData = data || defaultData;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {data ? displayData.food_name : (
          <span className="text-gray-500">Select a Dish to View Nutrition Facts</span>
        )}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{Math.round(displayData.nutrients.calories)}</div>
          <div className="text-sm text-gray-600">Calories</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{displayData.nutrients.protein}g</div>
          <div className="text-sm text-gray-600">Protein</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-3xl font-bold text-yellow-600">{displayData.nutrients.carbs}g</div>
          <div className="text-sm text-gray-600">Carbs</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">{displayData.nutrients.fats}g</div>
          <div className="text-sm text-gray-600">Fat</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 text-center">
        <p>Serving Size: {displayData.calories_calculated_for}g</p>
        <p>Serving Type: {displayData.serving_type}</p>
        {!data && (
          <p className="mt-4 text-gray-500 italic">
            Search for an Indian dish above to view its nutritional information
          </p>
        )}
      </div>
    </div>
  );
} 