import express from "express"
import routes from "./routes/index.js";

const port = process.env.PORT || 8000
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(routes);

app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})