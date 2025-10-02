import {user} from "../data/user.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto-js"

dotenv.config()

const {JWT_SECRET} = process.env

function getLogin(req, res) {
	res.render("login")
}

function postLogin(req, res) {
	if (!req.body.name || !req.body.password) {
		res.status(401).send("Malformed request")
		return
	}
	const {name, password} = req.body
	
	if (name.trim === "" || password.trim() === "") {
		res.status(401).send("Malformed request")
		return
	}
	
	if (name !== user.login || crypto.SHA1(password).toString() !== user.password) {
		res.status(401).send("Wrong credentials")
		return
	}
	const token = jwt.sign({name: user.login}, JWT_SECRET, {algorithm: "HS256"})
	
	req.session.token = token
	res.redirect("/")
}

function logout(req,res) {
	req.session.destroy(() => {
		res.redirect('/')
	})
}

export default {
	getLogin,
	postLogin,
	logout
}