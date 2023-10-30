import passport from "passport";

export const authGoogle = (req, res, next) => {
    passport.authenticate("google")(req, res, next);
};

export const authGoogleCallback = (req, res, next) => {
    passport.authenticate("google", {
        successReturnToOrRedirect: "/",
            failureRedirect: "/login",
    })(req, res, next);
};