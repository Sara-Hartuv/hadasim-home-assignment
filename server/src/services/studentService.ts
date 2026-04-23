import * as studentRepository from "../repositories/studentRepository";
import { IStudent } from "../models/student";

export const createStudent = async(data:Partial<IStudent>) => {
    // Here in the future, business logic is possible
    const existingStudent = await studentRepository.getStudentByIdNumber(data.idNumber!);

    if (existingStudent) {
        throw new Error("Student with this ID number already exists")
    }
    return await studentRepository.createStudent(data);
};

export const getStudentByIdNumber = async (idNumber: string) => {
    const student = await studentRepository.getStudentByIdNumber(idNumber);

    if (!student){
        throw new Error("Student not found");
    }
    return student;
};

export const getStusentByName = async (name: string) => {
    const student = await studentRepository.getStudentByName(name);

    if (!student){
        throw new Error ("Student not found");
    }

    return student;
};