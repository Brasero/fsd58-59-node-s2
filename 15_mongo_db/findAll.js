import productModel from "./db/product.model.js";

async function getAll () {
	const products = await productModel.find({})
	console.log("All products")
	console.log(products)
}

async function getMore () {
	const products = await productModel.find({qty: {$gte: 50} }).sort({qty: -1, price: 1})
	console.log("Product with qty = 25")
	console.log(products)
}

async function getOne() {
	const product = await productModel.findOne({society: "Aubert SEM", price: 1.5})
	console.log("Find One")
	console.log(product)
	
}

async function getManyByQty(){
	const product = await productModel.find({qty: {$nin: [45, 75]}})
	console.log("Product with qty equal 45 or 75")
	console.log(product)
}

async function test() {
	// await getAll();
	await getMore()
	await getOne()
	await getManyByQty()
	process.exit(0)
}

test()