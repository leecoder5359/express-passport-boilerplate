export const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/auth/login");
};

export const isNotAuth = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect("/");

    next();
};