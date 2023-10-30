import passport from "passport";
import { User } from "../models/users.model.js";
import { sendMail } from "../mail/mail.js";

export const renderHome = (req, res) => {
    res.render("index");
};

export const logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) return next(err);

        res.redirect("/");
    });
};


export const renderSignUp = (req, res) => {
    res.render("signup");
};

export const renderLogin = (req, res) => {
    res.render("login");
};

export const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) return res.json({ msg: info });

        req.login(user, function(err) {
            if (err) return next(err);

            res.redirect("/");
        });
    })(req, res, next);
};

export const signUp = async (req, res) => {
    const user = new User(req.body);

    try {
        const { email, name } =await user.save();
        await sendMail(email, name, 'welcome');
        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        console.error(e);
    }
};
