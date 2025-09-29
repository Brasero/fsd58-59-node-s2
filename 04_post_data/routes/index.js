import {Router} from "express"
import dataController from "../controller/data.controller.js";

const router = Router();

router.get("/", dataController.home)
router.post("/", dataController.post)
router.get("/json", dataController.homeJson)
router.post("/json", dataController.postJson)

export default router