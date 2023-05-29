const Redis = require('redis');
const redisClient = Redis.createClient();  //Input {url: "url"} for deployed

redisClient.connect().then(() => {
	console.log("Connected to Redis DB");
})
.catch((err) => {
	console.log("Error connecting to redis ", err);
});

const REDIS_EXPIRATION = 3600;

const checkRedis = (res, key) => {
	return redisClient.get(key)
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

const setRedis = (key, data) => {
	redisClient.setEx(key, REDIS_EXPIRATION, JSON.stringify(data));
}

module.exports = {checkRedis, setRedis};