
export enum IngredientType {
    MEAT = 'meat',
    VEGETABLE = 'vegetable',
    FRUIT = 'fruit',
    DAIRY = 'dairy',
    GRAIN = 'grain',
    SPICE = 'spice',
    SAUCE = 'sauce',
    OTHER = 'other',
}

export interface Ingredient {
    id: number;
    name: string;
    type: IngredientType;
    otherType?: string;
}

export interface Cuisine {
    id: number;
    name: string;
}