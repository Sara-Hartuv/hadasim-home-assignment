import {StudentModel, IStudent} from "../models/student";

export const createStudent = async (data: Partial<IStudent>) => {
    return await StudentModel.create(data);
};

export const getStudentByIdNumber = async (idNumber: string) => {
    return await StudentModel.findOne({idNumber});
}

export const getStudentByName = async (name: string) => {
    const safeName = name.trim();
    return await StudentModel.find({ name: {$regex: safeName, $options: "i"},});
};

export const getStudentsByClassName = async (className: string) => {
  return await StudentModel.find({ className });
};

export const getStudentByNameAndClass = async (name: string, className: string) => {
    const safeName = name.trim();
    return StudentModel.find({
        name: { $regex: safeName, $options: "i" },
        className: className,
  });
};