import mongoose, {Schema, Document} from "mongoose";
export interface IStudent extends Document {
    name: string;
    idNumber: string;
    className: string
}

const studentSchema = new Schema<IStudent>(
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
export const StudentModel = mongoose.model<IStudent>("Student", studentSchema);
