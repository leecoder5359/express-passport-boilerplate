import express from "express";
import * as indexController from "../controllers/index.controller.js";
import { isAuth, isNotAuth } from "../middleware/auth.middleware.js";

export const indexRouter = express.Router();

indexRouter.get("/", isAuth, indexController.renderHome);

indexRouter.get("/login", isNotAuth, indexController.renderLogin);
indexRouter.post("/login", indexController.login);

indexRouter.post("/logout", indexController.logout);

indexRouter.get("/signup", isNotAuth, indexController.renderSignUp);
indexRouter.post("/signup", indexController.signUp);
