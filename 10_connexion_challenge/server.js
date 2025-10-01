import express from "express"
import session from "express-session"
import router from "./router/index.js";
import path from "node:path";

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, "public")
const port = process.env.PORT || 8000
const app = express();

app.set('view engine', "pug")
app.set("views", path.join(__dirname, "view")) // par default le système cherche les vues dans un dossier "views" qui devra se trouver à la racine du projet

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