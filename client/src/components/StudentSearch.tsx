interface StudentSearchProps {
    searchName: string;
    onSearchNameChange: (value: string) => void;
}

const StudentSearch = ({searchName, onSearchNameChange,}: StudentSearchProps) => {
  return (
        <input placeholder="הכניסי שם תלמידה" value={searchName} onChange={(e) => onSearchNameChange(e.target.value)}/>
  );
};

export default StudentSearch;