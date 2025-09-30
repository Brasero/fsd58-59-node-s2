import { Router } from "express";
import kittenRoute from "./kitten.route.js";

const router = Router();

router.use(kittenRoute)
export default router;