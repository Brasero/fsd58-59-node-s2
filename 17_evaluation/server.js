import express from "express";
import {join} from "node:path";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import router from "./router/index.js";
import formErrorMiddleware from "./middleware/formError.middleware.js";
import flashMiddleware from "./middleware/flash.middleware.js";
import authMiddleware from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = join(process.cwd(), "public");
const MONGO_URL = process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || "your_default_session_secret";
app.use(express.static(PUBLIC_DIR));
app.use(express.urlencoded({extended: true}));
app.use(session({
	name: "auth_session",
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: MONGO_URL,
	}),
}))
app.use(formErrorMiddleware);
app.use(flashMiddleware);
app.use(authMiddleware)
app.set("view engine", "pug");
app.use(router);
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
})