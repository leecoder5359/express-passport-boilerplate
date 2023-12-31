import express from "express";
import * as path from "path";
import { COOKIE_ENCRYPTION_KEY, PORT } from "./config/env.config.js";
import "./config/mongo.config.js";
import "./config/passport/passport.config.js";
import cookieSession from "cookie-session";
import { regenerate } from "./middleware/session/regenerate.middleware.js";
import { authRouter } from "./routes/auth.router.js";
import { indexRouter } from "./routes/index.router.js";
import passport from "passport";
import { ErrorMiddleware } from "./middleware/error.middleware.js";


const app = express();

//default
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static(path.join(path.resolve(), "public")));

//session
app.use(cookieSession({
    name: "cookie-session-name",
    keys: [COOKIE_ENCRYPTION_KEY],
}));

//passport
app.use(passport.session());
app.use(passport.initialize());

app.use(regenerate);


app.use(indexRouter);
app.use("/auth", authRouter);

//view engin setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.use(ErrorMiddleware);

const port = PORT;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});