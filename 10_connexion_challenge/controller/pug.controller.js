function pugView(req,res) {
	res.render("pug_exemple", {
		list: [
		 "Pomme",
		 "Orange",
		 "Banane"
		]
	})
}

export default {
	pugView
}