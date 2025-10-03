import {Router} from "express";
import homeController from "../controller/home.controller.js";
import userRouter from "./user.routes.js";

const router = Router();

router.get("/", homeController.getHome);
router.use(userRouter);

export default router;