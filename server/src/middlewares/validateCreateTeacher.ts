import { Request, Response, NextFunction } from "express";

export const validateCreateTeacher = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const { name, idNumber, className } = req.body;

    if (!name || !idNumber || !className) {
        return res.status(400).json({
            message: "name, idNumber and className are required",
        });
    }

    if (
        typeof name !== "string" ||
        typeof idNumber !== "string" ||
        typeof className !== "string"
    ) {
        return res.status(400).json({
            message: "name, idNumber and className must be strings",
        });
    }

    const trimmedName = name.trim();
    const trimmedIdNumber = idNumber.trim();
    const trimmedClassName = className.trim();

    if (trimmedName.length < 4) {
        return res.status(400).json({
            message: "name must be at least 4 characters long",
        });
    }

    if (!trimmedName.includes(" ")) {
        return res.status(400).json({
            message: "name must include first name and last name",
        });
    }

    if (trimmedIdNumber.length !== 9 || !/^\d{9}$/.test(trimmedIdNumber)) {
        return res.status(400).json({
            message: "idNumber must be exactly 9 digits",
        });
    }

    if (trimmedClassName.length === 0) {
        return res.status(400).json({
            message: "className cannot be empty",
        });
    }

    req.body.name = trimmedName;
    req.body.idNumber = trimmedIdNumber;
    req.body.className = trimmedClassName;

    next();
}