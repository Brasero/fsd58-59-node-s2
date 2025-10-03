function getHome(req, res) {
		res.render("home", { title: "Accueil | Auth App" });
}

export default {
	getHome,
}