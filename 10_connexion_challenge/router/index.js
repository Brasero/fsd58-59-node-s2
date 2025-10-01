import {Router} from "express";
import userController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", userController.getLogin)
router.post("/login", userController.postForm)
router.get("/secure", authMiddleware, userController.getSecure)
router.get('/logout', userController.logout)

export default router;