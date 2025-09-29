import express from 'express';
const app = express();


const port = process.env.PORT || 8000

app.get("/", (req, res) => {
	res.send(`
		<h1>Welcome</h1>
		<div><a href="/user/paul">/user/paul</a></div>
		<div><a href="/query?search=banana&limit=5">/query?search=banana&limit=5</div>
		
		<img src="https://picsum.photos/200/300" />
	`)
})

app.get("/user/:name", (req, res) => {
	// const name = req.params.name;
	const {name} = req.params;
	
	res.send(`
		<div>User is ${name}</div>
		<a href="/">Home</a>
	`)
})

app.get("/query", (req, res) => {
	const {search, limit} = req.query;
	res.send(`
	<h1>Query</h1>
	<div>You're looking for ${search}, ${limit} times</div>
	<a href="/">Home</a>
`)
})


app.get("/*path", (req, res) => {
	res.status(404).send(`
		<h1>You lost yourself</h1>
		<a href="/">Home</a>
	`)
})

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})