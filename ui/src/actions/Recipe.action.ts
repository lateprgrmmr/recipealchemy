import { getFromApi } from ".";
import { Recipe } from "../shared/types";

export const fetchRecipes = async () => { 
    try {
        console.log('Fetching recipes...');
        const recipes = await getFromApi<Recipe[]>('http://localhost:5001/recipes');
        if (!recipes) {
            console.log('No recipes found');
            throw new Error('Network response was not ok');
        }
        return recipes;
    } catch (error) {
        return [];
    }
};