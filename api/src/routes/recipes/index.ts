import { Router } from "express";
import { generateRecipes } from "../../recipeGeneration";

const router = Router();

router.post("/recipes", async (req, res) => {
    const { cuisine, ingredients } = req.body;

    if (!cuisine || !ingredients) {
        return res.status(400).json({ error: "Cuisine and ingredients are required" });
    }

    try {
        const recipes = await generateRecipes(cuisine, ingredients);
        return res.json(recipes);
    } catch (error) {
        console.error("Error generating recipes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});