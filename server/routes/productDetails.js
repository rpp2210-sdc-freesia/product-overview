const dbHelpers = require('../../database/SQL/helpers.js');

module.exports = async (req, res, helperKey) => {
	// console.log('request for ', helperKey);
	var id = req.params.product_id;
	if (isNaN(Number(id))) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.send('Error: Invalid product id provided');
		return;
	}

	var found = await checkRedis(res, helperKey, id, redisObj.client);
	if (found) {
		return;
	}

	dbHelpers[helperKey](id)
	.then((data) => {
		redisObj.client.setEx(helperKey + id, redisObj.expiration, JSON.stringify(data));
		res.statusCode = 200;
		res.send(JSON.stringify(data));
	})
	.catch((err) => {
		console.log(`Error fetching ${helperKey.slice(3)}`, err);
		res.statusCode = 422;
		res.send(JSON.stringify(err));
	});
};

const checkRedis = (res, helperKey, id, redisClient) => {
	return redisClient.get(helperKey + id)
	.then((data) => {
		if (data != null) {
			res.statusCode = 200;
			res.send(data);
			return true;
		}
		return false;
	})
	.catch((err) => {
		console.log("Error fetching with redis ", err);
		return false;
	});
};