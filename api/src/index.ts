import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDb } from './database/connection';

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
    } catch (error) {
        console.error("Error fetching data from cuisine table:", error);
        res.status(500).send("Internal Server Error");
    }
});

const startServer = async () => {
    const db = await connectDb();
    app.set('db', db);
    app.listen(APP_PORT, () => {
        console.log(`Server started on http://localhost:${APP_PORT}`);
    });
};

startServer().catch(error => console.error(error));