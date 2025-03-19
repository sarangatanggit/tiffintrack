"use client"

import { useState } from "react"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import type { Dish } from "@/lib/db"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Spinner } from "@/components/ui/spinner"

import { NutritionChart } from "@/components/nutrition-chart"
import { DishRecommendations } from "@/components/dish-recommendations"
import { HealthinessRating } from "@/components/healthiness-rating"
import { PreparationComparison } from "@/components/preparation-comparison"

export function DishDetail({ dish }: { dish: Dish }) {
  // Preparation variables - Initialize with default values
  const [servingSize, setServingSize] = useState(1)
  const [oilType, setOilType] = useState("ghee")
  const [oilAmount, setOilAmount] = useState(2) // 1: little, 2: normal, 3: extra
  const [dairyContent, setDairyContent] = useState(2) // 0: none, 1: little, 2: normal, 3: extra
  const [cookingMethod, setCookingMethod] = useState("pan-fry")
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonSettings, setComparisonSettings] = useState({
    servingSize: 1,
    oilType: "olive-oil",
    oilAmount: 1,
    dairyContent: 1,
    cookingMethod: "baked",
  })

  const [imageLoading, setImageLoading] = useState(true)

  // Calculate updated nutrition values based on preparation settings
  const nutrition = calculateNutrition(dish, {
    servingSize,
    oilType,
    oilAmount,
    dairyContent,
    cookingMethod,
  })

  // Calculate healthiness rating based on preparation choices
  const healthinessRating = calculateHealthinessRating({
    oilType,
    oilAmount,
    dairyContent,
    cookingMethod,
  })

  // Calculate comparison nutrition
  const comparisonNutrition = calculateNutrition(dish, comparisonSettings)
  const comparisonHealthiness = calculateHealthinessRating(comparisonSettings)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <div className="flex items-center gap-1 font-semibold">
              <span className="text-primary">Tiffin</span>
              <span>Track</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-4">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left column - Dish info and nutrition */}
            <div className="space-y-4 lg:col-span-5">
              <div className="flex gap-6">
                <div className="relative w-1/2 aspect-square overflow-hidden rounded-lg bg-muted">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Spinner size="md" />
                    </div>
                  )}
                  <img
                    src={dish.image_url || "/placeholder.svg?height=300&width=300"}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                    onLoad={() => setImageLoading(false)}
                    style={{ opacity: imageLoading ? 0 : 1 }}
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {dish.region}
                      </Badge>
                      {dish.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h1 className="text-2xl font-bold">{dish.name}</h1>
                    <p className="text-sm text-gray-500 line-clamp-3 mt-1">{dish.description}</p>
                  </div>
                </div>
              </div>

              {/* Healthiness Rating */}
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold">Healthiness Rating</h2>
                      <p className="text-xs text-gray-500">Based on your preparation choices</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                          <p className="text-sm">
                            The healthiness rating considers oil type, amount, dairy content, and cooking method. 5
                            stars represents the healthiest preparation method.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="mt-2">
                    <HealthinessRating rating={healthinessRating} />
                  </div>
                </CardContent>
              </Card>

              {/* Nutritional Information */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-semibold">Nutritional Information</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Compare</span>
                    <Button
                      variant={showComparison ? "default" : "outline"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setShowComparison(!showComparison)}
                    >
                      {showComparison ? "Hide" : "Compare"}
                    </Button>
                  </div>
                </div>

                {showComparison ? (
                  <PreparationComparison
                    dish={dish}
                    currentSettings={{
                      servingSize,
                      oilType,
                      oilAmount,
                      dairyContent,
                      cookingMethod,
                    }}
                    currentNutrition={nutrition}
                    currentHealthiness={healthinessRating}
                    comparisonSettings={comparisonSettings}
                    comparisonNutrition={comparisonNutrition}
                    comparisonHealthiness={comparisonHealthiness}
                    onUpdateComparison={setComparisonSettings}
                  />
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <Tabs defaultValue="overview">
                        <TabsList className="w-full rounded-none">
                          <TabsTrigger value="overview" className="flex-1 text-xs">
                            Overview
                          </TabsTrigger>
                          <TabsTrigger value="detailed" className="flex-1 text-xs">
                            Detailed
                          </TabsTrigger>
                          <TabsTrigger value="visual" className="flex-1 text-xs">
                            Visual
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-gray-500">Calories</div>
                              <div className="text-xl font-bold">{nutrition.calories}</div>
                              <div className="text-xs text-gray-500">kcal</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-gray-500">Protein</div>
                              <div className="text-xl font-bold">{nutrition.protein}g</div>
                              <div className="text-xs text-gray-500">
                                {calculatePercentage(nutrition.protein * 4, nutrition.calories)}% of total
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-gray-500">Carbohydrates</div>
                              <div className="text-xl font-bold">{nutrition.carbs}g</div>
                              <div className="text-xs text-gray-500">
                                {calculatePercentage(nutrition.carbs * 4, nutrition.calories)}% of total
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-gray-500">Fat</div>
                              <div className="text-xl font-bold">{nutrition.fat}g</div>
                              <div className="text-xs text-gray-500">
                                {calculatePercentage(nutrition.fat * 9, nutrition.calories)}% of total
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="detailed" className="p-4">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">Saturated Fat</span>
                                <span className="text-xs">{nutrition.saturatedFat}g</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">Unsaturated Fat</span>
                                <span className="text-xs">{nutrition.unsaturatedFat}g</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">Dietary Fiber</span>
                                <span className="text-xs">{nutrition.fiber}g</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">Sugar</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-xs cursor-help underline decoration-dotted">
                                        {nutrition.sugar}g
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">
                                        Natural: {nutrition.naturalSugar}g, Added: {nutrition.addedSugar}g
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">Sodium</span>
                                <span className="text-xs">{nutrition.sodium}mg</span>
                              </div>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="text-xs font-medium mb-1">Key Micronutrients</div>
                              <div className="space-y-1">
                                {nutrition.micronutrients.map((nutrient, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span className="text-xs">{nutrient.name}</span>
                                    <span className="text-xs">
                                      {nutrient.amount}
                                      {nutrient.unit}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="visual" className="p-4">
                          <NutritionChart nutrition={nutrition} />
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Right column - Preparation Controls */}
            <div className="space-y-4 lg:col-span-7">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-base font-semibold">Customize Preparation</h2>
                      <p className="text-xs text-gray-500">
                        Adjust these settings to see how they affect nutritional values
                      </p>
                    </div>

                    {/* Serving Size */}
                    <div className="space-y-2">
                      <Label htmlFor="serving-size" className="text-sm">
                        Serving Size
                      </Label>
                      <RadioGroup
                        id="serving-size"
                        value={servingSize.toString()}
                        onValueChange={(value) => setServingSize(Number.parseFloat(value))}
                        className="flex space-x-2"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="0.5" id="serving-0.5" className="h-3.5 w-3.5" />
                          <Label htmlFor="serving-0.5" className="cursor-pointer text-xs">
                            0.5x
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="1" id="serving-1" className="h-3.5 w-3.5" />
                          <Label htmlFor="serving-1" className="cursor-pointer text-xs">
                            1x
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="1.5" id="serving-1.5" className="h-3.5 w-3.5" />
                          <Label htmlFor="serving-1.5" className="cursor-pointer text-xs">
                            1.5x
                          </Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="2" id="serving-2" className="h-3.5 w-3.5" />
                          <Label htmlFor="serving-2" className="cursor-pointer text-xs">
                            2x
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Oil Type */}
                    <div className="space-y-2">
                      <Label htmlFor="oil-type" className="text-sm">
                        Oil Type
                      </Label>
                      <RadioGroup
                        id="oil-type"
                        value={oilType}
                        onValueChange={setOilType}
                        className="grid grid-cols-3 gap-2"
                      >
                        <Label
                          htmlFor="oil-ghee"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="ghee" id="oil-ghee" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-2 h-5 w-5"
                          >
                            <path d="M14 3c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
                            <path d="M18 6h-4a2 2 0 0 0-2 2v14" />
                            <path d="M6 9h12" />
                            <path d="M6 12h12" />
                            <path d="M6 15h12" />
                            <path d="M6 18h12" />
                          </svg>
                          <div className="text-center text-xs">Ghee</div>
                        </Label>
                        <Label
                          htmlFor="oil-coconut"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="coconut-oil" id="oil-coconut" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-2 h-5 w-5"
                          >
                            <path d="M12 2v1" />
                            <path d="M17.4 5.6 16.7 6.3" />
                            <path d="M20 12h-1" />
                            <path d="M17.4 18.4l-.7-.7" />
                            <path d="M12 20v1" />
                            <path d="M6.6 18.4l.7-.7" />
                            <path d="M4 12h1" />
                            <path d="M6.6 5.6l.7.7" />
                            <path d="M12 8v4" />
                            <path d="M12 16h.01" />
                          </svg>
                          <div className="text-center text-xs">Coconut Oil</div>
                        </Label>
                        <Label
                          htmlFor="oil-olive"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="olive-oil" id="oil-olive" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-2 h-5 w-5"
                          >
                            <path d="M8 2c4 0 8 1.7 8 4v2a3 3 0 0 1-6 0v-1H8a2 2 0 1 0 0 4h8c2.5 0 5-1.7 5-4s-2.5-4-5-4H8" />
                            <path d="M10 16v-3" />
                            <path d="M14 16v-3" />
                            <path d="M10 20v-3" />
                            <path d="M14 20v-3" />
                            <path d="M6 16c0 2.5 2.5 4 5 4s5-1.5 5-4" />
                          </svg>
                          <div className="text-center text-xs">Olive Oil</div>
                        </Label>
                      </RadioGroup>
                    </div>

                    {/* Oil Amount */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="oil-amount" className="text-sm">
                          Oil Amount
                        </Label>
                        <span className="text-xs">
                          {oilAmount === 1 ? "Little" : oilAmount === 2 ? "Normal" : "Extra"}
                        </span>
                      </div>
                      <Slider
                        id="oil-amount"
                        min={1}
                        max={3}
                        step={1}
                        value={[oilAmount]}
                        onValueChange={(value) => setOilAmount(value[0])}
                        className="py-0"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Little</span>
                        <span>Normal</span>
                        <span>Extra</span>
                      </div>
                    </div>

                    {/* Dairy Content */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dairy-content" className="text-sm">
                          Cream/Dairy Content
                        </Label>
                        <span className="text-xs">
                          {dairyContent === 0
                            ? "None"
                            : dairyContent === 1
                              ? "Little"
                              : dairyContent === 2
                                ? "Normal"
                                : "Extra"}
                        </span>
                      </div>
                      <Slider
                        id="dairy-content"
                        min={0}
                        max={3}
                        step={1}
                        value={[dairyContent]}
                        onValueChange={(value) => setDairyContent(value[0])}
                        className="py-0"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>None</span>
                        <span>Little</span>
                        <span>Normal</span>
                        <span>Extra</span>
                      </div>
                    </div>

                    {/* Cooking Method */}
                    <div className="space-y-2">
                      <Label htmlFor="cooking-method" className="text-sm">
                        Cooking Method
                      </Label>
                      <RadioGroup
                        id="cooking-method"
                        value={cookingMethod}
                        onValueChange={setCookingMethod}
                        className="grid grid-cols-5 gap-2"
                      >
                        <Label
                          htmlFor="method-no-fry"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="no-fry" id="method-no-fry" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-1 h-4 w-4"
                          >
                            <path d="M12 12c-2-2.96-1.8-5.67-1.64-7a.5.5 0 0 1 .64-.39c1.33.33 4.6 1.27 6 3.39a.5.5 0 0 1-.39.82c-1.33.13-2.61.5-3.5 1.34" />
                            <path d="M17.57 13.5c-1.37.37-2.57 1-3.57 2" />
                            <path d="M3 10.5c4-2.3 7.5-2.3 11.5 0" />
                            <path d="M3 13.5c4-2.3 7.5-2.3 11.5 0" />
                            <path d="M3 16.5c4-2.3 7.5-2.3 11.5 0" />
                          </svg>
                          <div className="text-center text-xs">No Fry</div>
                        </Label>
                        <Label
                          htmlFor="method-pan-fry"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="pan-fry" id="method-pan-fry" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-1 h-4 w-4"
                          >
                            <path d="M15 5.5A7 7 0 1 0 8 15h7a7 7 0 0 0 0-14Z" />
                            <path d="M9.5 6.5a3.5 3.5 0 0 0 5 5" />
                            <path d="m21 21-1-1" />
                          </svg>
                          <div className="text-center text-xs">Pan Fry</div>
                        </Label>
                        <Label
                          htmlFor="method-deep-fry"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="deep-fry" id="method-deep-fry" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-1 h-4 w-4"
                          >
                            <path d="M7 3h10" />
                            <path d="M16 3a2 2 0 0 1 2 2v5.5a2.5 2.5 0 0 1-2.5 2.5H14a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2" />
                            <path d="M9 13v-2" />
                            <path d="M9 3v8" />
                            <path d="M15 18H9" />
                            <path d="M9 22v-4" />
                            <path d="M15 22v-4" />
                          </svg>
                          <div className="text-center text-xs">Deep Fry</div>
                        </Label>
                        <Label
                          htmlFor="method-baked"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="baked" id="method-baked" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-1 h-4 w-4"
                          >
                            <path d="M4 11h16a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 1-1.5 1.5H19" />
                            <path d="M18 18H5a1 1 0 0 1-1-1v-5" />
                            <path d="M12 7V4" />
                            <path d="M10 7H8" />
                            <path d="M16 7h-2" />
                            <path d="M11 11v.01" />
                            <path d="M13 11v.01" />
                            <path d="M13 15v.01" />
                            <path d="M11 15v.01" />
                            <path d="M16 15v.01" />
                            <path d="M8 15v.01" />
                          </svg>
                          <div className="text-center text-xs">Baked</div>
                        </Label>
                        <Label
                          htmlFor="method-air-fry"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="air-fry" id="method-air-fry" className="sr-only" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mb-1 h-4 w-4"
                          >
                            <path d="M12 22a8 8 0 0 0 8-8" />
                            <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
                            <path d="M12 18a6 6 0 0 0 6-6" />
                            <path d="M16 12h.01" />
                            <path d="M12 12h.01" />
                            <path d="M8 12h.01" />
                            <path d="M12 8h.01" />
                            <path d="M12 16h.01" />
                          </svg>
                          <div className="text-center text-xs">Air Fried</div>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full text-sm">Save This Preparation</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="text-base font-semibold mb-3">Preparation Impact</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-primary"
                        >
                          <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM15.42 15.42l6.37-6.37a4.5 4.5 0 0 0-6.37-6.36L9.06 9.05" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-xs">Oil Type Impact</h4>
                        <p className="text-muted-foreground text-xs">
                          {oilType === "ghee"
                            ? "Ghee has a high saturated fat content but contains beneficial butyrate. It adds a rich, nutty flavor."
                            : oilType === "coconut-oil"
                              ? "Coconut oil is high in saturated fat but contains medium-chain triglycerides (MCTs). It adds a subtle coconut flavor."
                              : "Olive oil is rich in monounsaturated fats and antioxidants. It has a mild flavor that works well with many dishes."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-primary"
                        >
                          <path d="M12 22a8 8 0 0 0 8-8" />
                          <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-xs">Cooking Method Impact</h4>
                        <p className="text-muted-foreground text-xs">
                          {cookingMethod === "no-fry"
                            ? "No fry methods retain more nutrients and result in lower calorie content."
                            : cookingMethod === "pan-fry"
                              ? "Pan frying adds moderate calories but creates a flavorful exterior while maintaining moisture."
                              : cookingMethod === "deep-fry"
                                ? "Deep frying significantly increases calorie and fat content but creates a crispy texture."
                                : cookingMethod === "baked"
                                  ? "Baking uses minimal oil and preserves nutrients while developing flavor."
                                  : "Air frying creates a crispy texture similar to deep frying but with significantly less oil."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-primary"
                        >
                          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-xs">Flavor Profile</h4>
                        <p className="text-muted-foreground text-xs">
                          Your current preparation choices will result in a
                          {oilAmount === 3 ? " rich and intense" : oilAmount === 2 ? " balanced" : " lighter"} flavor
                          with
                          {dairyContent >= 2 ? " creamy" : ""} notes and a
                          {cookingMethod === "deep-fry"
                            ? " crispy texture"
                            : cookingMethod === "pan-fry"
                              ? " flavorful exterior"
                              : cookingMethod === "baked"
                                ? " firm texture"
                                : cookingMethod === "air-fry"
                                  ? " light crispiness"
                                  : " soft texture"}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-bold">Similar Dishes</h2>
            <DishRecommendations dishId={dish.id} />
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/50 mt-6">
        <div className="container flex flex-col gap-4 py-6 md:h-16 md:flex-row md:items-center md:gap-6 md:py-0">
          <div className="flex flex-1 items-center gap-4 md:gap-6">
            <div className="font-semibold">Tiffin Track</div>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                About
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Privacy
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Terms
              </Link>
              <Link className="text-xs hover:underline underline-offset-4" href="#">
                Contact
              </Link>
            </nav>
          </div>
          <div className="md:ml-auto md:text-right">
            <p className="text-xs text-gray-500">© 2025 Tiffin Track. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper function to calculate percentage
function calculatePercentage(value, total) {
  return Math.round((value / total) * 100)
}

// Calculate healthiness rating based on preparation choices
function calculateHealthinessRating(preparation) {
  // Start with a base rating
  let rating = 3

  // Oil type impact
  if (preparation.oilType === "olive-oil") rating += 0.5
  if (preparation.oilType === "coconut-oil") rating += 0.25

  // Oil amount impact
  if (preparation.oilAmount === 1) rating += 0.75
  if (preparation.oilAmount === 3) rating -= 0.75

  // Dairy content impact
  if (preparation.dairyContent === 0) rating += 0.75
  if (preparation.dairyContent === 1) rating += 0.5
  if (preparation.dairyContent === 3) rating -= 0.5

  // Cooking method impact
  if (preparation.cookingMethod === "no-fry") rating += 0.75
  if (preparation.cookingMethod === "baked") rating += 0.5
  if (preparation.cookingMethod === "air-fry") rating += 0.5
  if (preparation.cookingMethod === "deep-fry") rating -= 1

  // Ensure rating is between 1 and 5
  rating = Math.max(1, Math.min(5, Math.round(rating)))

  return rating
}

// Mock function to calculate nutrition based on customizations
function calculateNutrition(dish, preparation) {
  // Base nutrition values from the dish
  const base = {
    calories: dish.calories || 350,
    protein: dish.protein || 20,
    carbs: dish.carbs || 30,
    fat: dish.fat || 15,
    saturatedFat: Math.round(dish.fat * 0.4) || 6,
    unsaturatedFat: Math.round(dish.fat * 0.6) || 9,
    fiber: Math.round(dish.carbs * 0.15) || 4,
    sugar: Math.round(dish.carbs * 0.1) || 3,
    naturalSugar: Math.round(dish.carbs * 0.08) || 2,
    addedSugar: Math.round(dish.carbs * 0.02) || 1,
    sodium: dish.calories * 1.5 || 525,
    micronutrients: [
      { name: "Vitamin A", amount: 150, unit: "mcg" },
      { name: "Vitamin C", amount: 6, unit: "mg" },
      { name: "Calcium", amount: 80, unit: "mg" },
      { name: "Iron", amount: 1.8, unit: "mg" },
      { name: "Turmeric (Curcumin)", amount: 15, unit: "mg" },
    ],
  }

  // Serving size factor
  const servingFactor = preparation.servingSize

  // Oil type factors
  const oilTypeFactors = {
    ghee: { saturatedFat: 1.2, unsaturatedFat: 0.8 },
    "coconut-oil": { saturatedFat: 1.1, unsaturatedFat: 0.9 },
    "olive-oil": { saturatedFat: 0.7, unsaturatedFat: 1.3 },
  }

  // Oil amount factors
  const oilAmountFactors = {
    1: 0.7, // little
    2: 1.0, // normal
    3: 1.5, // extra
  }

  // Dairy content factors
  const dairyContentFactors = {
    0: 0.5, // none
    1: 0.8, // little
    2: 1.0, // normal
    3: 1.3, // extra
  }

  // Cooking method factors
  const cookingMethodFactors = {
    "no-fry": { calories: 0.8, fat: 0.7 },
    "pan-fry": { calories: 1.0, fat: 1.0 },
    "deep-fry": { calories: 1.4, fat: 1.5 },
    baked: { calories: 0.9, fat: 0.8 },
    "air-fry": { calories: 0.85, fat: 0.75 },
  }

  // Get the appropriate factors
  const oilTypeFactor = oilTypeFactors[preparation.oilType] || oilTypeFactors["ghee"]
  const oilAmountFactor = oilAmountFactors[preparation.oilAmount] || 1
  const dairyContentFactor = dairyContentFactors[preparation.dairyContent] || 1
  const cookingMethodFactor = cookingMethodFactors[preparation.cookingMethod] || cookingMethodFactors["pan-fry"]

  // Calculate adjusted nutrition values
  return {
    calories: Math.round(
      base.calories *
        servingFactor *
        cookingMethodFactor.calories *
        (1 + (oilAmountFactor - 1) * 0.3 + (dairyContentFactor - 1) * 0.2),
    ),
    protein: Math.round(base.protein * servingFactor * (dairyContentFactor === 0 ? 0.9 : dairyContentFactor)),
    carbs: Math.round(base.carbs * servingFactor),
    fat: Math.round(
      base.fat *
        servingFactor *
        cookingMethodFactor.fat *
        oilAmountFactor *
        (dairyContentFactor === 0 ? 0.8 : dairyContentFactor),
    ),
    saturatedFat: Math.round(
      base.saturatedFat *
        servingFactor *
        oilTypeFactor.saturatedFat *
        oilAmountFactor *
        (dairyContentFactor === 0 ? 0.7 : dairyContentFactor),
    ),
    unsaturatedFat: Math.round(base.unsaturatedFat * servingFactor * oilTypeFactor.unsaturatedFat * oilAmountFactor),
    fiber: Math.round(base.fiber * servingFactor),
    sugar: Math.round(base.sugar * servingFactor),
    naturalSugar: Math.round(base.naturalSugar * servingFactor),
    addedSugar: Math.round(base.addedSugar * servingFactor),
    sodium: Math.round(base.sodium * servingFactor),
    micronutrients: base.micronutrients.map((nutrient) => ({
      ...nutrient,
      amount: Math.round(nutrient.amount * servingFactor * (cookingMethodFactor.calories < 1 ? 1.1 : 0.9)), // Better nutrient retention with gentler cooking
    })),
  }
}

