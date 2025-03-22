import { getFromApi } from ".";
import { Ingredient } from "../shared/types";


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