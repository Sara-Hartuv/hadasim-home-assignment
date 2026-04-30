import { Request, Response } from "express";
import * as locationService from "../services/locationService";

export const saveLocation = async (req: Request, res: Response) => {
    try {
        const location = await locationService.saveLocation(req.body);
        return res.status(201).json(location);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};

export const getLocations = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const locations = await locationService.getLocationsByUser(req.user);
        return res.status(200).json(locations);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getStudentsFarFromTeacher = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const teacherIdNumber = req.params.teacherIdNumber as string;
        const students = await locationService.getStudentsFarFromTeacher(teacherIdNumber, req.user);
        return res.status(200).json(students);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
};