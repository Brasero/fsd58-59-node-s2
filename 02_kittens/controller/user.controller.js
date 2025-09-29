function home(req,res) {
	res.send("Accueil user")
}

function name(req,res) {
	const {name} = req.params;
	res.send(`Bonjour ${name}`);
}


export default {
	home,
	name
}