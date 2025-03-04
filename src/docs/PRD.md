# Indian/South Asian Meal Nutrition Calculator - Product Requirements Document

## Overview
A web application that provides detailed macronutrient information for Indian and South Asian meals with customizable preparation parameters to ensure accurate nutritional calculations.

## User Goals
- Access accurate macronutrient information for Indian and South Asian dishes
- Customize dish preparation parameters to match actual cooking methods
- View detailed nutritional breakdown based on preparation choices
- Save favorite dishes and custom preparations

## Technical Architecture

### Frontend
- Next.js 14 App Router for routing and server components
- React components for interactive UI elements
- Tailwind CSS for styling
- Client-side state management for slider interactions
- Progressive Web App capabilities

### Backend
- Next.js API routes for data handling
- Firebase Realtime Database for storing:
  - Base dish nutritional data
  - User preferences and saved dishes
  - Preparation multipliers

## Core Features

### 1. Search & Dish Selection
- Fuzzy search for dish names in multiple languages
- Autocomplete suggestions
- Category-based browsing
- Recent searches history

### 2. Preparation Parameters
Interactive sliders for:
- Oil Type (Vegetable oil, Ghee, Coconut oil, etc.)
- Oil Amount (Light to Heavy)
- Cream/Dairy Content (None to Extra Rich)
- Preparation Style (Homemade vs Restaurant)
- Sugar Content (None to High)
- Overall Healthiness (Traditional to Health-Conscious)
- Frying Level (Not Fried, Pan Fried, Deep Fried)

### 3. Nutritional Information Display
- Calories per serving
- Macronutrient breakdown:
  - Carbohydrates (g)
  - Protein (g)
  - Fat (g)
  - Fiber (g)
  - Sugar (g)
- Percentage of daily values
- Visual representations (charts/graphs)

### 4. User Features
- Save custom preparations
- Share dishes with preparation details
- Create meal plans
- Track daily intake

## Data Requirements

### Dish Database Structure
```typescript
interface Dish {
  id: string;
  name: string;
  alternateNames: string[];
  category: string[];
  baseNutrition: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  servingSize: {
    amount: number;
    unit: string;
  };
  preparationMultipliers: {
    oilType: Record<string, number>;
    oilAmount: Record<string, number>;
    creamContent: Record<string, number>;
    preparationStyle: Record<string, number>;
    sugarContent: Record<string, number>;
    fryingLevel: Record<string, number>;
  };
}
```

## UI/UX Requirements

### Search Interface
- Clean, minimal search bar with autocomplete
- Category filters
- Recent searches
- Popular dishes section

### Parameter Adjustment Interface
- Intuitive slider controls
- Real-time nutrition updates
- Visual feedback for changes
- Preset combinations for common preparations

### Results Display
- Clear, easy-to-read nutritional information
- Visual representations of macronutrient ratios
- Comparison with recommended daily values
- Option to view detailed breakdown

## Technical Requirements

### Performance
- Initial load time < 2 seconds
- Real-time calculation updates
- Offline functionality for basic features
- Mobile-responsive design

### Data Management
- Regular database updates for nutritional information
- User data synchronization
- Caching strategy for frequently accessed dishes

### Security
- User authentication for saved preferences
- Data validation for user inputs
- API rate limiting
- Secure storage of user data

## Future Enhancements
1. Recipe recommendations based on nutritional goals
2. Integration with fitness tracking apps
3. Meal planning features
4. Community-contributed preparation styles
5. AI-powered image recognition for dish identification

## Questions for Discussion
1. Should we include micronutrient information in the initial release?
2. How do we handle regional variations of the same dish?
3. What is the source of our base nutritional data?
4. How do we validate the accuracy of our nutritional calculations?
5. Should we include allergen information?
6. How do we handle serving size variations?

## Success Metrics
- User engagement (daily active users)
- Search success rate
- User retention
- Feature usage statistics
- User satisfaction scores
- Data accuracy ratings 