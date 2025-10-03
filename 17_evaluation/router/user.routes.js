import {Router} from "express";
import userController from "../controller/user.controller.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = Router();

router.get("/register", userController.getRegisterForm);
router.post("/register", userController.registerUser);
router.get("/login", userController.getLoginForm);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/dashboard", userController.getDashboard);
router.get("/admin", adminMiddleware, userController.getAdminDashboard);


export default router;