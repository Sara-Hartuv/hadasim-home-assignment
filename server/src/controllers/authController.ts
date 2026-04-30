import { Request, Response } from "express";
import * as authService from "../services/authService";

export const loginManager = (req: Request, res: Response) =>{
    try{
        const {username, password} = req.body;
        const result = authService.loginManager(username, password);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(401).json({message: error.message})
    }
};

export const loginTeacher = async (req:Request, res: Response) => {
    try{
        const {username, password} = req.body;
        const result = await authService.loginTeacher(username, password);
        return res.status(200).json(result);
    } catch (error: any){
        return res.status(401).json({message: error.message});
    }
};