import express from "express"
import session from "express-session"
import router from "./router/index.js";
import path from "node:path";

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, "public")
const port = process.env.PORT || 8000
const app = express();



app.use(session({
	name: "user",
	secret: "user-secret",
	resave: true,
	saveUninitialized: true
}))

app.use(express.static(staticPath))
app.use(express.urlencoded({extended: false}))

app.use(router)
app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})