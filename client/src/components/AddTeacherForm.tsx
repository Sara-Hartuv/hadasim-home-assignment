import React, { useState } from "react";
import { createTeacher } from "../api/teachersApi";

interface AddTeacherFormProps {
    onTeacherAdded:()=> void;
    onClose: () => void;
}

const AddTeacherForm = ({onTeacherAdded, onClose}: AddTeacherFormProps) => {
    const [name, setName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [className, setClassName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            setError("");
            await createTeacher({
                name, idNumber, className,
            });
            setName("");
            setIdNumber("");
            setClassName("");
            onTeacherAdded();
            onClose();
        } catch {
            setError("שגיאה בהוספת מורה");
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)}/>
            <input placeholder="תעודת זהות" value={idNumber} onChange={(e) => setIdNumber(e.target.value)}/>
            <input placeholder="כיתה" value={className} onChange={(e) => setClassName(e.target.value)}/>
            <button>הוספת מורה</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};
export default AddTeacherForm;