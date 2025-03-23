import express, { Request, Response } from "express";
import { Ingredient } from "../../shared/types";
import { getIngredients, getIngredientTypes } from "./api";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const db = req.app.get('db');
    const ingredients: Ingredient[] = await getIngredients(db);
    if (ingredients.length === 0) {
        return [];
    }
    return res.json(ingredients);
});

router.get('/types', async (req: Request, res: Response) => {
    const db = req.app.get('db');
    const ingredientTypes = await getIngredientTypes(db);
    if (ingredientTypes.length === 0) {
        return [];
    }
    return res.json(ingredientTypes);
});

router.post('/', async (req: Request, res: Response) => {
    const db = req.app.get('db');
    const { name, type, otherType } = req.body;
    const newIngredient: Ingredient = await db.ingredient.insert({ name, type, otherType });
    return res.json(newIngredient);
});

router.get('/:id', async (req: Request, res: Response) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const ingredient: Ingredient = await db.ingredient.findOne({ id });
    if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
    }
    return res.json(ingredient);
});

export default router;