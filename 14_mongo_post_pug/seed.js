import userModel from "./models/user.model.js";
import {user} from "./data/user.js";

(async function seed() {
	await userModel.deleteMany({login: "Alan"})
	await userModel.insertOne(user)
	console.log("User created")
	process.exit(0)
})()