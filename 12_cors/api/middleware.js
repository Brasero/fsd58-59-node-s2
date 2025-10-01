export default function (req, res, next) {
	const path = req.path
	const method = req.method
	console.log(`${path} ) ${method}`)
	next()
}