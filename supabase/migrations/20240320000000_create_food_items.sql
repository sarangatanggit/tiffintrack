-- Create food_items table
CREATE TABLE IF NOT EXISTS food_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    food_name TEXT NOT NULL,
    common_names TEXT,
    serving_type TEXT NOT NULL,
    calories_calculated_for INTEGER NOT NULL,
    basic_unit_measure INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    protein DECIMAL(5,2) NOT NULL,
    carbs DECIMAL(5,2) NOT NULL,
    fats DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster search
CREATE INDEX idx_food_items_name ON food_items USING GIN (to_tsvector('english', food_name));

-- Insert demo data
INSERT INTO food_items (
    food_name,
    common_names,
    serving_type,
    calories_calculated_for,
    basic_unit_measure,
    calories,
    protein,
    carbs,
    fats
) VALUES
    (
        'Butter Chicken',
        'Murgh Makhani',
        'serving',
        100,
        100,
        350,
        28,
        12,
        22
    ),
    (
        'Palak Paneer',
        'Spinach and Cottage Cheese',
        'serving',
        100,
        100,
        280,
        14,
        8,
        22
    ),
    (
        'Biryani',
        'Indian Spiced Rice',
        'serving',
        100,
        100,
        320,
        12,
        45,
        12
    ),
    (
        'Tandoori Naan',
        'Indian Flatbread',
        'piece',
        1,
        1,
        260,
        8,
        45,
        4
    ),
    (
        'Dal Makhani',
        'Creamy Black Lentils',
        'serving',
        100,
        100,
        290,
        12,
        35,
        14
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_food_items_updated_at
    BEFORE UPDATE ON food_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 