import express from 'express';
import path from "node:path";
const app = express();


const port = process.env.PORT || 8000
const cwd = process.cwd()
const staticPath = path.join(cwd, "public")

// app.get("/css/style.css", (req, res) => {
// 	res.sendFile(path.join(cwd, "public/css/style.css"))
// })

app.use(express.static(staticPath))

app.get("/", (req, res) => {
	// const headers = req.headers;
	// const accept = req.header("accept");
	// res.set("Location", "/redirect")
	res.send(`
		<doctype html>
		<html lang="fr">
		<head>
		<link rel="stylesheet" href="/css/style.css" />
</head>
<body>
<h1>Hello express</h1>
</body>
</html>
	`);
})

app.get("/redirect", (req,res) => {
	res.send(`
		<form action="/redirect" method="POST">
			<button type="submit">Envoyé</button>
		</form>
	`);
})

app.post("/redirect", (req, res) => {
	res.send("Formulaire reçu.")
})

// app.get(/\/gr+s/, (req,res) => {
// 	// /gros, /gris, /grouuus
//
// 	res.send("pattern string match")
// })

app.get("/user/:id/:name", (req,res) => {
	const id = req.params.id;
	const name = req.params.name;
	res.send(`Id is ${id} and name is ${name}`);
})

app.get("/query", (req, res) => {
	res.send(`User name is ${req.query.name} and he is ${req.query.age} years old`)
})


app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})