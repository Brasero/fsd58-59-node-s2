import db from "./index.js"

// {
// 	sale: true,
// 	 price: 0.99,
//  society: "Aubert SEM",
//  qty: 19,
//  size: { h: 11, w: 29, uom: "cm" },
// 	year: 2019,
// }

const productSchema = db.Schema({
	sale: Boolean,
	price: Number,
	society: String,
	qty: Number,
	size: {
		h: Number,
		w: Number,
		uom: String
	},
	year: Number
})

export default db.model("products", productSchema);