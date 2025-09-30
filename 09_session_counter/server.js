import express from "express"
import session from "express-session"

const port = process.env.PORT || 8000
const app = express();

app.use(session({
	name: "counter",
	secret: "counter-secret",
	resave: true,
	saveUninitialized: true
}))

app.get("/", (req, res) => {
	if (req.session.counter) {
		req.session.counter++
	} else {
		req.session.counter = 1
	}
	
	if (req.session.counter >= 10) {
		res.redirect("/check")
		return
	}
	
	res.send({page: "/", counter: req.session.counter})
})

app.get("/check", (req, res) => {
	res.send(`
		page: /check
		counter: ${req.session.counter}
		<a href="/delete">retry</a>
	`)
})

app.get("/delete", (req, res) => {
	req.session.regenerate(() => {
		res.redirect("/")
	})
})

app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})