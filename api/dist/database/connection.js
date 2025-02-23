"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const massive_1 = __importDefault(require("massive"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
// psql -h localhost -p 3452 -d recipe_db -U postgres -W password
// const dbConnectionString = "postgres://postgres:password@localhost:5434/recipe_db";
const dbConnectionInfo = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3452"),
};
const connectDb = async () => {
    try {
        const db = await (0, massive_1.default)(dbConnectionInfo);
        console.log("Connected to database");
        return db;
    }
    catch (error) {
        console.error('failed to connect', error);
        throw error;
    }
};
exports.connectDb = connectDb;
