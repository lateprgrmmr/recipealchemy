"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = require("./database/connection");
const APP_PORT = process.env.APP_PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// app.get('/', (req, res) => {
//     const db = req.app.get('db');
//     const data = db.cuisine.find({});
//     res.json(data);
// });
app.get('/', async (req, res) => {
    try {
        const db = req.app.get('db'); // Retrieve the db instance
        const data = await db.cuisine.find({}); // Await the database query
        res.json(data); // Send the query results as JSON
    }
    catch (error) {
        console.error("Error fetching data from cuisine table:", error);
        res.status(500).send("Internal Server Error");
    }
});
const startServer = async () => {
    const db = await (0, connection_1.connectDb)();
    app.set('db', db);
    app.listen(APP_PORT, () => {
        console.log(`Server started on http://localhost:${APP_PORT}`);
    });
};
startServer().catch(error => console.error(error));
