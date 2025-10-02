import product from "./data/product.js";
import productModel from "./db/product.model.js";

(async function() {
	await productModel.deleteMany({});
	await productModel.insertMany(product);
	console.log("Produit insérer")
	process.exit(0)
})()