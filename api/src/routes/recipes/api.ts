import { OpenAI } from 'openai';
import { Recipe, RecipeResponse, TableData } from '../../shared/types';
import { Connection } from '../../database/connection';
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;

const recipeToTableDataMapper = (recipe: Recipe): TableData => {
    return {
        id: recipe.id,
        recipeName: recipe.name,
        ingredients: recipe.description,
        instructions: recipe.instructions,
    }
};

export async function generateRecipes(db: Connection, cuisine: string[], ingredients: string[]): Promise<RecipeResponse[]> {
    if (!cuisine || !ingredients) {
        return [];
    }

    if (!API_KEY) {
        throw new Error('API_KEY cannot be found');
    }
    // console.log('API_KEY:', API_KEY);
    const openai = new OpenAI({
        apiKey: API_KEY,
    });

    const prompt = `You are an expert chef in ${cuisine.join(', ')} cuisine(s). 
    Create **three unique recipes** using the following ingredients: ${ingredients.join(', ')}. 
    Each recipe should be structured in **valid JSON format** as an array of objects with:
    [
        {
            "name": "Recipe Title",
            "description": "Short description of the dish",
            "ingredients": [
                { "name": "Ingredient Name", "amount": "Quantity (e.g., 1 cup, 200g)" }
            ],
            "instructions": ["Step 1", "Step 2", "Step 3"],
            "prepTime": "10 minutes",
            "cookingTime": "30 minutes",
            "servings": 2,
            "cuisine": "Cuisine Name",
            "difficulty": "Easy | Medium | Hard",
            "dietaryRestrictions": ["Gluten-Free", "Vegan"],
            "imageUrl": "URL if available"
        }
    ]
    Ensure the response is **valid JSON** inside an array.
`;
    // console.log('Prompt:', prompt);
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a chef in an Italian restaurant. Generate a recipe using the the requested ingredients, in the style of the requested cuisine' },
            { role: 'user', content: prompt }],
        max_tokens: 1500,
        temperature: 0.7,
    });
    // console.log('Response:', JSON.stringify(response, null, 2));
    if (!response.choices || response.choices.length === 0) {
        return [];
    }
    if (!response.choices[0].message || !response.choices[0].message.content) {
        return [];
    }
    // Parse the response and return the recipe
    // Assuming the response is in JSON format
    try {
        const recipes = JSON.parse(response.choices[0].message.content.replace(/```json|```/g, "").trim());
        return Array.isArray(recipes) ? recipes : [];
    } catch (ex) {
        console.error("Error parsing response:", ex);
        return []
    }
}

export const getCachedRecipes = async (db: Connection, cuisine: string[], ingredients: string[]): Promise<TableData[]> => {
    const rawRecipes: Recipe[] = await db.recipe.find({ id: 2 });
    console.log('Mapped:', rawRecipes);
    const mapped = rawRecipes.map(recipeToTableDataMapper);
    return mapped;
}

export const generateNewRecipes = async (db: Connection, cuisine: string[], ingredients: string[]): Promise<Recipe[]> => {

    const recipes = await generateRecipes(db, cuisine, ingredients);
    // console.log('Recipes:', recipes);
    const newRecipes = recipes.map(recipe => ({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prepTime: recipe.prep_time,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        cuisine: cuisine.map(c => ({ id: Math.floor(Math.random()), name: c, tags: [] })),
        // cuisine_id: recipe.cuisine,
        difficulty: recipe.difficulty.toLowerCase(),
        dietaryRestrictions: recipe.dietary_restrictions,
        imageUrl: recipe.image_url,
        is_ai_generated: true,
        ai_model: 'gpt-3.5-turbo',
        created_at: new Date(),
        updated_at: new Date(),
    }));
    await Promise.all(newRecipes.map(recipe => db.recipe.insert(recipe)));
    return newRecipes;

};