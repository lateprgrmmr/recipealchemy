
export enum IngredientType {
    MEAT = 'meat',
    VEGETABLE = 'vegetable',
    FRUIT = 'fruit',
    DAIRY = 'dairy',
    GRAIN = 'grain',
    SPICE = 'spice',
    HERB = 'herb',
    SAUCE = 'sauce',
    OTHER = 'other',
}

export interface Ingredient {
    id: number;
    name: string;
    type: IngredientType;
    otherType?: string;
    created_at: Date;
    updated_at: Date;
}

export interface Cuisine {
    id: number;
    name: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions: string;
    prepTime: number
    cookingTime: number;
    servings: number;
    cuisine: Cuisine[];
    difficulty?: number;
    dietaryRestrictions?: string[];
    imageUrl?: string;
    created_at: Date;
    updated_at: Date;
}

export interface RecipeIngredient {
    recipe_id: number;
    ingredient_id: number;
    quantity: number;
    unit?: string;
    notes?: string;
    created_at: Date;
}