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
import DashboardLayout from "../components/DashcoardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <DashboardLayout
        title="דשבורד מנהל"
        subtitle="ניהול מורות ותלמידות במערכת"
        onLogout={handleLogout}
        sidebarItems={[
        {
            label: "מורות",
            isActive: activeView === "teachers",
            onClick: () => setActiveView("teachers"),
        },
        {
            label: "תלמידות",
            isActive: activeView === "students",
            onClick: () => setActiveView("students"),
        },
        ]}
    >
        <div className="space-y-6">
        {activeView === "teachers" && (
            <>
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-xl font-semibold">רשימת מורות</h2>
                <p className="text-sm text-slate-500">חיפוש והוספת מורות למערכת</p>
                </div>

                <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => setIsAddTeacherOpen(true)}
                >
                הוספת מורה
                </Button>
            </div>

            <Modal
                isOpen={isAddTeacherOpen}
                title="הוספת מורה"
                onClose={() => setIsAddTeacherOpen(false)}
            >
                <AddTeacherForm
                onTeacherAdded={loadTeachers}
                onClose={() => setIsAddTeacherOpen(false)}
                />
            </Modal>

            <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                <CardTitle>חיפוש מורה</CardTitle>
                </CardHeader>
                <CardContent>
                <TeacherSearch
                    searchName={searchName}
                    onSearchNameChange={setSearchName}
                />
                </CardContent>
            </Card>

            {!isLoading && <TeacherList teachers={teachers} />}
            </>
        )}

        {activeView === "students" && (
            <>
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-xl font-semibold">רשימת תלמידות</h2>
                <p className="text-sm text-slate-500">חיפוש והוספת תלמידות למערכת</p>
                </div>

                <Button
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => setIsAddStudentOpen(true)}
                >
                הוספת תלמידה
                </Button>
            </div>

            <Modal
                isOpen={isAddStudentOpen}
                title="הוספת תלמידה"
                onClose={() => setIsAddStudentOpen(false)}
            >
                <AddStudentForm
                onStudentAdded={loadStudents}
                onClose={() => setIsAddStudentOpen(false)}
                />
            </Modal>

            <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                <CardTitle>חיפוש תלמידה</CardTitle>
                </CardHeader>
                <CardContent>
                <StudentSearch
                    searchName={studentSearchName}
                    onSearchNameChange={setStudentSearchName}
                />
                </CardContent>
            </Card>

            {!isLoading && <StudentList students={students} />}
            </>
        )}

        {isLoading && <p>טוען...</p>}
        {error && <p className="text-red-600">{error}</p>}
        </div>
    </DashboardLayout>
    );
};
export default ManagerDashboard;