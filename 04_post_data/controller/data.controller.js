function home(req, res) {
	res.send(`
	<form action="/" method="POST">
	<input type="text" name="name" placeholder="name" />
	<input type="number" placeholder="age" name="age" />
	<button type="submit">Valider</button>
</form>
	`)
}

function post(req, res) {
	const {name, age} = req.body;
	
	if (!age || !name) {
		res.send(`
		<p style="color: red;"> Aucune data récupéré</p>
		<a href="/">Home</a>
		`)
		return
	}
	
	res.send(`
		<p>Vous êtes ${name}, vous avez ${age} ans</p>
	`)
}

function homeJson(req, res) {
	res.send(`
		<button id="form">Envoyer la requête</button>
		<script type="text/javascript">
		function send() {
			const dataToSend = {
				name: "John",
				age: 45
			};
			fetch("/json", {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(dataToSend)
			})
		}
		const buttonElem = document.getElementById("form")
		buttonElem.addEventListener("click", send)
</script>
	`)
}

function postJson(req,res) {
	const {name, age} = req.body
	
	if (!name || !age) {
		console.error('aucune data')
		res.status(500).send("Aucune data")
		return
	}
	
	console.log({name, age})
	res.send("ok")
}


export default {
	home,
	post,
	homeJson,
	postJson
}