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
		list += `
			<li>
			<img src="/images/${kitten.image}" alt="Photo de chat" />
			<a href="/kitten/${kitten.id}">${kitten.name}</a>
</li>
		`
	})
	
	list += "</ul>"
	
	const html = header("/css/home.css") + `
		<body>
		<main class="container">
		${list}
</main>
</body>
</html>
	`;
	res.send(html);
}

function detail(req,res) {
	const {id} = req.params;
	
	const filePath = path.join(dataPath, `${id}.json`);
	
	if (isNaN(parseInt(id)) || !fs.existsSync(filePath)) {
		res.status(404).send("Aucune données à afficher.")
		return
	}
	
	const data = fs.readFileSync(filePath, {encoding: 'utf8'})
	const kitten = JSON.parse(data);
	
	const html = header("/css/kitten.css") + `
		<body>
		<main class="container">
		<img src="/images/${kitten.image}" alt="Photo de chaton" />
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

export default {
	home,
	detail
}