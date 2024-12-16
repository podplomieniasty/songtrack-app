import { config } from "../config";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IUser } from "../models/user.model";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-auth-token'] || req.headers['authorization'];
    if(token && typeof token === 'string') {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        try {
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                const user: IUser = decoded as IUser;
                next();
            });
            next();
        } catch (err) {
            return res.status(400).send('Invalid token');
        }
    } else {
        return res.status(401).send('Access denied. No token provided');
    }
}