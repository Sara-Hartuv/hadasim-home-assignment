import { Router } from "express";
import * as teacherController from "../controllers/teacherController";
import { validateCreateTeacher } from "../middlewares/validateCreateTeacher";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/", authenticate, authorize("manager"), validateCreateTeacher, teacherController.createTeacher);
router.get("/",authenticate, authorize("manager"), teacherController.getAllTeachers);
router.get("/by-id/:idNumber", authenticate, authorize("manager"), teacherController.getTeacherByIdNumber);
router.get("/by-name", authenticate, authorize("manager"), teacherController.getTeacherByName);
router.get("/:idNumber/students", authenticate, authorize("manager", "teacher"), teacherController.getStudentsByTeacherId);


export default router;