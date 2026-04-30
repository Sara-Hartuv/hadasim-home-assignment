import { Router } from "express";
import * as locationController from "../controllers/locationController";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.post("/", locationController.saveLocation);
router.get("/far-from-teacher/:teacherIdNumber", authenticate, authorize("teacher", "manager"), locationController.getStudentsFarFromTeacher);
router.get("/", authenticate, authorize("teacher", "manager"), locationController.getLocations);

export default router;