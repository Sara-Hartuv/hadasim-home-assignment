import { Router } from "express";
import * as teacherController from "../controllers/teacherController";
import { validateCreateTeacher } from "../middlewares/validateCreateTeacher";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/", authenticate, authorize("manager"), validateCreateTeacher, teacherController.createTeacher);
router.get("/:idNumber/students", authenticate, authorize("manager", "teacher"), teacherController.getStudentsByTeacherId);
router.get("/by-id/:idNumber", authenticate, authorize("manager"), teacherController.getTeacherByIdNumber);
router.get("/by-name", authenticate, authorize("manager"), teacherController.getTeacherByName);

export default router;