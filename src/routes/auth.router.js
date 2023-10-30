import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { isNotAuth } from "../middleware/auth.middleware.js";

export const authRouter = express.Router();

authRouter.get("/google", authController.authGoogle);
authRouter.get("/google/callback", authController.authGoogleCallback);

authRouter.get("/kakao", authController.authKakao);
authRouter.get("/kakao/callback", authController.authKakaoCallback);
