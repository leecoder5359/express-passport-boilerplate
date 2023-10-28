import express from "express";
import * as authController from "../controllers/index.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";

export const indexRouter = express.Router();

indexRouter.get("/", isAuth, authController.renderHome);