import express from "express"
import router from "./router/index.js"
import path from "node:path";
import session from "express-session"
import MongoStore from "connect-mongo";
import dotenv from "dotenv"
import {isConnectedMiddleware} from "./middleware/user.middleware.js";

dotenv.config();

const {APP_PORT, APP_HOST, MONGO_URL} = process.env

const __dirname = import.meta.dirname
const staticPath = path.join(__dirname, "public")
const app = express()
const port = APP_PORT || 8000
const host = APP_HOST || "localhost"

app.use(session({
	name: "session",
	secret: "session-secret",
	resave: true,
	saveUninitialized: true,
	store: MongoStore.create({mongoUrl: MONGO_URL})
}))

app.use(express.static(staticPath))
app.use(express.urlencoded({extended: false}))
app.use(isConnectedMiddleware)

app.set("view engine", "pug")
app.use(router)

app.listen(port, () => {
	console.log(`Running at http://${host}:${port}`)
})