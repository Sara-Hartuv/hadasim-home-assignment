import type {Student} from "../types/student";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface StudentListProps{
    students: Student[];
}

const StudentList = ({students}: StudentListProps) => {
    if (students.length ===0){
        return (
            <Card className="mt-4">
                <CardContent className="p-6 text-center text-muted-foreground">
                    לא נמצאו תלמידות
                </CardContent>
            </Card>
        );
    }
    return(
        <Card className="mt-4 overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardContent className="p-0">
                <Table dir="rtl">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right text-slate-950">שם תלמידה</TableHead>
                            <TableHead className="text-right text-slate-950">כיתה</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student._id} className="hover:bg-slate-50">
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.className}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
export default StudentList;