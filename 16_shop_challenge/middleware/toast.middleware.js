export default function toastMiddleware(req,res,next) {
	res.locals.message = req.session.message
	req.session.message = null
	next()
}