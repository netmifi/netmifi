import { queryState } from '@/constants/queryState';
import User from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { cookieOptions } from '@/constants/cookieOptions';

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    const token = cookies?.jwt;

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
    // try {
    if (!token) {
        res.status(401).json({
            message: "unauthorized access",
            state: queryState.blocked,
            data: undefined
        });
        return;
    }

    jwt.verify(
        token,
        accessTokenSecret,
        async (err, decoded:any) => {
            try {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        message: "unauthorized access",
                        state: queryState.blocked,
                        data: undefined
                    });
                    return;
                }
                const user = await User.findOne({ email: decoded?.user?.email });
                console.log(decoded);

                // if (!user) {
                //     console.log("not found")
                //     res.status(404).json({
                //         message: 'auth token not found',
                //         state: queryState.error,
                //         data: undefined
                //     });
                //     return;
                // }

                if (!cookies.user) {
                    res.cookie('user', JSON.stringify(user), {
                        ...cookieOptions,
                        maxAge: 60 * 60 * 1000 * 24 * 5
                    });
                }
                next();
            } catch (error: any) {
                console.log(err);
                res.status(401).json({
                    message: error.message,
                    state: queryState.error,
                    data: undefined
                });
                return;
            }
        }
    );
}