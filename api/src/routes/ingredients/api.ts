import { Connection } from "../../database/connection";
import { Ingredient, IngredientType } from "../../shared/types";


export const getIngredients = async (db: Connection, cuisine?: string[], ingredients?: string[]): Promise<Ingredient[]> => {
    return await db.ingredient.find();
}

export const getIngredientTypes = async (db: Connection, id?: string): Promise<IngredientType[]> => { 
    return await db.ingredient_type.find();
};