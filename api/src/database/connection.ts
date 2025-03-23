import massive, { ConnectionInfo } from "massive";
import dotenv from "dotenv";
dotenv.config(); //Reads .env file and makes it accessible via process.env
// psql -h localhost -p 3452 -d recipe_db -U postgres -W password

// const dbConnectionString = "postgres://postgres:password@localhost:5434/recipe_db";
const dbConnectionInfo: ConnectionInfo = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3452"),
};
// console.log('dbConnectionInfo', dbConnectionInfo);

export type Connection = massive.Database;

export const connectDb = async () => {
  try {
    const db = await massive(dbConnectionInfo);
    console.log("Connected to database");
    return db;
  } catch (error) {
    console.error('failed to connect', error);
    throw error;
  }
};
