import {Router} from "express";
import kittensController from "../controller/kittens.controller.js";
import myMiddleware from "../middleware/myMiddleware.js";

const router = Router();

router.get("/", myMiddleware("Route / appelée"), myMiddleware("Deuxieme middleware"), myMiddleware("Troisième appel"), kittensController.home)
router.get("/kitten/:id", kittensController.detail)
router.get("/add", kittensController.showForm)
router.post("/add", kittensController.addKitten)

export default router;