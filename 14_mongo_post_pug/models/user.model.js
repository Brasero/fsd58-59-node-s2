import db from "./index.js"

const userSchema = db.Schema({
	login: String,
	password: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

export default db.model("user", userSchema)