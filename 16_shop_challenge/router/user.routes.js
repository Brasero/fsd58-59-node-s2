import {Router} from "express";
import userController from "../controller/user.controller.js";

const router = Router()

router.get("/login", userController.getLoginForm)
router.post("/login", userController.postLoginForm)
router.get("/logout", userController.logout)

export default router