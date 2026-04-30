import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getAllTeachers } from "../api/teachersApi";
import type {Teacher} from "../types/teacher";

const ManagerDashboard = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const [searchName, setSearchName] = useState("");
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const loadTeachers = async () => {
        try {
            setError("");
            setIsLoading(true);
            const data = await getAllTeachers();
            setAllTeachers(data);
            setTeachers(data);
        } catch {
            setError("שגיאה בטעינת מורות");
        } finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    useEffect(() => {
        const searchValue = searchName.trim().toLowerCase();
        if(!searchValue) {
            setTeachers(allTeachers);
            return;
        }
        const filteredTeachers = allTeachers.filter((teacher) =>
            teacher.name.toLowerCase().includes(searchValue)
        );
        setTeachers(filteredTeachers);
        
    }, [searchName, allTeachers]);


    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <div dir="rtl" style={{padding:"20px"}}>
            <h1>דשבורד מנהל</h1>
            <button onClick={handleLogout}>התנתקות</button>
            <h2>חיפוש מורה</h2>
            <input placeholder="הכנסי שם מורה" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
            {isLoading && <p>טוען...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
            <ul>
                {teachers.map((teacher) => (
                    <li key={teacher._id}>
                        {teacher.name} | {teacher.className}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagerDashboard;