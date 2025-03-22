
// import { getOrGenerateRecipe } from '../src/recipeGeneration';
const getOrGenerateRecipe = require('../dist/recipeGeneration');

const testRecipeGeneration = async () => {
    const cuisines = ['Italian', 'Mexican', 'Indian', 'Chinese'];
    const ingredients = ['chicken', 'rice', 'beans', 'vegetables'];

    console.log('Testing Recipe Generation...');

    try {
        const recipes = await getOrGenerateRecipe(cuisines, ingredients);
        console.log('Generated Recipes:', JSON.stringify(recipes, null, 2));
    } catch (ex) {
        console.error('Error generating recipes:', ex);
    }
}

testRecipeGeneration();