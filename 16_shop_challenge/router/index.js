import {Router} from "express";
import productsRoutes from "./products.routes.js";
import userRoutes from "./user.routes.js";

const router = Router()

router.use(productsRoutes);
router.use(userRoutes);

export default router