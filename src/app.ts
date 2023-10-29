import express from "express";
import { Application } from "express";
import cookieSession from "cookie-session";
import * as path from "path";
import { regenerate } from "./middleware/session/regenerate.middleware";
import { indexRouter } from "./routes/index.router";
import { authRouter } from "./routes/auth.router";
import { mongoDbConnection } from "./database/mongo";
import { setUpPassport } from "./config/passport.config";
import passport from "passport";

export default class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.connectToDatabase();
        this.setMiddleware();
        this.setRoutes();
        this.setUpViewEngine();
    }

    private connectToDatabase() {
        mongoDbConnection();
    }

    private setMiddleware() {
        //default
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use("/static", express.static(path.join(path.resolve(), "public")));

        //session
        this.app.use(cookieSession({
            name: "cookie-session-name",
            keys: ["key"],
        }));

        //passport
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        setUpPassport();

        this.app.use(regenerate);
    }

    private setUpViewEngine() {
        //view engin setup
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(path.resolve(), "src", "views"));
    }

    private setRoutes() {
        this.app.use(indexRouter);
        this.app.use("/auth", authRouter);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}