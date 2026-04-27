import { TeacherModel, ITeacher } from "../models/teacher";

export const createTeacher = async (data: Partial<ITeacher>) => {
  return await TeacherModel.create(data);
};

export const getTeacherByIdNumber = async (idNumber: string) => {
  return await TeacherModel.findOne({ idNumber });
};

export const getTeacherByName = async (name: string) => {
  return await TeacherModel.findOne({ name });
};
