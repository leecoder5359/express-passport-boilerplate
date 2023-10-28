import express from "express";
import * as authController from "../controllers/index.controller.js";

export const indexRouter = express.Router();

indexRouter.get('/', authController.renderHome)