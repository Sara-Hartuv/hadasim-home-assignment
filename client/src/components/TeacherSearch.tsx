interface TeacherSearchProps {
    searchName: string;
    onSearchNameChange: (value: string) => void;
}

const TeacherSearch = ({searchName, onSearchNameChange,}: TeacherSearchProps) => {
    return(
        <>
            <h2>חיפוש מורה</h2>
            <input placeholder="הכניסי שם מורה" value={searchName} onChange={(e) => onSearchNameChange(e.target.value)}/>
        </>
    );
};
export default TeacherSearch;