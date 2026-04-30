import api from "./axios";
import type { LoginResponse } from "../types/auth";

export const managerLogin = async ( username: string, password: string): Promise<LoginResponse> =>{
    const response = await api.post<LoginResponse>("/auth/manager-login", {username, password,});
    return response.data;
}

export const teacherLogin = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/teacher-login", {username, password,});
    return response.data
}