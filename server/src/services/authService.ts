import jwt from "jsonwebtoken";
import {AuthUser} from "../types/auth";
import * as teacherRepository from "../repositories/teacherRepository";

const createToken = (payload: AuthUser): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret){
        throw new Error("JWT_SECRET is not defined");

    }
    return jwt.sign(payload, secret, {expiresIn: "1d"});
};

export const loginManager = (username: string, password: string) => {
    if( username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD ){
        throw new Error ("Invalid userName or password");
    }
    const user: AuthUser = {
        role: "manager",
    };

    const token = createToken(user);
    return {token, role: user.role};
};

export const loginTeacher = async (username: string, password: string) =>{
    const teacher = await teacherRepository.getTeacherByIdNumber(password);
    if (!teacher || teacher.name != username){
        throw new Error("Invalid teacher credentials");
    }

    const user: AuthUser ={
        role: "teacher",
        idNumber: teacher.idNumber,
        className: teacher.className,
    }

    const token = createToken(user);
    return {token, role: user.role, idNumber: user.idNumber, className : user.className,};

};