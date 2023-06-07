const dbHelpers = require('../../database/SQL/helpers.js');

const redisHelpers = require('../../database/redisHelpers.js');

module.exports = async (req, res, helperKey) => {
	const sendData = (data) => {
		res.statusCode = 200;
		res.send(data);
	}
	// console.log('request for ', helperKey);
	var id = req.params.product_id;
	if (isNaN(Number(id))) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.send('Error: Invalid product id provided');
		return;
	}

	var redisData = await redisHelpers.checkRedis(helperKey + id);
	if (redisData) {
		sendData(redisData);
		return;
	};

	dbHelpers[helperKey](id)
	.then((data) => {
		var stringData = JSON.stringify(data);
		redisHelpers.setRedis(helperKey + id, stringData);
		sendData(stringData);
	})
	.catch((err) => {
		console.log(`Error fetching ${helperKey.slice(3)}`, err);
		res.statusCode = 422;
		res.send(JSON.stringify(err));
	});
};
