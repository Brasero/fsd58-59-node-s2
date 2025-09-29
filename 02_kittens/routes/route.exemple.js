import {Router} from "express";

const router = Router();

router.get("/test", (req,res) => {
	res.send("Route de test");
})


export default router