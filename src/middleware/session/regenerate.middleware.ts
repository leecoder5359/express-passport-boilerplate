import { NextFunction, Request, Response } from "express";

export const regenerate = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session?.regenerate) {
        req.session.regenerate = (cb): void => {
            cb();
        };
    }

    if (!req.session?.save) {
        req.session.save = (cb): void => {
            cb();
        };
    }
    next();
};