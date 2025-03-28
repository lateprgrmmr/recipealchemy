import { getFromApi } from ".";
import { Ingredient, IngredientType } from "../shared/types";


export const fetchIngredients = async () => {
    try {
        console.log('Fetching ingredients...');
        const ingredients = await getFromApi<Ingredient[]>('http://localhost:5001/ingredients');
        if (!ingredients) {
            throw new Error('Network response was not ok');
        }
        return ingredients;
    } catch (error) {
        return [];
    }
};

export const fetchIngredientTypes = async () => {
    try {
        console.log('Fetching ingredient types...');
        const ingredientTypes = await getFromApi<IngredientType[]>('http://localhost:5001/ingredients/types');
        if (!ingredientTypes) {
            throw new Error('Network response was not ok');
        }
        console.log('Fetched ingredient types:', ingredientTypes);
        return ingredientTypes;
    } catch (error) {
        return [];
    }
}