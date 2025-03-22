"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const db = req.app.get('db');
    const cuisines = await db.cuisine.find();
    return res.json(cuisines);
});
exports.default = router;
