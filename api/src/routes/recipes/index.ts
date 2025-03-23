import { Router } from "express";
import { getRecipes } from "./api";
import { Recipe } from "../../shared/types";

const router = Router();

// get all recipes
router.get("/", async (req, res) => {
    const db = req.app.get('db');

    try {
        const recipes: Recipe[] = await getRecipes(db);
        console.error("generating recipes:", recipes);
        return res.json(recipes);
    } catch (error) {
        console.error("Error generating recipes:", error);
        return res.status(500).json({ error: "Error generating recipes - error" });
    }
});

export default router;