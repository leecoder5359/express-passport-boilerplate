import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/users.model.js";

const localStrategy = new Strategy({
    usernameField: "email", passwordField: "password",
}, (email, password, done) => {
    User.findOne({ email: email.toLocaleLowerCase() })
        .then(user => {
            if (!user) {
                return done(null, false, { msg: `Email ${email} not found` });
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err);

                if (isMatch) return done(null, user);

                return done(null, false, { msg: "Invalid email or password" });
            });
        });
});

const serializeUser = (user, done) => {
    done(null, user.id);
};

const deserializeUser = (id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
};

passport.use("local", localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);