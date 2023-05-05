const {getProductInfo} = require('../../database/SQL/helpers.js');

module.exports = (req, res, next) => {
	var id = req.params.product_id ? req.params.product_id : req.query.product_id;
	getProductInfo(id)
	.then((data) => {
		res.statusCode = 200;
		res.send(JSON.stringify(data));
	})
	.catch((err) => {
		console.log("Error fetching product info", err);
		res.statusCode = 422;
		res.end();
	});
}