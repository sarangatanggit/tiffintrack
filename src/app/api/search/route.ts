import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface FoodItem {
  id: string;
  food_name: string;
  common_names: string | null;
  serving_type: string;
  calories_calculated_for: number;
  basic_unit_measure: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get('value');

  if (!value) {
    return NextResponse.json({ error: 'Search value is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .or(`food_name.ilike.%${value}%,common_names.ilike.%${value}%`)
      .limit(10);

    if (error) {
      throw error;
    }

    // Transform the data to match the expected format
    const items = (data as FoodItem[]).map(item => ({
      food_name: item.food_name,
      common_names: item.common_names,
      food_unique_id: item.id,
      food_id: item.id,
      serving_type: item.serving_type,
      calories_calculated_for: item.calories_calculated_for,
      basic_unit_measure: item.basic_unit_measure,
      nutrients: {
        fats: item.fats,
        carbs: item.carbs,
        protein: item.protein,
        calories: item.calories
      }
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search results' },
      { status: 500 }
    );
  }
} 