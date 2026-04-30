import { useEffect, useState } from "react";
import { getTeacherStudents } from "../api/teachersApi";
import type { Student } from "../types/student";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StudentSearch from "../components/StudentSearch";
import StudentList from "../components/StudentList";
import Modal from "../components/Modal";
import AddStudentForm from "../components/AddStudentForm";
import DashboardLayout from "../components/DashcoardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeacherDashboard = () => {
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

    const navigate = useNavigate();

    const {logout, idNumber, className} = useAuth();

    const loadStudents = async () => {
        try {
            setError("");
            setIsLoading(true);

            if(!idNumber){
                setError("לא תמצאה תעודת זהות של מורה מחוברת");
                return;
            }
            const data = await getTeacherStudents(idNumber);
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
        <DashboardLayout title="התלמידות שלי" subtitle={`ניהול תלמידות הכיתה ${className ?? ""}`} onLogout={handleLogout}
            sidebarItems={[{
                label: "התלמידות שלי",
                isActive: true,
                onClick: () => {},
                },
            ]}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">רשימת תלמידות</h2>
                        <p className="text-sm text-slate-500">
                        כאן ניתן לחפש ולהוסיף תלמידות לכיתה שלך
                        </p>
                    </div>

                    <Button onClick={() => setIsAddStudentOpen(true)}>
                    הוספת תלמידה
                    </Button>
                </div>
                <Modal isOpen={isAddStudentOpen} title="הוספת תלמידה" onClose={() => setIsAddStudentOpen(false)}>
                    <AddStudentForm onStudentAdded={loadStudents} onClose={() => setIsAddStudentOpen(false)} fixedClassName={className ?? undefined}/>
                </Modal>
                <Card>
                    <CardHeader>
                        <CardTitle>חיפוש תלמידה</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StudentSearch searchName={searchName} onSearchNameChange={setSearchName}/>
                    </CardContent>
                </Card>
                {isLoading && <p>טוען...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!isLoading && <StudentList students={students} />}
            </div>
        </DashboardLayout>
    );
};

export default TeacherDashboard;