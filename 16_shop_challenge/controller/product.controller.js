import productModel from "../db/product.model.js";
import {checkField} from "../utils/utils.js";

function getHomePage(req, res) {
	productModel.find().then((products) => {
		res.render("home", {products, productQty: products.length})
	})
}

function getDetailPage(req, res) {
	const {id} = req.params
	
	productModel.findById(id)
	 .then(product => {
		 res.render("detail", {product})
	 },
	  (e) => {
		 console.error(e)
		  res.status(404).send("Ressource not found")
	  })
}

function getProductForm(req,res) {
	res.render("productForm");
}

function postProductForm(req,res) {
	if (!req.body.society || !req.body.qty || !req.body.w || !req.body.h || !req.body.uom || !req.body.price || !req.body.year) {
		req.session.message = {type: "error", message: "Merci de remplir tout les champs."}
		res.redirect("/add")
		return
	}
	const {society, qty, w, h, uom, price, year} = req.body
	const sale = req.body.sale || "off"
	if (checkField(society) || checkField(qty) || checkField(w) || checkField(h) || checkField(uom) || checkField(price) || checkField(year)) {
		req.session.message = {type: "error", message: "Merci de remplir tout les champs."}
		res.redirect("/add")
		return
	}
	const product = new productModel({
		society,
		qty,
		price: parseFloat(price),
		year: parseInt(year),
		sale: sale === "on",
		size: {
			h: parseFloat(h),
			w: parseFloat(w),
			uom
		}
	})
	
	product.save().then(() => {
		req.session.message = {
			type: "success",
			message: `Produit ${society} ajouté`
		}
		res.redirect("/")
	},
	 (err) => {
		console.error(err)
		 req.session.message = {
			type: "error",
			 message: "Une erreur est survenu lors de l'ajout de votre produit, merci de réessayer plus tard."
		 }
		 res.redirect("/add")
	 })
}

function getModifyProductForm(req, res) {
	const {id} = req.params
	productModel.findById(id)
	 .then((product) => {
		 res.render("productForm", {product})
	 },
	  (err) => {
		 console.error(err)
		  req.session.message = {type: "error", message: "Une erreur est survenu lors du chargement de la ressource"}
		  res.redirect("/")
	  })
}

function putModifyProductForm(req, res) {
	const {id} = req.params
	if (!req.body.society || !req.body.qty || !req.body.w || !req.body.h || !req.body.uom || !req.body.price || !req.body.year) {
		req.session.message = {type: "error", message: "Merci de remplir tout les champs."}
		res.redirect(req.path)
		return
	}
	const {society, qty, w, h, uom, price, year} = req.body
	const sale = req.body.sale || "off"
	if (checkField(society) || checkField(qty) || checkField(w) || checkField(h) || checkField(uom) || checkField(price) || checkField(year)) {
		req.session.message = {type: "error", message: "Merci de remplir tout les champs."}
		res.redirect(req.path)
		return
	}
	const modifyProduct = {
		society,
		qty,
		price: parseFloat(price),
		year: parseInt(year),
		sale: sale === "on",
		size: {
			h: parseFloat(h),
			w: parseFloat(w),
			uom
		}
	}
	productModel.updateOne({_id: id}, {$set: {...modifyProduct}})
	 .then(() => {
		req.session.message = {type: "success", message: "Modification enregistrée."}
		 res.redirect(`/detail/${id}`)
	},
	  (err) => {
		 console.error(err)
		 req.session.message = {type: "error", message: "Une erreur est survenue lors de la modification, réessayer."}
		  res.redirect(req.path)
	  })
}

function deleteProduct(req,res) {
	const {id} = req.params
	productModel.deleteOne({_id: id}).then(() => {
		req.session.message = {type: "success", message: "Produit supprimé."}
		res.redirect("/")
	},
	 () => {
		req.session.message = {type: "error", message: "Une erreur est survenue lors de la suppression."}
		 res.redirect(`/modify/${id}`)
	 })
}

export default {
	getHomePage,
	getDetailPage,
	getProductForm,
	postProductForm,
	getModifyProductForm,
	putModifyProductForm,
	deleteProduct
}