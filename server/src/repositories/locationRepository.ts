import { LocationModel } from "../models/location";

interface SaveLocationData {
    idNumber: string;
    longitude: number;
    latitude: number;
    time: Date;
    type: "student" | "teacher";
}

export const saveOrUpdateLocation = async (data: SaveLocationData) => {
    return await LocationModel.findOneAndUpdate(
        {
            idNumber: data.idNumber,
            type: data.type,
        },
        data,
        {
            new: true,
            upsert: true,
        }
  );
};

export const getAllStudentLocations = async () => {
    return await LocationModel.find({ type: "student" });
};

export const getTeacherLocation = async (idNumber: string) => {
    return await LocationModel.findOne({
        idNumber,
        type: "teacher",
    });
};