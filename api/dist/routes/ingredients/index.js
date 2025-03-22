"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const db = req.app.get('db');
    const ingredients = await db.ingredient.find();
    // if (ingredients.length === 0) {
    //     return [];
    // }
    return res.json(ingredients);
});
router.post('/', async (req, res) => {
    const db = req.app.get('db');
    const { name, type, otherType } = req.body;
    const newIngredient = await db.ingredient.insert({ name, type, otherType });
    return res.json(newIngredient);
});
router.get('/:id', async (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const ingredient = await db.ingredient.findOne({ id });
    if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
    }
    return res.json(ingredient);
});
exports.default = router;
