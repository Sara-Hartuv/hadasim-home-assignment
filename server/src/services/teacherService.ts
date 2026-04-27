import * as teacherRepository from "../repositories/teacherRepository";
import * as studentRepository from "../repositories/studentRepository";
import { ITeacher } from "../models/teacher";

export const createTeacher = async (data: Partial<ITeacher>) => {
    const existingTeacher = await teacherRepository.getTeacherByIdNumber(data.idNumber!);

    if (existingTeacher) {
        throw new Error("Teacher with this ID number already exists");
    }

    return await teacherRepository.createTeacher(data);
};

export const getTeacherByIdNumber = async (idNumber: string) => {
    const teacher = await teacherRepository.getTeacherByIdNumber(idNumber);

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    return teacher;
};

export const getTeacherByName = async (name: string) => {
    const teacher = await teacherRepository.getTeacherByName(name.trim());

    if (!teacher) {
        throw new Error("Teacher not found");
    }

    return teacher;
};

export const getStudentsByTeacherId = async (idNumber: string) => {
    const teacher = await teacherRepository.getTeacherByIdNumber(idNumber);

    if(!teacher) {
        throw new Error("Teacher not found");
    }

    const claaaName = teacher.className;
    const students = await studentRepository.getStudentsByClassName(claaaName);
    return students;
};

