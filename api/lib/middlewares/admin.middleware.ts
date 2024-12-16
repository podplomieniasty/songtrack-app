import { config } from "../config";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IUser } from "../models/user.model";

export const admin = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token && typeof token === 'string') {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        try {
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                const user: IUser = decoded as IUser;
                if(!user.isAdmin) return res.status(403).send('Access denied');
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