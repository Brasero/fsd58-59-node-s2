export default function adminMiddleware(req, res, next) {
	if (!req.user) {
		req.session.flashs = [{
			message: "Vous devez être connecté pour accéder à cette page.",
			type: "danger"
		}];
		return res.redirect("/login");
	}
	if (req.user.role !== "admin") {
		req.session.flashs = [{
			message: "Vous n'avez pas les droits pour accéder à cette page.",
			type: "danger"
		}] ;
		return res.redirect("/dashboard");
	}
	next();
}