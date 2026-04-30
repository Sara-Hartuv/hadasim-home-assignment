interface TeacherSearchProps {
    searchName: string;
    onSearchNameChange: (value: string) => void;
}

const TeacherSearch = ({searchName, onSearchNameChange,}: TeacherSearchProps) => {
    return(
        <>
            <h2>חיפוש מורה</h2>
            <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100" placeholder="הכניסי שם מורה" value={searchName} onChange={(e) => onSearchNameChange(e.target.value)}/>
        </>
    );
};
export default TeacherSearch;