
export interface TagType {
    id: number;
    name: string;
}

export interface ItemType {
    id: number;
    name: string;
    tags: TagType[];
}

export interface IngredientTag extends TagType {}

export interface CuisineTag extends TagType{}

export interface Cuisine extends ItemType {}

export interface TableData {
    id: number;
    recipeName: string;
    ingredients: string;
    instructions: string;
}

export interface IngredientType {
    id: number;
    name: string;
}

export interface Ingredient {
    id: number;
    name: string;
    ingredient_type_id: number;
    ingredient_type: string; 
    quantity: number;
    unit: string;
    otherType?: string;
}

export interface Cuisine {
    // id: number;
    name: string;
}

export interface Recipe {
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions: string;
    prepTime: number
    cookingTime: number;
    servings: number;
    cuisine: Cuisine[];
    difficulty?: string;
    dietaryRestrictions?: string[];
    imageUrl?: string;
    is_ai_generated: boolean;
    ai_model: string;
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

export interface RecipeIngredientUx {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    notes: string;
}

export interface RecipeResponse { 
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    instructions: string;
    prep_time: number;
    cooking_time: number;
    servings: number;
    cuisine: Cuisine[];
    difficulty: string;
    dietary_restrictions: string[];
    image_url: string;
}