import db from "./index.js";

const UserSchema = db.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: String,
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	}
})

export default db.model("User", UserSchema);