import { Router } from "express";
import { getCachedRecipes } from "./api";

const router = Router();

router.get("/", async (req, res) => {
    // const { cuisine, ingredients } = req.body;
    const db = req.app.get('db');
    // console.log('HERE???')
    // if (!cuisine || !ingredients) {
    //     return res.status(400).json({ error: "Cuisine and ingredients are required" });
    // }
    const cuisine = ['Italian'];
    const ingredients = ['tomato', 'cheese', 'pasta'];

    try {
        const recipes = await getCachedRecipes(db, cuisine, ingredients);
        console.error("generating recipes:", recipes);
        return res.json(recipes);
    } catch (error) {
        console.error("Error generating recipes:", error);
        return res.status(500).json({ error: "Error generating recipes - error" });
    }
});

export default router;