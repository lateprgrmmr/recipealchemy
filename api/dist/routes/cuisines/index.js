"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const db = req.app.get('db');
    const cuisines = await db.cuisine.find();
    if (cuisines.length === 0) {
        return res.status(404).json({ error: "No cuisines found" });
    }
    return res.json(cuisines);
});
exports.default = router;
