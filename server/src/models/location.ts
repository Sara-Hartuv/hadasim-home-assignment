import mongoose, {Schema, Document} from "mongoose";

export interface ILocation extends Document {
    idNumber: string;
    longitude: number;
    latitude: number;
    time: Date;
    type: "student" | "teacher";
}

const locationSchema = new Schema<ILocation>(
    {
        idNumber: {
            type: String,
            required: true,
            trim: true,
        },
        longitude: {
            type : Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            enum: ["student", "teacher"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
    
);

locationSchema.index({idNumber: 1}, {unique:true});

export const LocationModel = mongoose.model<ILocation>("Location", locationSchema);