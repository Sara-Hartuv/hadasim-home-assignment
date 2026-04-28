import {Router} from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/manager-login", authController.loginManager);
router.post("/teacher-login", authController.loginTeacher);

export default router;