import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(401).json({message: "Missing authorization header"});
    }
    const token = authHeader.split(" ")[1];
    if (!token){
        return res.status(401).json({message:"Missing token"});
    }
    try{
        const secret = process.env.JWT_SECRET;
        if(!secret){
            return res.status(500).json({message: "JWT_SECRET is not defined"});

        }
        const decoded = jwt.verify(token, secret) as AuthUser;
        req.user = decoded;
        next();
    } catch{
        return res.status(401).json({message:"Invalid or expired token"});
    }
};