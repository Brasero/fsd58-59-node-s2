export default function formErrorMiddleware(req, res, next) {
	const error = req.session.error;
	req.session.error = "";
	res.locals.error = error;
	const errors = req.session.errors;
	req.session.errors = {};
	res.locals.errors = errors;
	next();
}