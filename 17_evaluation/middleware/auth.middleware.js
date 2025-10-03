import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const excludePath = [
 "/",
 "/login",
 "/register"
]
export default function authMiddleware(req,res,next) {
	const token = req.session.token;
	if (!token) {
		if (excludePath.includes(req.path)) {
			return next();
		}
		req.session.flashs = [{
			message: "Vous devez être connecté pour accéder à cette page.",
			type: "danger"
		}];
		return res.redirect("/login");
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			if (excludePath.includes(req.path)) {
				return next();
			}
			req.session.flashs = [{
				message: "Session expirée. Veuillez vous reconnecter.",
				type: "danger"
			}];
			return res.redirect("/login");
		}
		// Renouveler le token en le réémettant avec une nouvelle durée de validité de 15 minutes
		req.session.token = jwt.sign({
			id: decoded.id,
			email: decoded.email,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			role: decoded.role
		}, process.env.JWT_SECRET, {expiresIn: "15m"});
		req.user = decoded;
		res.locals.user = decoded;
		next();
	});
}