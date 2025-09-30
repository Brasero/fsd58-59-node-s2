function myMiddleware (message) {
	return function (req, res, next) {
		console.log(message)
		next();
	}
}

export default myMiddleware