import * as locationRepository from "../repositories/locationRepository";
import * as studentRepository from "../repositories/studentRepository";
import * as teacherRepository from "../repositories/teacherRepository";

interface DmsCoordinate {
    Degrees: string;
    Minutes: string;
    Seconds: string;
}

interface LocationRequestBody {
    ID: number | string;
    Coordinates: {
        Longitude: DmsCoordinate;
        Latitude: DmsCoordinate;
    };
    Time: string;
    Type?: "student" | "teacher";
}

interface UserFromToken {
    role: "teacher" | "manager";
    idNumber?: string;
    className?: string;
}

const convertDmsToDecimal = (coordinate: DmsCoordinate): number => {
    const degrees = Number(coordinate.Degrees);
    const minutes = Number(coordinate.Minutes);
    const seconds = Number(coordinate.Seconds);

    if (Number.isNaN(degrees) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
        throw new Error("Invalid coordinates");
    }

    return degrees + minutes / 60 + seconds / 3600;
};

const calculateDistanceInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const earthRadiusKm = 6371;
    const toRadians = (value: number) => (value * Math.PI) / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
};

export const saveLocation = async (body: LocationRequestBody) => {
    if (!body.ID || !body.Coordinates || !body.Time) {
        throw new Error("Missing location data");
    }

    const idNumber = String(body.ID);

    if (idNumber.length !== 9) {
        throw new Error("ID must contain 9 digits");
    }

    const student = await studentRepository.getStudentByIdNumber(idNumber);
    const teacher = await teacherRepository.getTeacherByIdNumber(idNumber);

    if (student && teacher){
        throw new Error("ID number exists both as student and teacher");
    }

    if (!student && !teacher) {
        throw new Error("User with this ID was not found");
    }
    const type = student ? "student" : "teacher";

    const longitude = convertDmsToDecimal(body.Coordinates.Longitude);
    const latitude = convertDmsToDecimal(body.Coordinates.Latitude);

    return await locationRepository.saveOrUpdateLocation({idNumber, longitude, latitude, time: new Date(body.Time), type,});
};

export const getLocationsByUser = async (user: UserFromToken) => {
    if (user.role === "manager") {
        return await locationRepository.getAllLocations();
    }
    if (user.role === "teacher") {
        if (!user.idNumber || !user.className) {
            throw new Error("Missing teacher data");
        }
        const teacherLocation = await locationRepository.getLocationByIdNumber(user.idNumber);
        const classStudents = await studentRepository.getStudentsByClassName(user.className);
        const studentIds = classStudents.map((student) => student.idNumber);
        const studentLocations = await locationRepository.getLocationsByIdNumbers(studentIds);
        return {
            teacherLocation,
            studentLocations,
        };
    }
    throw new Error("Invalid user role");
};

export const getStudentsFarFromTeacher = async (teacherIdNumber: string, user: UserFromToken) => {
    if (user.role === "teacher" && user.idNumber !== teacherIdNumber) {
        throw new Error("Teacher can check only her own students");
    }
    const teacherLocation = await locationRepository.getLocationByIdNumber(teacherIdNumber);
    if (!teacherLocation || teacherLocation.type !== "teacher") {
        throw new Error("Teacher location not found");
    }
    const teacher = await teacherRepository.getTeacherByIdNumber(teacherIdNumber);
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    const classStudents = await studentRepository.getStudentsByClassName(teacher.className);
    const studentIds = classStudents.map((student) => student.idNumber);
    const studentLocations = await locationRepository.getLocationsByIdNumbers(studentIds);
    return studentLocations
        .map((studentLocation) => {
            const distanceKm = calculateDistanceInKm(
                teacherLocation.latitude,
                teacherLocation.longitude,
                studentLocation.latitude,
                studentLocation.longitude
            );
            return {
                studentIdNumber: studentLocation.idNumber,
                latitude: studentLocation.latitude,
                longitude: studentLocation.longitude,
                time: studentLocation.time,
                distanceKm,
                isTooFar: distanceKm > 3,
            };
    }).filter((student) => student.isTooFar);
};
