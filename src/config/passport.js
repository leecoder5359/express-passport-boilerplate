import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/users.model.js";

passport.use('local', new Strategy({
        usernameField: "email", passwordField: "password",
    }, (email, password, done) => {
        User.findOne({
            email: email.toLocaleLowerCase(),
        }, (err, user) => {
            if (err) return done(err);

            if (!user) {
                return done(null, false, { msg: `Email ${email} not found` });
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) return done(err);

                if (isMatch) return done(null, user);

                return done(null, false, { msg: "Invalid email or password" });
            });
        });
    },
));