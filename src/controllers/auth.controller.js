import passport from "passport";

export const authGoogle = (req, res, next) => {
    oAuth(req, res, next, "google");
};

export const authGoogleCallback = (req, res, next) => {
    oAuthCallback(req, res, next, "google");
};

export const authKakao = (req, res, next) => {
    oAuth(req, res, next, "kakao");
};

export const authKakaoCallback = (req, res, next) => {
    oAuthCallback(req, res, next, "kakao");
};

const oAuth = (req, res, next, strategy) => {
    passport.authenticate(strategy)(req, res, next);
}

const oAuthCallback = (req, res, next, strategy) => {
    passport.authenticate(strategy, {
        successReturnToOrRedirect: "/",
        failureRedirect: "/login",
    })(req, res, next);
}