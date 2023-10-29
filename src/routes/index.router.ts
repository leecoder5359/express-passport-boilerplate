import { Router } from "express";
import * as authController from "../controllers/index.controller";
import { isAuth } from "../middleware/auth.middleware";

export const indexRouter: Router = Router();

indexRouter.get("/", isAuth, authController.renderHome);