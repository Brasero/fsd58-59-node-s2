import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import crypto from "crypto-js"
import userModel from "../models/user.model.js";

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
	
	userModel.findOne({login: name}, {_id: 1, login: 1, password: 1}).then((doc) => {
		console.log(doc)
		if (name !== doc.login || crypto.SHA1(password).toString() !== doc.password) {
			res.status(401).send("Wrong credentials")
			return
		}
		const token = jwt.sign({name: doc._id}, JWT_SECRET, {algorithm: "HS256"})
		
		req.session.token = token
		res.redirect("/")
	})
	
	
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