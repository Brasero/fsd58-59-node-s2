import express from "express";
import path from "node:path";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 8000

const __dirname = import.meta.dirname;
const staticPath = path.join(__dirname, "public")

app.use(express.static(staticPath));
app.use(router);
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
})