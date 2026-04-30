import api from "./axios";
import type { Student } from "../types/student";

export const getStudentById = async (idNumber: string): Promise<Student> => {
    const response = await api.get<Student>(`/students/by-id/${idNumber}`);
    return response.data;
}

export const searchStudentByName = async (name: string): Promise<Student[]> => {
    const response = await api.get<Student[]>("/students/by-name", {params:{name},});
    return response.data;
};

export const createStudent = async (student: Omit<Student, "_id">): Promise<Student> => {
    const response = await api.post<Student>("/students", student);
    return response.data;
};

export const getAllStudents = async (): Promise<Student[]> => {
    const response = await api.get<Student[]>("/students");
    return response.data;
};