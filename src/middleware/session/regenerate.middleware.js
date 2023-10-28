export const regenerate = (req, res, next) => {
    if (!req.session?.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        };
    }

    if (!req.session?.save) {
        req.session.save = (cb) => {
            cb();
        };
    }
    next();
};