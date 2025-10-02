import productModel from "./db/product.model.js";


async function deleteProductsBySociety() {
	const res = await productModel.deleteMany({sale: false})
	const products = await productModel.find({sale: false})
	console.log("Product not in sale")
	console.log(res.deletedCount)
	console.log(products)
}

async function test() {
	await deleteProductsBySociety()
	process.exit(0)
}

test()