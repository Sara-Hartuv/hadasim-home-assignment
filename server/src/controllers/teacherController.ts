import { Request, Response } from "express";
import * as teacherService from "../services/teacherService";

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const teacher = await teacherService.createTeacher(req.body);
        return res.status(201).json(teacher);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const getTeacherByIdNumber = async (req: Request, res: Response) => {
    try {
        const idNumber = req.params.idNumber as string;
        const teacher = await teacherService.getTeacherByIdNumber(idNumber);
        return res.status(200).json(teacher);
    } catch (error: any) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const getTeacherByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const teacher = await teacherService.getTeacherByName(String(name));
        return res.status(200).json(teacher);
    } catch (error: any) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const getStudentsByTeacherId = async (req: Request, res: Response) => {
    try {
        const { idNumber } = req.params;
        if (typeof idNumber !== "string") {
            return res.status(400).json({ message: "Invalid idNumber" });
        }
        const students = await teacherService.getStudentsByTeacherId(idNumber);
        return res.status(200).json(students);
    } catch (error: any) {
        return res.status(404).json({message: error.message,});
    }
};

export const getAllTeachers = async (req: Request, res: Response) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        return res.status(200).json(teachers);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};