import { Request, Response } from "express";
import * as studentService from "../services/studentService";

export const createStudent = async (req: Request, res: Response) => {
    try{
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error: any){
        res.status(400).json({ message: error.message,});
    }
};

export const getStudentByIdNumber = async (req: Request, res: Response) => {
    try{
        const idNumber = req.params.idNumber as string;
        const student = await studentService.getStudentByIdNumber(idNumber);

        return res.status(200).json(student);
    } catch (error: any) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const getStudentByName = async (req: Request, res: Response) =>{
    try{
        const { name } = req.query;
        const student = await studentService.getStusentByName(String(name));
        return res.status(200).json(student);
    } catch (error: any){
        return res.status(404).json({
            message: error.message,
        });
    }
};