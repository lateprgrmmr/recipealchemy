import { OpenAI } from 'openai';
import { Recipe } from './shared/types';
import { connectDb } from './database/connection';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
    throw new Error('API_KEY cannot be found - - ');
}
// console.log('API_KEY:', API_KEY);
const openai = new OpenAI({
    apiKey: API_KEY,
});

export async function generateRecipes(cuisine: string[], ingredients: string[]): Promise<Recipe[]> {
    if (!cuisine || !ingredients) {
        return [];
    }

    const prompt = `
        You are an expert chef in ${cuisine.join(', ')} cuisine(s). 
        Generate a recipe using the following ingredients: ${ingredients.join(', ')}. 
        Provide the recipes as **valid JSON format** as an array of objects with the following sections: 
            - Title
            - Ingredients (list)
                - Notes (if any)
                - Amounts
            - Instructions (list)
            - Prep Time
            - Cooking Time
            - Servings
            - Difficulty
            - Cuisine
            - Dietary Restrictions (if any)
            - Image URL (if available)`;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        // max_tokens: 1500,
        temperature: 0.7,
    });
    if (!response.choices || response.choices.length === 0) {
        return [];
    }
    if (!response.choices[0].message || !response.choices[0].message.content) {
        return [];
    }
    // Parse the response and return the recipe
    // Assuming the response is in JSON format
    try {
        const recipes = JSON.parse(response.choices[0].message.content);
        return Array.isArray(recipes) ? recipes : [];
    } catch (ex) {
        console.error("Error parsing response:", ex);
        return []
    }
}

export const getOrGenerateRecipe = async (cuisine: string[], ingredients: string[]): Promise<Recipe[]> => {
    const db = await connectDb();

    let recipes: Recipe[] = [];

    const cachedRecipes: Recipe[] = await db.recipe.findOne({
        id: 222
    });
    // const cachedRecipes: Recipe[] = await db.recipe.findOne({
    // where: {
    //     cuisine: { in: cuisine },
    //     ingredients: { in: ingredients },
    // },
    // });

    if (cachedRecipes && cachedRecipes.length > 0) {
        recipes.concat(cachedRecipes);
    }
    console.log('Found no cached recipes:', cachedRecipes);

    const generatedRecipes = await generateRecipes(cuisine, ingredients);

    if (generatedRecipes && generatedRecipes.length > 0) {
        recipes.concat(generatedRecipes);
    }

    const newRecipes = generatedRecipes.map(recipe => ({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        cuisine_id: recipe.cuisine,
        difficulty: recipe.difficulty,
        dietaryRestrictions: recipe.dietaryRestrictions,
        imageUrl: recipe.imageUrl,
        is_ai_generated: true,
        ai_model: 'gpt-4-turbo',
    }));

    await Promise.all(newRecipes.map(recipe => db.recipe.insert(recipe)));

    return recipes;
}