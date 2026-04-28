import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/auth";

export const authorize = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user){
            return res.status(401).json({message: "User is not authenticate"});
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "Access denied"});
        }
        next();
    };


};