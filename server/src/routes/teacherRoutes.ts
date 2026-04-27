import { Router } from "express";
import * as teacherController from "../controllers/teacherController";
import { validateCreateTeacher } from "../middlewares/validateCreateTeacher";

const router = Router();

router.post("/", validateCreateTeacher, teacherController.createTeacher);
router.get("/:idNumber/students", teacherController.getStudentsByTeacherId);
router.get("/by-id/:idNumber", teacherController.getTeacherByIdNumber);
router.get("/by-name", teacherController.getTeacherByName);

export default router;