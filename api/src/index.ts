import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDb } from './database/connection';

import cuisinesRouter from './routes/cuisines';
import ingredientsRouter from './routes/ingredients';
import recipesRouter from './routes/recipes';

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/cuisines', cuisinesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);

const startServer = async () => {
    const db = await connectDb();
    app.set('db', db);
    app.listen(APP_PORT, () => {
        console.log(`Server started on http://localhost:${APP_PORT}`);
    });
};

startServer().catch(error => console.error(error));