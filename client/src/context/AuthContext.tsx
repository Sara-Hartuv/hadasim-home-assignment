import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserRole } from "../types/auth";

interface AuthContextType {
    token: string | null;
    role: UserRole | null;
    login: (token: string, role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
     children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });
    const [role, setRole] = useState<UserRole | null>(() => {
        return localStorage.getItem("role") as UserRole | null;
    });

    const login = (token: string, role: UserRole) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        setToken(token);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setToken(null);
        setRole(null);
    };
    return(
        <AuthContext.Provider value={{token, role, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}