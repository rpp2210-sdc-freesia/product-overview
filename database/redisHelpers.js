const config = require('../config.js');

const Redis = require('redis');
console.log (config.redis_ip);
const redisClient = Redis.createClient({url: config.redis_ip});  //Input {url: "url"} for deployed

redisClient.connect().then(() => {
	console.log("Connected to Redis DB");
})
.catch((err) => {
	console.log("Error connecting to redis ", err);
});

const REDIS_EXPIRATION = 1800;

const checkRedis = (key) => {
	return redisClient.get(key)
	.then((data) => {
		if (data != null) {
			redisClient.expire(key, REDIS_EXPIRATION);
			return data;
		}
		return false;
	})
	.catch((err) => {
		console.log("Error fetching with redis ", err);
		return false;
	});
};

const setRedis = (key, data) => {
	redisClient.setEx(key, REDIS_EXPIRATION, data);
}

module.exports = {checkRedis, setRedis};