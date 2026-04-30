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
import MapView from "@/components/MapView";
import { getLocations, getFarStudents } from "@/api/locationsApi";

const TeacherDashboard = () => {
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [searchName, setSearchName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
    const [locations, setLocations] = useState<{idNumber: string; name:string; latitude: number; longitude:number; isTooFar: boolean}[]>([]);
    const [isMapOpen, setIsMapOpen] = useState(false);

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

    useEffect(() => {
        const loadMapData = async () => {
            try {
                if (!idNumber) return;
                const locationData = await getLocations();
                const farStudents = await getFarStudents(idNumber);
                const farIds = farStudents.map((f: any) => f.studentIdNumber);
                const teacherLoc = locationData.teacherLocation;
                const teacherMarker = teacherLoc ? [{
                    idNumber: teacherLoc.idNumber,
                    name: "המורה",
                    latitude: teacherLoc.latitude,
                    longitude: teacherLoc.longitude,
                    isTooFar: false,
                    isTeacher: true,
                }] : [];
                const studentLocations = locationData.studentLocations.map((loc: any) => {
                    const student = allStudents.find((s) => String(s.idNumber) === String(loc.idNumber));
                    return{
                        idNumber: loc.idNumber,
                        name: student?.name || "תלמידה",
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                        isTooFar: farIds.includes(loc.idNumber),
                        isTeacher: false,
                    };
                });
                setLocations([...teacherMarker, ...studentLocations]);
            } catch (err){
                console.error("Map error");
            }
        };
        loadMapData();
        const interval = setInterval(loadMapData, 5000);
        return () => clearInterval(interval);
    },[idNumber, allStudents]);

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
                    <div className="flex gap-2">
                        <Button onClick={() => setIsMapOpen(true)}>
                        צפייה במפה
                        </Button>
                        <Button onClick={() => setIsAddStudentOpen(true)}>
                        הוספת תלמידה
                        </Button>
                    </div>
                </div>
                <Modal isOpen={isAddStudentOpen} title="הוספת תלמידה" onClose={() => setIsAddStudentOpen(false)}>
                    <AddStudentForm onStudentAdded={loadStudents} onClose={() => setIsAddStudentOpen(false)} fixedClassName={className ?? undefined}/>
                </Modal>
                <Modal isOpen={isMapOpen} title="מפת מיקומי התלמידות" onClose={() => setIsMapOpen(false)}>
                    <MapView locations={locations}/>
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