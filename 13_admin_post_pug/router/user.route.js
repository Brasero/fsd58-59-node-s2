import {Router} from "express";
import userController from "../controller/user.controller.js";

const router = Router()

router.get("/login", userController.getLogin)
router.post("/login", userController.postLogin)
router.get("/logout", userController.logout)

export default router