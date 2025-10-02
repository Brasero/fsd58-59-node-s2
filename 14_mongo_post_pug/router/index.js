import {Router} from "express";
import userRoute from "./user.route.js";
import postRoute from "./post.route.js";

const router = Router()

router.use(postRoute)
router.use(userRoute)

export default router