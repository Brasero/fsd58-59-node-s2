import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const {JWT_SECRET} = process.env
export function isConnectedMiddleware(req,res,next) {
	if (req.session.token) {
		req.session.isConnected = true
		next()
		return
	}
	req.session.isConnected = false
	next()
}

export function authMiddleware(req,res,next) {
	if (req.session.token) {
		const decoded = jwt.decode(req.session.token, JWT_SECRET)
		if (decoded) {
			next()
			return
		}
		res.redirect("/")
	}
	res.redirect("/")
}