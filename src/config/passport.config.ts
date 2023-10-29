import passport from "passport";
import { Strategy } from "passport-local";
import { IUser, User } from "../models/users.model";
import { ObjectId } from "mongoose";

const localStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email.toLowerCase() });

            if (!user) {
                return done(null, false, { message: `Email ${email} not found` });
            }

            const isMatch = user.comparePassword(password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Invalid email or password" });
            }
        } catch (err) {
            return done(err);
        }
    },
);

const serializeUser = (user: IUser, done: Function): void => {
    done(null, user._id);
};

const deserializeUser = async (id: ObjectId, done: Function): Promise<void> => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
};

export const setUpPassport = () => {
    passport.use("local", localStrategy);
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
}
