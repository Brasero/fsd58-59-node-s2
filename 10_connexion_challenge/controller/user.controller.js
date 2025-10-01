import fs from "node:fs"
import path from "node:path";
import {user} from "../data/user.js";
import crypto from "crypto-js";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();

const cwd = process.cwd()
const viewPath = path.join(cwd, "view")
function getLogin(req, res) {
	const html = fs.readFileSync(path.join(viewPath, "form.html"), {encoding: "utf8"})
	res.send(html)
}

function postForm(req, res) {
	console.log(req.body)
	if (!req.body.name || !req.body.password) {
		console.log("Connexion failed")
		res.status(403).send("Malformed request")
		return
	}
	const {name, password} = req.body;
	if (name.trim() === "" || password.trim() === "") {
		console.log("Connexion failed")
		res.status(403).send("Malformed request")
		return
	}
	if (name !== user.login || crypto.SHA1(password).toString() !== user.password) {
		res.status(401).send("Wrong credentials")
		return
	}
	console.log("Connexion succeeded")
	const token = jwt.sign({user: user.login}, process.env.JWT_SECRET, {algorithm: "HS256"});
	req.session.token = token
	res.redirect("/secure");
}

function getSecure(req, res) {
	const html = fs.readFileSync(path.join(viewPath, "secure.html"), {encoding: "utf8"})
	res.send(html)
}

function logout(req, res) {
	req.session.destroy((err) => {
		if (err) {
			res.redirect("/secure")
			return
		}
		console.log("Disconnected successfully")
		res.redirect("/")
	})
}


export default {
	getLogin,
	postForm,
	getSecure,
	logout
}