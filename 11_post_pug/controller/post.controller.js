import posts from "../data/posts.js";


function getPost(req, res) {
	req.session.info = "Token de session"
	res.render("posts", {
		posts
	})
}

export default {
	getPost
}