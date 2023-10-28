import express from "express";
import * as authController from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.get('/login', authController.renderLogin);
authRouter.post('/login', authController.login);

authRouter.get('/signup', authController.renderSignUp);
authRouter.post('/signup', authController.signUp);
