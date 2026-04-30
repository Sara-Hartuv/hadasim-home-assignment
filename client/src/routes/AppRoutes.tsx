import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import ManagerDashboard from "../pages/ManagerDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";

const AppRoutes = () => {
    const { token, role } = useAuth();

    return(
        <Routes>
            <Route
                path="/login"
                element={
                    token && role ==="manager"? (
                        <Navigate to = "/manager" replace/>
                    ): token && role === "teacher"?(
                        <Navigate to ="/teacher" replace/>
                    ):(<LoginPage/>)
                }
            />
            <Route
                path="/manager"
                element={
                    token && role === "manager" ? (
                        <ManagerDashboard/>
                    ):(
                        <Navigate to = "/login" replace/>
                    )
                }
            />
            <Route
                path="/teacher"
                element={
                    token && role === "teacher" ? (
                        <TeacherDashboard/>
                    ) : (
                        <Navigate to="/login" replace/>
                    )
                }
            />
            <Route path="*" element= {<Navigate to ="/login" replace/>}/>
        </Routes>
    );
};
export default AppRoutes;