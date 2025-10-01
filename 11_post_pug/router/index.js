import {Router} from "express";
import postController from "../controller/post.controller.js";

const router = Router()

router.get("/", postController.getPost)

export default router