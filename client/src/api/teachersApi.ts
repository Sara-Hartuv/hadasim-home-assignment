import api from "./axios";
import type { Teacher } from "../types/teacher";
import type { Student } from "../types/student";

export const getTeacherById = async (idNumber: string): Promise<Teacher> => {
    const response = await api.get<Teacher>(`/teachers/by-id/${idNumber}`);
    return response.data;
};

export const searchTeachersByName = async (name: string): Promise<Teacher[]> => {
    const response = await api.get<Teacher[]>("/teachers/by-name", {params: {name},});
    return response.data;
};

export const createTeacher = async (teacher: Omit<Teacher, "_id">): Promise<Teacher> => {
    const response = await api.post<Teacher>("/teachers", teacher);
    return response.data;
};

export const getTeacherStudents = async (idNumber: string): Promise<Student[]> => {
    const response = await api.get<Student[]>(`/teacher/${idNumber}/students`);
    return response.data;
};