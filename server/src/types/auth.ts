export type UserRole = "manager" | "teacher";

export interface AuthUser{
    role: UserRole;
    idNumber?: string;
    className?: string;
}