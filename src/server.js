import express from "express";
import * as path from "path";
import "./config/mongo.config.js";
import "./config/passport.config.js";
import cookieSession from "cookie-session";
import { regenerate } from "./middleware/session/regenerate.middleware.js";
import { authRouter } from "./routes/auth.router.js";
import { indexRouter } from "./routes/index.router.js";
import passport from "passport";

const app = express();

//default
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(path.resolve(), "public")));

//session
app.use(cookieSession({
    name: "cookie-session-name",
    keys: ["key"],
}));

//passport
app.use(passport.session());
app.use(passport.initialize());

app.use(regenerate);


app.use(indexRouter);
app.use("/auth", authRouter);

//view engin setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});