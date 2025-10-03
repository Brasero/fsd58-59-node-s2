import UserModel from "../models/User.model.js";
import crypto from "node:crypto";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

function getRegisterForm(req, res) {
	res.render("register", { title: "Inscription | Auth App" });
}

function registerUser(req, res) {
	// Récupérer les données du formulaire, s'assurer que tous les champs sont remplis
	const { firstName, lastName, email, password, passwordConfirm } = req.body;
	if (!firstName || !lastName || !email || !password || !passwordConfirm) {
		req.session.error = "Veuillez remplir tous les champs.";
		return res.redirect("/register");
	}
	// S'assurer que les mots de passe correspondent
	if (password !== passwordConfirm) {
		req.session.errors["passwordConfirm"] = "Les mots de passe ne correspondent pas.";
		return res.redirect("/register");
	}
	// S'assurer que le mot de passe contient 8 caractères, une majuscule, un chiffre et un caractère spécial
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
	if (!passwordRegex.test(password)) {
		console.log("Password validation failed for:", password);
		req.session.errors["password"] = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.";
		return res.redirect("/register");
	}
	
	// Vérifier que l'email n'est pas déjà utilisé
	UserModel.findOne({email: email}).then(user => {
		if (user) {
			req.session.errors["email"] = "Cet email est déjà utilisé.";
			req.session.error = "Utilisateur déjà existant. Merci de vous connecter.";
			return res.redirect("/register");
		}
		// Créer un hash du mot de passe
		const HASH_SECRET = process.env.HMAC_SH256_SECRET;
		const sha256Hasher = crypto.createHmac("sha256", HASH_SECRET);
		const hash = sha256Hasher.update(password).digest("hex");
		// Créer l'utilisateur
		const newUser = {
			firstName,
			lastName,
			email,
			password: hash,
			role: "user"
		};
		UserModel.insertOne(newUser).then(() => {
			// Rediriger vers la page de login
			req.session.flashs = [{
				message: "Inscription réussie. Vous pouvez maintenant vous connecter.",
				type: "success"
			}];
			res.redirect("/login");
		}, () => {
			req.session.error = "Une erreur est survenue lors de l'inscription.";
			res.redirect("/register");
		})
	})
}

function getLoginForm(req,res) {
	res.render("login", { title: "Connexion | Auth App" });
}

function loginUser(req,res) {
 // Récupérer les données du formulaire, s'assurer que tous les champs sont remplis
	const { email, password } = req.body;
	if (!email || !password) {
		req.session.error = "Veuillez remplir tous les champs.";
		return res.redirect("/login");
	}
	// Rechercher l'utilisateur par son email
	UserModel.findOne({email: email}).then(user => {
		if (!user) {
			req.session.error = "Email inconnue.";
			return res.redirect("/login");
		}
		// Comparer le hash du mot de passe
		const HASH_SECRET = process.env.HMAC_SH256_SECRET;
		const sha256Hasher = crypto.createHmac("sha256", HASH_SECRET);
		const hash = sha256Hasher.update(password).digest("hex");
		if (hash !== user.password) {
			req.session.error = "Mot de passe incorrect.";
			return res.redirect("/login");
		}
		// Créer le token JWT avec une durée de validité de 15 minutes
		const token = jwt.sign({
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role
		}, process.env.JWT_SECRET, {expiresIn: "15m"}); // token valide 15 minutes
		// Stocker le token dans la session
		req.session.flashs = [{
			message: "Connexion réussie.",
			type: "success"
		}];
		req.session.token = token;
		// Rediriger vers la page dashboard si user ou admin si admin
		return res.redirect(user.role === "admin" ? "/admin" : "/dashboard");
	})
}

function logoutUser(req,res) {
	req.session.regenerate(() => {
		res.redirect("/");
	})
}

function getDashboard(req, res) {
	res.render("dashboard", { title: "Dashboard | Auth App" });
}

function getAdminDashboard(req, res) {
	res.render("adminDashboard", {title: "Admin | Auth App"});
}

export default {
	getRegisterForm,
	registerUser,
	getLoginForm,
	loginUser,
	logoutUser,
	getDashboard,
	getAdminDashboard
}