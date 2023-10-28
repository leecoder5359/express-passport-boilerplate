import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { isNotAuth } from "../middleware/auth.middleware.js";

export const authRouter = express.Router();

authRouter.get("/login", isNotAuth, authController.renderLogin);
authRouter.post("/login", authController.login);

authRouter.get("/signup", isNotAuth, authController.renderSignUp);
authRouter.post("/signup", authController.signUp);
