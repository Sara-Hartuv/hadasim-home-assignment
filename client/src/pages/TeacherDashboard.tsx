import { useEffect, useState } from "react";
import { getTeacherStudents } from "../api/teachersApi";
import type { Student } from "../types/student";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const {logout, idNumber} = useAuth();

    const loadStudents = async () => {
        try {
            setError("");
            setIsLoading(true);

            if(!idNumber){
                setError("לא תמצאה תעודת זהות של מורה מחוברת");
                return;
            }
            const data = await getTeacherStudents(idNumber);
            setStudents(data);
            setAllStudents(data);
            setStudents(data);
        }catch {
            setError("שגיאה בטעינת תלמידות");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, [idNumber]);

    useEffect(() => {
        const searchValue = searchName.trim().toLowerCase();
        if (!searchValue) {
            setStudents(allStudents);
            return;
        }
        const filteredStudents = allStudents.filter((student) => 
            student.name.toLowerCase().includes(searchValue)
        );
        setStudents(filteredStudents);
    }, [searchName, allStudents]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div dir="rtl" style={{padding:"20px"}}>
            <h1>התלמידות שלי</h1>
            <button onClick={handleLogout}>התנתקות</button>
            <h2>חיפוש תלמידה</h2>
            <input placeholder="הכניסי שם תלמידה" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
            {isLoading && <p>טוען...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
            <ul>
                {students.map((student) => (
                    <li key = {student._id}>{student.name} | {student.className}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherDashboard;