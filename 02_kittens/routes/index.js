import { Router } from "express";
import routeExemple from "./route.exemple.js";
import userRoute from "./user.route.js";

const router = Router();

router.use("/", routeExemple)
router.use("/user", userRoute)

export default router;