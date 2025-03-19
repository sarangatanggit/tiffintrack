# Product Requirements Document: NutriDesi

## Overview
NutriDesi is a specialized nutrition application providing comprehensive macronutrient information for Indian and South Asian meals. The application allows users to search for specific dishes and adjust preparation variables to receive accurate nutritional calculations tailored to regional cooking methods.

## Problem Statement
Indian and South Asian cuisines are diverse and complex, with significant nutritional variation based on preparation methods, regional differences, and ingredient substitutions. Existing nutrition apps lack the specificity needed for these cuisines, making it difficult for people to accurately track their nutritional intake when consuming these foods.

## User Needs
- Access accurate nutritional information for Indian and South Asian dishes
- Customize calculations based on preparation methods (e.g., oil used, cooking method)
- Understand caloric and macronutrient breakdowns at a glance
- Compare nutritional profiles across similar dishes
- Save favorite dishes and customized preparations

## Core Features

### 1. Comprehensive Food Database
- Extensive collection of Indian and South Asian dishes
- Regional variations of popular dishes
- Ingredient-level nutritional breakdown
- Source attribution for nutritional data

### 2. Customizable Preparation Variables
- **Serving Size**
  - Adjustable slider with discrete options: 0.5x, 1x, 1.5x, 2x
  - Proportionally scales all nutritional values
  - Visual representation of portion size changes
  
- **Oil Type**
  - Selection between: Ghee, Coconut Oil, Olive Oil
  - Each type has different fatty acid profiles and caloric impacts
  - Affects taste profile indication
  - Visual representation of traditional vs. alternative options

- **Oil Amount**
  - Slider with three positions: Little, Normal, Extra
  - Significantly impacts calorie and fat content
  - Affects mouthfeel and flavor intensity indicators
  - Visual feedback on healthiness impact

- **Cream/Dairy Content**
  - Slider with four positions: None, Little, Normal, Extra
  - Impacts protein, fat, and calcium values
  - Consideration for lactose intolerance and vegan alternatives
  - Visual indication of richness and creaminess

- **Cooking Method**
  - Selection between: No Fry, Pan Fry, Deep Fry, Baked, Air Fried
  - Major impact on oil absorption and caloric content
  - Affects texture and taste profile indicators
  - Visual comparison between traditional and healthier alternatives

- **Healthiness Rating**
  - Dynamic 1-5 star rating that updates based on preparation choices
  - Considers oil type, amount, dairy content, and cooking method
  - Provides at-a-glance assessment of nutritional quality
  - Accompanied by specific improvement suggestions

### 3. Detailed Nutritional Breakdown
- Calories
- Carbohydrates (total, complex, simple)
- Protein
- Fat (saturated, unsaturated, trans)
- Fiber
- Sugar (added and natural)
- Micronutrients relevant to Indian cuisine (e.g., turmeric/curcumin content)

### 4. Preparation Factor Impact on Nutrition
- **Oil Type Impact Matrix**:
  | Oil Type | Caloric Density | Saturated Fat | Unsaturated Fat | Smoke Point | Health Impact |
  |----------|----------------|---------------|-----------------|-------------|---------------|
  | Ghee | High (9 cal/g) | High | Moderate | High | Traditional, contains butyrate |
  | Coconut Oil | High (9 cal/g) | High | Low | Medium | Contains MCTs |
  | Olive Oil | High (9 cal/g) | Low | High | Medium | Heart-healthy monounsaturated |

- **Cooking Method Impact**:
  | Method | Oil Absorption | Nutrient Retention | Caloric Impact | Texture Impact |
  |--------|---------------|-------------------|---------------|---------------|
  | No Fry | Minimal | High | Lowest | Soft, moist |
  | Pan Fry | Moderate | Moderate | Medium | Crisp exterior |
  | Deep Fry | High | Low | Highest | Crispy throughout |
  | Baked | Low | Moderate | Low-Medium | Dry, firm |
  | Air Fried | Very Low | Moderate | Low | Crisp, less oily |

- **Healthiness Rating Algorithm**:
  - 5 Stars: Minimal oil, healthier oil type, no/little dairy, no fry/baked/air fried
  - 4 Stars: Light oil usage, healthier oil type, light dairy, no fry/baked
  - 3 Stars: Moderate oil, any type, moderate dairy, pan fry
  - 2 Stars: Heavy oil usage, high dairy content, deep fried
  - 1 Star: Maximum oil and dairy, deep fried

### 5. User Experience Features
- Search functionality with filters
- Favorites system
- Meal planning integration
- Dietary restriction filters (vegetarian, vegan, gluten-free, etc.)
- Share functionality for recipes and nutritional data
- Preparation method comparison tool

## Design System Analysis

### Color Palette
- **Primary Colors:**
  - Deep Turmeric (#E2A72E) - Primary actions, highlights
  - Curry Leaf Green (#4D6447) - Secondary elements, success states
  - Cardamom (#A18276) - Tertiary elements
  
- **Neutral Colors:**
  - Rice White (#F9F6F0) - Background, light mode
  - Masala Dark (#332E2C) - Text, dark mode background
  - Cumin (#C3B091) - Borders, separators

- **Accent Colors:**
  - Chili Red (#D64045) - Warnings, important notifications
  - Saffron (#F2B705) - Highlighted information
  - Mint Green (#C3E8BD) - Success messages

- **Healthiness Rating Colors:**
  - 5 Stars: #4D6447 (Curry Leaf Green)
  - 4 Stars: #8FB17A (Light Green)
  - 3 Stars: #E2A72E (Deep Turmeric)
  - 2 Stars: #E87E51 (Tandoori Orange)
  - 1 Star: #D64045 (Chili Red)

### Typography
- **Primary Font:** "Poppins" (Sans-serif)
  - Clean, modern, readable at various sizes
  - Weights: Regular (400), Medium (500), SemiBold (600)

- **Secondary Font:** "Mukta" (Sans-serif)
  - Good for Indian language support if needed
  - Weights: Regular (400), Bold (700)

- **Typographic Scale:**
  - Display: 32px/40px
  - H1: 28px/36px
  - H2: 24px/32px
  - H3: 20px/28px
  - Body Large: 18px/28px
  - Body: 16px/24px
  - Body Small: 14px/20px
  - Caption: 12px/16px

### Iconography
- Custom icons representing Indian cooking implements, ingredients, and preparation methods
- Line icon style with 2px stroke width
- Rounded corners to match UI components
- Special iconography for cooking methods and oil types

### Component Design
- **Cards:** Subtle drop shadows, 8px rounded corners
- **Buttons:** 6px rounded corners, haptic feedback on mobile
- **Sliders:** 
  - Custom design with recognizable Indian motifs for handles
  - Discrete stops for serving size and dairy content
  - Continuous for oil amount
- **Selectors:** Visual representations of oil types and cooking methods
- **Star Rating:** Dynamic, interactive visualization for healthiness rating

### Accessibility Considerations
- Minimum contrast ratio of 4.5:1 for text
- Alternative text for all images and icons
- Keyboard navigation support
- Screen reader compatibility
- Color-blind friendly indicators for healthiness ratings

## Component Layout

### 1. Search & Navigation
- Top bar with search functionality
- Filter options expand below search
- Navigation tabs at bottom of screen (mobile) or sidebar (desktop)

### 2. Dish Cards
- Grid layout on home/search results
- Image thumbnail (16:9 ratio)
- Dish name
- Quick nutrition summary (calories, primary macros)
- Region/origin indicator
- Preparation time
- Healthiness rating preview (1-5 stars)

### 3. Dish Detail View
- Hero image (option to see multiple images)
- Dish name and description
- Origin information
- Base nutritional information
- Preparation variable controls:
  - Serving size selector (0.5x, 1x, 1.5x, 2x)
  - Oil type selector with visual icons
  - Oil amount slider (little, normal, extra)
  - Cream/dairy content slider (none, little, normal, extra)
  - Cooking method selector with visual representations
  - Dynamic healthiness rating display (1-5 stars)
- Real-time nutritional updates based on preparation adjustments
- Detailed macronutrient breakdown
- Similar dishes recommendation
- "Save this preparation" option

### 4. Nutrition Visualization
- Circular macronutrient breakdown chart
- Bar graphs for comparison to dietary recommendations
- Color-coded indicators for nutritional density
- Before/after comparison when changing preparation methods
- Visual representation of oil absorption based on cooking method

### 5. Preparation Comparison Tool
- Side-by-side comparison of different preparation methods
- Highlight nutritional differences
- Taste and texture impact indicators
- Healthiness rating comparison
- Calorie and macronutrient difference calculations

### 6. User Profile Components
- Saved favorites
- Custom preparation preferences
- Recent searches
- Dietary preferences settings
- Nutrition goals tracking
- Preferred cooking methods

## Technical Requirements

### Platform Support
- Progressive Web App (PWA)
- Native iOS and Android applications
- Responsive web version

### Performance Goals
- Initial load under 2 seconds
- Nutritional recalculations under 500ms
- Offline functionality for basic features

### Data Sources
- Proprietary database of Indian and South Asian recipes
- USDA Food Database integration for base ingredients
- Oil absorption rates by cooking method research
- User-submitted recipes (with verification process)

### Calculation Engine
- Base nutritional values for standard preparation
- Multiplication factors for serving size adjustments
- Oil type nutritional profiles database
- Oil amount absorption calculations based on cooking method
- Dairy content nutritional impact matrix
- Healthiness rating algorithm with weighted factors

### Integration Capabilities
- Export to popular fitness/nutrition tracking apps
- Calendar/meal planning integration
- Social sharing functionality

## Success Metrics
- User engagement (searches per session)
- Retention rate
- Nutritional knowledge improvement (surveys)
- User-submitted content quality and quantity
- Cross-platform usage
- Preparation customization frequency
- Healthier preparation selection rate

## Future Expansion
- Recipe suggestions based on nutritional goals
- AR functionality for portion size estimation
- Integration with Indian grocery delivery services
- Community features for recipe sharing and modification
- Expanded regional cuisine coverage
- AI-powered healthier preparation recommendations
- Integration with health monitoring devices/apps

## Implementation Timeline
- **Phase 1:** Core search and nutritional database (3 months)
- **Phase 2:** Customization features and enhanced visualizations (2 months)
- **Phase 3:** Integration capabilities and community features (3 months)
- **Phase 4:** Advanced preparation comparison tools and AI recommendations (4 months)

