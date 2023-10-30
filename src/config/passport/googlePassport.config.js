import { Strategy } from "passport-google-oauth20";
import { User } from "../../models/users.model.js";
import passport from "passport";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_PASSWORD } from "../env.config.js";

const googleStrategy = new Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_PASSWORD,
    callbackURL: "/auth/google/callback",
    scope: ["email", "profile"],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            const newUser = new User();
            newUser.email = profile.emails[0].value;
            newUser.googleId = profile.id;

            user = await newUser.save();
        }

        done(null, user);
    } catch (e) {
        done(e);
    }
});

passport.use("google", googleStrategy);