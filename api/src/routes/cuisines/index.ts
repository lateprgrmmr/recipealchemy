import  { Router, Request, Response } from "express";
import { Cuisine } from "../../shared/types";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const db = req.app.get('db');
    const cuisines: Cuisine[] = await db.cuisine.find();

    return res.json(cuisines);
});

export default router;