import {Router} from "express";
import * as studentController from "../controllers/studentController";
import {validateCreateStudent} from "../middlewares/validateCreateStudent";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/", authenticate, authorize("teacher", "manager"), validateCreateStudent, studentController.createStudent);
router.get("/",authenticate, authorize("manager"), studentController.getAllStudents)
router.get("/by-id/:idNumber", authenticate, authorize("teacher", "manager"), studentController.getStudentByIdNumber);
router.get("/by-name", authenticate, authorize("teacher", "manager"), studentController.getStudentByName);

export default router;