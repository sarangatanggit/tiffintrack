"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { HealthinessRating } from "@/components/healthiness-rating"

export function PreparationComparison({
  dish,
  currentSettings,
  currentNutrition,
  currentHealthiness,
  comparisonSettings,
  comparisonNutrition,
  comparisonHealthiness,
  onUpdateComparison,
}) {
  // Local state for comparison settings
  const [localSettings, setLocalSettings] = useState(comparisonSettings)

  // Update comparison when apply is clicked
  const handleApplyComparison = () => {
    onUpdateComparison(localSettings)
  }

  // Calculate differences
  const caloriesDiff = comparisonNutrition.calories - currentNutrition.calories
  const proteinDiff = comparisonNutrition.protein - currentNutrition.protein
  const carbsDiff = comparisonNutrition.carbs - currentNutrition.carbs
  const fatDiff = comparisonNutrition.fat - currentNutrition.fat

  // Helper for formatting differences
  const formatDiff = (diff, unit = "") => {
    if (diff === 0) return <span className="text-gray-500">No change</span>
    const prefix = diff > 0 ? "+" : ""
    const color = diff > 0 ? "text-red-500" : "text-green-500"
    return (
      <span className={color}>
        {prefix}
        {diff}
        {unit}
      </span>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Current Preparation</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Serving Size</span>
              <span className="text-sm">{currentSettings.servingSize}x</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Oil Type</span>
              <span className="text-sm capitalize">
                {currentSettings.oilType === "ghee"
                  ? "Ghee"
                  : currentSettings.oilType === "coconut-oil"
                    ? "Coconut Oil"
                    : "Olive Oil"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Oil Amount</span>
              <span className="text-sm">
                {currentSettings.oilAmount === 1 ? "Little" : currentSettings.oilAmount === 2 ? "Normal" : "Extra"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Dairy Content</span>
              <span className="text-sm">
                {currentSettings.dairyContent === 0
                  ? "None"
                  : currentSettings.dairyContent === 1
                    ? "Little"
                    : currentSettings.dairyContent === 2
                      ? "Normal"
                      : "Extra"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Cooking Method</span>
              <span className="text-sm capitalize">{currentSettings.cookingMethod.replace("-", " ")}</span>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Nutrition Summary</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div>
                  <div className="text-xs text-gray-500">Calories</div>
                  <div className="font-medium">{currentNutrition.calories} kcal</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Protein</div>
                  <div className="font-medium">{currentNutrition.protein}g</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Carbs</div>
                  <div className="font-medium">{currentNutrition.carbs}g</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Fat</div>
                  <div className="font-medium">{currentNutrition.fat}g</div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <HealthinessRating rating={currentHealthiness} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Alternative Preparation</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comp-serving-size">Serving Size</Label>
              <RadioGroup
                id="comp-serving-size"
                value={localSettings.servingSize.toString()}
                onValueChange={(value) => setLocalSettings({ ...localSettings, servingSize: Number.parseFloat(value) })}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0.5" id="comp-serving-0.5" />
                  <Label htmlFor="comp-serving-0.5" className="cursor-pointer">
                    0.5x
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="comp-serving-1" />
                  <Label htmlFor="comp-serving-1" className="cursor-pointer">
                    1x
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1.5" id="comp-serving-1.5" />
                  <Label htmlFor="comp-serving-1.5" className="cursor-pointer">
                    1.5x
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="comp-serving-2" />
                  <Label htmlFor="comp-serving-2" className="cursor-pointer">
                    2x
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-oil-type">Oil Type</Label>
              <RadioGroup
                id="comp-oil-type"
                value={localSettings.oilType}
                onValueChange={(value) => setLocalSettings({ ...localSettings, oilType: value })}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ghee" id="comp-oil-ghee" />
                  <Label htmlFor="comp-oil-ghee" className="cursor-pointer">
                    Ghee
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coconut-oil" id="comp-oil-coconut" />
                  <Label htmlFor="comp-oil-coconut" className="cursor-pointer">
                    Coconut Oil
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="olive-oil" id="comp-oil-olive" />
                  <Label htmlFor="comp-oil-olive" className="cursor-pointer">
                    Olive Oil
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="comp-oil-amount">Oil Amount</Label>
                <span className="text-sm">
                  {localSettings.oilAmount === 1 ? "Little" : localSettings.oilAmount === 2 ? "Normal" : "Extra"}
                </span>
              </div>
              <Slider
                id="comp-oil-amount"
                min={1}
                max={3}
                step={1}
                value={[localSettings.oilAmount]}
                onValueChange={(value) => setLocalSettings({ ...localSettings, oilAmount: value[0] })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="comp-dairy-content">Cream/Dairy Content</Label>
                <span className="text-sm">
                  {localSettings.dairyContent === 0
                    ? "None"
                    : localSettings.dairyContent === 1
                      ? "Little"
                      : localSettings.dairyContent === 2
                        ? "Normal"
                        : "Extra"}
                </span>
              </div>
              <Slider
                id="comp-dairy-content"
                min={0}
                max={3}
                step={1}
                value={[localSettings.dairyContent]}
                onValueChange={(value) => setLocalSettings({ ...localSettings, dairyContent: value[0] })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comp-cooking-method">Cooking Method</Label>
              <RadioGroup
                id="comp-cooking-method"
                value={localSettings.cookingMethod}
                onValueChange={(value) => setLocalSettings({ ...localSettings, cookingMethod: value })}
                className="grid grid-cols-3 gap-2 mt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-fry" id="comp-method-no-fry" />
                  <Label htmlFor="comp-method-no-fry" className="cursor-pointer">
                    No Fry
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pan-fry" id="comp-method-pan-fry" />
                  <Label htmlFor="comp-method-pan-fry" className="cursor-pointer">
                    Pan Fry
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deep-fry" id="comp-method-deep-fry" />
                  <Label htmlFor="comp-method-deep-fry" className="cursor-pointer">
                    Deep Fry
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="baked" id="comp-method-baked" />
                  <Label htmlFor="comp-method-baked" className="cursor-pointer">
                    Baked
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="air-fry" id="comp-method-air-fry" />
                  <Label htmlFor="comp-method-air-fry" className="cursor-pointer">
                    Air Fried
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4">
              <Button onClick={handleApplyComparison} className="w-full">
                Apply Changes
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Nutrition Comparison</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Calories</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{comparisonNutrition.calories} kcal</span>
                    <span className="text-xs">{formatDiff(caloriesDiff, " kcal")}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Protein</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{comparisonNutrition.protein}g</span>
                    <span className="text-xs">{formatDiff(proteinDiff, "g")}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Carbs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{comparisonNutrition.carbs}g</span>
                    <span className="text-xs">{formatDiff(carbsDiff, "g")}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fat</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{comparisonNutrition.fat}g</span>
                    <span className="text-xs">{formatDiff(fatDiff, "g")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <HealthinessRating rating={comparisonHealthiness} />
              {comparisonHealthiness > currentHealthiness && (
                <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Healthier alternative
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

