export type UserRole = "manager | teacher";

export interface LoginResponse {
    token: string;
    role: UserRole;
}