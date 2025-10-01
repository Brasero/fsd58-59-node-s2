import express from "express"
import logMiddleware from "./middleware.js";
import cors from "cors"

const api = express()
api.use(cors({
	origin: ["http://localhost:5173"]
}))
api.use(logMiddleware)

api.get("/", (req, res) => {
	const product = [
	 "Pomme",
	 "Banane",
	 "Poire"
	]
	
	res.send(JSON.stringify(product))
})

api.listen(8000, () => {
	console.log("Server running")
})