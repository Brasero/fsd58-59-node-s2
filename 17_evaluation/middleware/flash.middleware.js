export default function flashMiddleware(req, res, next) {
	const flashs = req.session.flashs || [];
	req.session.flashs = [];
	res.locals.flashs = flashs;
	next();
}