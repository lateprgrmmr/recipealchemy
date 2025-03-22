"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const connection_1 = require("./database/connection");
const cuisines_1 = __importDefault(require("./routes/cuisines"));
const ingredients_1 = __importDefault(require("./routes/ingredients"));
const APP_PORT = process.env.APP_PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/cuisines', cuisines_1.default);
app.use('/ingredients', ingredients_1.default);
const startServer = async () => {
    const db = await (0, connection_1.connectDb)();
    app.set('db', db);
    app.listen(APP_PORT, () => {
        console.log(`Server started on http://localhost:${APP_PORT}`);
    });
};
startServer().catch(error => console.error(error));
