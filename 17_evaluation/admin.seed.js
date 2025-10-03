import dotenv from "dotenv";
import crypto from "crypto";
import UserModel from "./models/User.model.js";
dotenv.config();

async function seedAdmin() {
	await UserModel.deleteMany({role: "admin"})
	const HASH_SECRET = process.env.HMAC_SH256_SECRET;
	const sha256Hasher = crypto.createHmac("sha256", HASH_SECRET);
	const passwordAdmin = "Admin@1234";
	const hash = sha256Hasher.update(passwordAdmin).digest("hex");
	await UserModel.insertOne({
		firstName: "Admin",
		lastName: "User",
		email: "admin@user.fr",
		password: hash,
		role: "admin"
	})
	console.log("Admin inserted in database");
	process.exit(0);
}
seedAdmin();