import {Router} from "express";
import productController from "../controller/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", productController.getHomePage)
router.get("/detail/:id", productController.getDetailPage)
router.get("/add", authMiddleware.authMiddleware, productController.getProductForm)
router.post("/add", authMiddleware.authMiddleware, productController.postProductForm)
router.get("/modify/:id", authMiddleware.authMiddleware, productController.getModifyProductForm)
router.post("/modify/:id", authMiddleware.authMiddleware, productController.putModifyProductForm)
router.get("/delete/:id", authMiddleware.authMiddleware, productController.deleteProduct)

export default router