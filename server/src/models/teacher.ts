import mongoose, {Schema, Document} from "mongoose";

export interface ITeacher extends Document {
    name: String;
    idNumber: String;
    className: String;
}

const teacherSchema = new Schema<ITeacher>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        idNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        className: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const TeacherModel = mongoose.model<ITeacher>("Teacher", teacherSchema);