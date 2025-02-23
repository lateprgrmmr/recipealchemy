import { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// https://spoonacular.com/food-api

import ingredientsRouter from "./ingredients/index";
import cuisinesRouter from "./cuisines/index"; // Add the missing import statement for cuisinesRouter


