
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

export interface Ingredient extends ItemType {}

export interface CuisineTag extends TagType{}

export interface Cuisine extends ItemType {}

export interface TableData {
    id: number;
    recipeName: string;
    ingredients: string;
    instructions: string;
}