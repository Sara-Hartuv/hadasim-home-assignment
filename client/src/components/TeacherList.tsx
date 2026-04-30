import type {Teacher} from "../types/teacher";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface TeacherListProps {
    teachers: Teacher[];
}

const TeacherList = ({teachers}: TeacherListProps) => {
    if(teachers.length === 0){
        return (
            <Card className="mt-4">
                <CardContent className="p-6 text-center text-muted-foreground">
                 לא נמצאו מורות
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="mt-4 overflow-hidden border-slate-200 bg-white shadow-sm">
            <CardContent className="p-0">
                <Table dir="rtl">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right text-slate-950">שם מורה</TableHead>
                            <TableHead className="text-right text-slate-950">כיתה</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {teachers.map((teacher) => (
                            <TableRow key={teacher._id} className="hover:bg-slate-50">
                                <TableCell className="font-medium">{teacher.name}</TableCell>
                                <TableCell>{teacher.className}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
export default TeacherList;