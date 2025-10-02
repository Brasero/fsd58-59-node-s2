import product from "./data/product.js";
import {user} from "./data/user.js";
import productModel from "./db/product.model.js";
import userModel from "./db/user.model.js";

async function insertProduct() {
	await productModel.deleteMany({})
	await productModel.insertMany(product)
	console.log("Initial product inserted")
}

async function insertUser() {
	await userModel.deleteMany({})
	await userModel.insertOne(user)
	console.log("Initial user inserted")
}

async function seed() {
	await insertProduct();
	await insertUser()
	console.log("All data inserted")
	process.exit(0)
}

seed()