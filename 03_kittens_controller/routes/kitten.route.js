import {Router} from "express";
import kittensController from "../controller/kittens.controller.js";

const router = Router();

router.get("/", kittensController.home)
router.get("/kitten/:id", kittensController.detail)

export default router;