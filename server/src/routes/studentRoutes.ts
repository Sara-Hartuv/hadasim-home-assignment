import {Router} from "express";
import * as studentController from "../controllers/studentController";
import {validateCreateStudent} from "../middlewares/validateCreateStudent";

const router = Router();

router.post("/", validateCreateStudent, studentController.createStudent);
router.get("/by-id/:idNumber", studentController.getStudentByIdNumber);
router.get("/by-name", studentController.getStudentByName);

export default router;