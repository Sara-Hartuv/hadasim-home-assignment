import React, {useState} from "react";
import { createStudent } from "../api/studentsApi";

interface AddStudentFormProps {
    onStudentAdded: () => void;
    onClose: () => void;
    fixedClassName?: string;
}

const AddStudentForm = ({onStudentAdded, onClose, fixedClassName,}: AddStudentFormProps) => {
    const [name, setName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [className, setClassName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            setError("");
            await createStudent({name, idNumber, className:fixedClassName ?? className,});
            setName("");
            setIdNumber("");
            setClassName("");
            onStudentAdded();
            onClose();
        } catch {
            setError("שגיאה בהוספת תלמידה");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)}/>
            <input placeholder="תעודת זהות" value={idNumber} onChange={(e) => setIdNumber(e.target.value)}/>
            {!fixedClassName && (<input placeholder="כיתה" value={className} onChange={(e) => setClassName(e.target.value)}/>)}
            <button>הוספת תלמידה</button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    );
};
export default AddStudentForm;