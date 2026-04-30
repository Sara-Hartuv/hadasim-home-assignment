import * as studentRepository from "../repositories/studentRepository";
import { IStudent } from "../models/student";

export const createStudent = async(data:Partial<IStudent>) => {
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

export const getStudentByName = async (name: string) => {
    const student = await studentRepository.getStudentByName(name);

    if (!student){
        throw new Error ("Student not found");
    }

    return student;
};

export const getStudentByNameAndClass = async (name: string, className: string) => {
    const student = studentRepository.getStudentByNameAndClass(name, className);
    if (!student){
        throw new Error("Student not found");
    }
    return student;
};

export const getAllStudents = async () => {
    const students =  studentRepository.getAllStudents();
    if (!students){
        throw new Error("Students not found");
    }
        return students;
};