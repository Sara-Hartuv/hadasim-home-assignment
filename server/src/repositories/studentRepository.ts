import {StudentModel, IStudent} from "../models/student";

export const createStudent = async (data: Partial<IStudent>) => {
    return await StudentModel.create(data);
};

export const getStudentByIdNumber = async (idNumber: string) => {
    return await StudentModel.findOne({idNumber});
}

export const getStudentByName = async (name: string) => {
    return await StudentModel.findOne({ name });
}