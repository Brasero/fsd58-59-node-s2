import posts from "../data/posts.js";


function getPost(req, res) {
	const isConnected = req.session.isConnected
	res.render("posts", {
		posts,
		isConnected
	})
}

function getAddForm(req, res) {
	const isConnected = req.session.isConnected
	res.render("addPost", {isConnected})
}

function postForm(req, res) {
	if (!req.body.title || !req.body.date) {
		res.status(401).send("Malformed request")
		return
	}
	const {title, date} = req.body
	if (title.trim() === "" || date.trim() === "") {
		res.status(401).send("Malformed request")
		return
	}
	
	const post = {
		title: title[0].toUpperCase() + title.substring(1).toLowerCase(),
		date
	}
	posts.push(post)
	res.redirect("/")
}

export default {
	getPost,
	getAddForm,
	postForm
}