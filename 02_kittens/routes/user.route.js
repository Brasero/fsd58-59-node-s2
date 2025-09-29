import {Router} from "express";
import userController from "../controller/user.controller.js";

const router = Router();

router.get("/", userController.home)

router.get("/:name", userController.name)

export default router