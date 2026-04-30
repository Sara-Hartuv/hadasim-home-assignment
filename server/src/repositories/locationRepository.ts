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
        {idNumber: data.idNumber},
        data,
        {
            new: true,
            upsert: true,
        }
    );
};

export const getAllLocations = async () => {
    return await LocationModel.find();
};

export const getLocationByIdNumber = async (idNumber: string) => {
    return await LocationModel.findOne({ idNumber });
};

export const getLocationsByIdNumbers = async (idNumbers: string[]) => {
    return await LocationModel.find({
        idNumber: { $in: idNumbers },
    });
};
