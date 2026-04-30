import axios from "./axios";

export const getLocations = async () => {
    const response = await axios.get("/locations");
    return response.data;
};

export const getFarStudents = async (teacherId: string) => {
    const response = await axios.get(`/locations/far-from-teacher/${teacherId}`);
    return response.data;
};