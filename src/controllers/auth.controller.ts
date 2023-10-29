import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User, IUser } from '../models/users.model';

export const renderSignUp = (req: Request, res: Response) => {
    res.render('signup');
};

export const renderLogin = (req: Request, res: Response) => {
    res.render('login');
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await new Promise((resolve, reject) => {
            passport.authenticate('local', (err: Error, user: unknown, info: any) => {
                if (err) reject(err);
                if (!user) resolve(null);
                else resolve(user);
            })(req, res, next);
        });

        if (user === null) {
            return res.json({ msg: 'Authentication failed' });
        }

        req.login(user, function(err) {
            if (err) return next(err);

            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
};

export const signUp = async (req: Request, res: Response) => {
    const user = new User(req.body);

    try {
        await user.save();
        return res.status(200).json({
            success: true,
        });
    } catch (e) {
        console.error(e);
    }
};
