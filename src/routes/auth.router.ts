import { Router } from "express";
import { isNotAuth } from "../middleware/auth.middleware";
import * as authController from "../controllers/auth.controller"
export const authRouter: Router = Router();

authRouter.get("/login", isNotAuth, authController.renderLogin);
authRouter.post("/login", authController.login);

authRouter.get("/signup", isNotAuth, authController.renderSignUp);
authRouter.post("/signup", authController.signUp);
