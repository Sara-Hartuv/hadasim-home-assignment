import { Request, Response, NextFunction } from "express";

export const validateCreateStudent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, idNumber, className} = req.body;

    if (!name || !idNumber || !className) {
        return res.status(400).json({
            message: "name, idNumber and className are required",
        });
    }

    if (typeof name !== "string" || typeof idNumber !== "string" || typeof className !== "string"){
        return res.status(400).json({
            message: "name, idNumber and className must be strings",
        });
    }

    const trimmedName = name.trim();
    const trimmedClassName = className.trim();
    const trimmedIdNumber = idNumber.trim();

    if (trimmedName.length < 4){
        return res.status(400).json({
            message: "Name must be at least 4 characters long",
        });
    }

    if (trimmedName.split(" ").length < 2){
        return res.status(400).json({
            message: "Name must include first and last name"
        });
    }

    if (trimmedClassName.length === 0){
        return res.status(400).json({
            message: "className cannot be empty",
        });
    }

    if (trimmedIdNumber.length !== 9){
        return res.status(400).json({
            message: "idNumber must be exactly 9 digits",
        });
    }

    if (!/^\d{9}$/.test(trimmedIdNumber)){
        return res.status(400).json({
             message: "idNumber must contain digits only",
        });
    }

    req.body.name = trimmedName;
    req.body.className = trimmedClassName;
    req.body.idNumber = trimmedIdNumber;

    next();
};