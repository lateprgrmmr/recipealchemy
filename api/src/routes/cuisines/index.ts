import express, { Request, Response } from "express";
import { Cuisine } from "../../shared/types";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const db = req.app.get('db');
    const cuisines: Cuisine[] = await db.cuisine.find();
    if (cuisines.length === 0) {
        return res.status(404).json({ error: "No cuisines found" });
    }
    return res.json(cuisines);
});

export default router;