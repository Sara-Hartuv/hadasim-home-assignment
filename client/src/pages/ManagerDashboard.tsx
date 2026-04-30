import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getAllTeachers } from "../api/teachersApi";
import type {Teacher} from "../types/teacher";
import AddTeacherForm from "../components/AddTeacherForm";
import TeacherSearch from "../components/TeacherSearch";
import TeacherList from "../components/TeacherList";
import Modal from "../components/Modal";
import { getAllStudents } from "../api/studentsApi";
import type { Student } from "../types/student";
import StudentSearch from "../components/StudentSearch";
import StudentList from "../components/StudentList";
import AddStudentForm from "../components/AddStudentForm";

const ManagerDashboard = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const [searchName, setSearchName] = useState("");
    const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
    const [activeView, setActiveView] = useState<"teachers" | "students">("teachers");
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
    const [studentSearchName, setStudentSearchName] = useState("");
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

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

    const loadStudents = async () => {
        try{
            setError("");
            setIsLoading(true);
            const data = await getAllStudents();
            setAllStudents(data);
            setStudents(data);
        } catch {
            setError("שגיאה בטעינת תלמידות");
        } finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTeachers();
        loadStudents();
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

    useEffect(() => {
        const searchValue = studentSearchName.trim().toLowerCase();
        if (!searchValue){
            setStudents(allStudents);
            return;
        }
        const filteredStudents = allStudents.filter((student) => 
            student.name.toLowerCase().includes(searchValue)
        );
        setStudents(filteredStudents);
    }, [studentSearchName, allStudents]);


    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    return (
        <div dir="rtl" style={{padding:"20px"}}>
            <h1>דשבורד מנהל</h1>
            <button onClick={handleLogout}>התנתקות</button>
            <div>
                <button onClick={() => setActiveView("teachers")}>מורות</button>
                <button onClick={() => setActiveView("students")}>תלמידות</button>
            </div>
            {activeView === "teachers"&& (
                <>
                    <button onClick={() => setIsAddTeacherOpen(true)}>
                     הוספת מורה
                    </button>
                    <Modal isOpen={isAddTeacherOpen} title="הוספת מורה" onClose={() => setIsAddTeacherOpen(false)}>
                        <AddTeacherForm onTeacherAdded={loadTeachers} onClose={() => setIsAddTeacherOpen(false)}/>
                    </Modal>
                    <TeacherSearch searchName={searchName} onSearchNameChange={setSearchName}/>
                    {!isLoading && <TeacherList teachers={teachers}/>}
                </>
            )}
            {activeView === "students" && (
                <>
                    <button onClick={() => setIsAddStudentOpen(true)}>הוספת תלמידה</button>
                    <Modal isOpen={isAddStudentOpen} title="הוספת תלמידה" onClose={() => setIsAddStudentOpen(false)}>
                        <AddStudentForm onStudentAdded={loadStudents} onClose={() => setIsAddStudentOpen(false)}/>
                    </Modal>
                    <h2>חיפוש תלמידה</h2>
                    <StudentSearch searchName={studentSearchName} onSearchNameChange={setStudentSearchName}/>
                    {!isLoading && <StudentList students={students}/>}
                </>
            )}
            {isLoading && <p>טוען...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};

export default ManagerDashboard;