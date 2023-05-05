module.exports = (req, res, next) => {
	console.log(req.params);
	console.log(req.query)
	res.statusCode = 200;
		res.end();
}