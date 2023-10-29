import { Request, Response, NextFunction } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return next();

    res.redirect('/auth/login');
};

export const isNotAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) return res.redirect('/');

    next();
};
