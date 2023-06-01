const {getProductList} = require('../../database/SQL/helpers.js');

const redisHelpers = require('../../database/redisHelpers.js');

module.exports = async (req, res, redisObj) => {
	const sendData = (data) => {
		res.statusCode = 200;
		res.send(data);
	}

	const query = req.query;
	const count = query.count ? Number(query.count) : 5;
	const page = query.page ? Number(query.page) : 1;

	var redisKey = "page:" + count + "count:" + page;

	var redisData = await redisHelpers.checkRedis(redisKey);

	if (redisData) {
		console.log(redisData);
		sendData(redisData);
		return;
	}

	getProductList(count, page)
	.then((data) => {
		var stringData = JSON.stringify(data);
		redisHelpers.setRedis(redisKey, stringData);
		sendData(stringData);
	})
	.catch((err) => {
		console.log("Error fetching product list", err);
		res.statusCode = 422;
		res.end();
	});

};