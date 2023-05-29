const dbHelpers = require('../../database/SQL/helpers.js');


module.exports = (req, res, helperKey) => {
	// console.log('request for ', helperKey);
	var id = req.params.product_id;
	if (isNaN(Number(id))) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.send('Error: Invalid product id provided');
		return;
	}
	dbHelpers[helperKey](id)
	.then((data) => {
		res.statusCode = 200;
		res.send(JSON.stringify(data));
	})
	.catch((err) => {
		console.log(`Error fetching ${helperKey.slice(3)}`, err);
		res.statusCode = 422;
		res.send(JSON.stringify(err));
	});
};