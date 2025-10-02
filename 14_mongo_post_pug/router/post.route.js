import {Router} from "express";
import postController from "../controller/post.controller.js";
import {authMiddleware} from "../middleware/user.middleware.js";

const router = Router()

router.get("/", postController.getPost)
router.get("/add",authMiddleware, postController.getAddForm)
router.post("/add", authMiddleware, postController.postForm)
export default router