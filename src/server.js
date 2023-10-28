import express from "express";
import mongoose from "mongoose";
import * as path from "path";
import { User } from "./models/users.model.js";
import passport from "passport";
import "./config/passport.js";
import cookieSession from "cookie-session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'cookie-session-name',
    keys: ["key"],
}));
app.use(function(request, response, next) {
    if (!request.session?.regenerate) {
        request.session.regenerate = (cb) => {
            cb();
        };
    }

    if (!request.session?.save) {
        request.session.save = (cb) => {
            cb();
        };
    }
    next();
});


app.use("/static", express.static(path.join(path.resolve(), "public")));

app.use(passport.initialize());
app.use(passport.session());

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});

mongoose.connect("mongodb://localhost:27017/passport")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("err"));

//view engin setup
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) return res.json({ msg: info });

        req.login(user, function(err) {
            if (err) return next(err);

            res.redirect("/");
        });
    })(req, res, next);
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        console.error(e);
    }

});