import dotenv from "dotenv";
import { connectDB } from "../db/connectDB";
import { TeacherModel } from "../models/teacher";
import { StudentModel } from "../models/student";
import { LocationModel } from "../models/location";

dotenv.config();

interface Point {
  latitude: number;
  longitude: number;
}

const teacherBasePoints: Point[] = [
  { latitude: 31.778, longitude: 35.235 }, // אזור העיר העתיקה
  { latitude: 31.768, longitude: 35.213 }, // מרכז ירושלים
  { latitude: 31.776, longitude: 35.202 }, // אזור גן סאקר
];

const nearOffsets: Point[] = [
  { latitude: 0.002, longitude: 0.002 },
  { latitude: -0.002, longitude: 0.001 },
  { latitude: 0.001, longitude: -0.002 },
  { latitude: -0.0015, longitude: -0.001 },
];

const farOffsets: Point[] = [
  { latitude: 0.04, longitude: 0.02 },   // בערך 4-5 ק"מ
  { latitude: -0.04, longitude: -0.02 }, // בערך 4-5 ק"מ
  { latitude: 0.05, longitude: -0.01 },  // בערך 5-6 ק"מ
];

const randomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

const addSmallMovement = (point: Point): Point => {
  return {
    latitude: point.latitude + (Math.random() - 0.5) * 0.001,
    longitude: point.longitude + (Math.random() - 0.5) * 0.001,
  };
};

const saveLocation = async (
  idNumber: string,
  type: "teacher" | "student",
  point: Point
) => {
  await LocationModel.findOneAndUpdate(
    { idNumber },
    {
      idNumber,
      type,
      latitude: point.latitude,
      longitude: point.longitude,
      time: new Date(),
    },
    { new: true, upsert: true }
  );
};

const sendSimulatedLocations = async () => {
  const teachers = await TeacherModel.find();
  const students = await StudentModel.find();

  for (const teacher of teachers) {
    const teacherPoint = addSmallMovement(randomItem(teacherBasePoints));

    await saveLocation(teacher.idNumber, "teacher", teacherPoint);

    const teacherStudents = students.filter(
      (student) => student.className === teacher.className
    );

    for (let i = 0; i < teacherStudents.length; i++) {
      const student = teacherStudents[i];

      const shouldBeFar = i % 4 === 0; 
      const offset = shouldBeFar ? randomItem(farOffsets) : randomItem(nearOffsets);

      const studentPoint = addSmallMovement({
        latitude: teacherPoint.latitude + offset.latitude,
        longitude: teacherPoint.longitude + offset.longitude,
      });

      await saveLocation(student.idNumber, "student", studentPoint);
    }
  }

  console.log("Simulated locations updated:", new Date().toLocaleTimeString());
};

const startSimulator = async () => {
  await connectDB();

  await sendSimulatedLocations();

  setInterval(sendSimulatedLocations, 60_000);
};

startSimulator();