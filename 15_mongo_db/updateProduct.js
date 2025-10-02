import productModel from "./db/product.model.js";


async function updateQty() {
	await productModel.updateMany({society: "Blanc et Pons"}, {$set: {qty: 200}})
	const products = await productModel.find({society: "Blanc et Pons"})
	console.log("Updated elements")
	console.log(products)
}

async function multiplyQty() {
	await productModel.updateMany({society: "Aubert SEM"}, {$mul: {qty: 2}})
	const products = await productModel.find({society: "Aubert SEM"})
	console.log("Mutliplied Qty elements")
	console.log(products)
}




async function test () {
	await updateQty()
	await multiplyQty()
	process.exit(0)
}

test()