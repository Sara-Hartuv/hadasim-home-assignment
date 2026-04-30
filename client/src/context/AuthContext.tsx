import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { UserRole } from "../types/auth";

interface AuthContextType {
    token: string | null;
    role: UserRole | null;
    idNumber: string | null;
    className: string | null;
    login: (token: string, role: UserRole, idNumber?: string, className?: string) => void;
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
    const [idNumber, setIdNumber] = useState<string | null>(() => {
        return localStorage.getItem("idNumber");
    });

    const [className, setClassName] = useState<string | null> (()=>
        localStorage.getItem("className")
    );

    const login = (token: string, role: UserRole, idNumber?: string, className?: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (idNumber){
            localStorage.setItem("idNumber", idNumber);
            setIdNumber(idNumber);
        } else {
            localStorage.removeItem("idNumber");
            setIdNumber(null);
        }
        if (className){
            localStorage.setItem("className", className);
            setClassName(className);
        } else {
            localStorage.removeItem("className");
            setClassName(null);
        }

        setToken(token);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("idNumber");
        localStorage.removeItem("className");

        setToken(null);
        setRole(null);
        setIdNumber(null);
        setClassName(null);
    };
    return(
        <AuthContext.Provider value={{token, role, idNumber, className, login, logout}}>
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
};