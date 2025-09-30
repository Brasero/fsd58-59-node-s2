import fs from "node:fs";
import path from "node:path";
import {header} from "../utils/header.js";

const cwd = process.cwd();
const dataPath = path.join(cwd, "data");

function home(req, res) {
	let data;
	try {
		data = fs.readFileSync(path.join(dataPath, "kittens.json"), {encoding: "utf-8"})
	} catch (e) {
		console.log(e)
		res.status(404).send("Aucune data disponible")
		return
	}
	const kittens = JSON.parse(data)
	
	let list = "<ul>";
	
	kittens.forEach(kitten => {
		const image = kitten.image.startsWith("https") ? kitten.image : `/images/${kitten.image}`;
		list += `
			<li>
				<img src=${image} alt="Photo de chat" />
				<a href="/kitten/${kitten.id}">${kitten.name}</a>
			</li>
		`
	})
	
	list += "</ul>"
	
	const html = header("/css/home.css") + `
	<body>
	<a href="/add">Ajouter</a>
		<main class="container">
			${list}
		</main>
	</body>
	</html>
	`;
	res.send(html);
}

function detail(req, res) {
	const {id} = req.params;
	
	const filePath = path.join(dataPath, `${id}.json`);
	
	if (isNaN(parseInt(id)) || !fs.existsSync(filePath)) {
		res.status(404).send("Aucune données à afficher.")
		return
	}
	
	const data = fs.readFileSync(filePath, {encoding: 'utf8'})
	const kitten = JSON.parse(data);
	const image = kitten.image.startsWith("https") ? kitten.image : `/images/${kitten.image}`
	const html = header("/css/kitten.css") + `
		<body>
			<main class="container">
				<img src=${image} alt="Photo de chaton" />
				<h1>${kitten.name}</h1>
				<small>${kitten.age} ans</small>
				<p>${kitten.description}</p>
				<a href="/">Home</a>
			</main>
		</body>
		</html>
	`
	res.send(html);
}

function showForm(req, res) {
	
	const error = req.query.error || null
	
	const html = header("/css/add.css") + `
		<body>
		<main>
			${(error & error !== null) ? `<div class="error">${error}</div>` : ""}
			<form action="/add" method="post">
				<input type="text" name="name" placeholder="Nom du chaton" id="">
				<input type="number" name="age" placeholder="Age du chaton" id="">
				<input type="text" name="image" placeholder="https://placekitten.com/200/600" id="">
				<textarea name="description"></textarea>
				<button type="submit">Ajouter</button>
			</form>
		</main>
		</body>
	`
	res.send(html);
}

function addKitten(req, res) {
	
	if (!req.body.name || !req.body.age || !req.body.image || !req.body.description ) {
		const error = "Merci de remplir tout les champs";
		res.redirect(`/add?error=${encodeURIComponent(error)}`)
		return
	}
	
	if (req.body.name?.trim() === "" || req.body.age?.trim() === "" || req.body.image?.trim() === "" || req.body.description?.trim() === "") {
		const error = "Merci de remplir tout les champs";
		res.redirect(`/add?error=${encodeURIComponent(error)}`)
		return
	}
	const {name, age, image, description} = req.body
	
	if (isNaN(parseInt(age)) || parseInt(age) <= 0) {
		const error = "Le chaton doit avoir un age supérieur à 0";
		res.redirect(`/add?error=${encodeURIComponent(error)}`);
		return
	}
	
	if (!image.startsWith("https://placekitten.com")) {
		const error = "Merci de saisir une URL valid pour l'image";
		res.redirect(`/add?error=${encodeURIComponent(error)}`)
		return
	}
	
	const kittens = JSON.parse(fs.readFileSync(path.join(dataPath, "kittens.json"), {encoding: "utf8"}));
	const lastId = Math.max(...kittens.map(kitten => kitten.id))
	const ID = lastId+1;
	const kitten = {
		id: ID,
		name,
		age: parseInt(age),
		image,
		description
	}
	kittens.push(kitten)
	
	try {
		fs.writeFileSync(path.join(dataPath, "kittens.json"), JSON.stringify(kittens, null, 2), "utf8");
		
		const newFilePath = path.join(dataPath, `${ID}.json`);
		fs.writeFileSync(newFilePath, JSON.stringify(kitten, null, 2), "utf8")
	} catch(e) {
		res.status(500).send(`An error occurred: ${e.message}`)
		return
	}
	
	res.redirect('/')
}

export default {
	home, detail, showForm, addKitten
}