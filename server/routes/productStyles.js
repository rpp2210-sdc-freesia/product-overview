const { getProductStyles } = require('../../database/SQL/helpers');

module.exports = (req, res) => {
	var id = req.params.product_id ? req.params.product_id : req.query.product_id;
	getProductStyles(id)
	.then((data) => {
		res.statusCode = 200;
		res.send(JSON.stringify(data));
	})
	.catch((err) => {
		console.log("Error fetching product styles", err);
		res.statusCode = 422;
		res.end();
	})
}