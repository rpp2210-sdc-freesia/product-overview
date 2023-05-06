const {getProductList} = require('../../database/SQL/helpers.js');

module.exports = (req, res) => {
	console.log('req for product list');
	const query = req.query;
	const count = query.count ? Number(query.count) : 5;
	const page = query.page ? Number(query.page) : 1;
	getProductList(count, page)
	.then((data) => {
		res.statusCode = 200;
		res.send(JSON.stringify(data));
	})
	.catch((err) => {
		console.log("Error fetching product list", err);
		res.statusCode = 422;
		res.end();
	})
};