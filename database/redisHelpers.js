const Redis = require('redis');
const redisClient = Redis.createClient();  //Input {url: "url"} for deployed

redisClient.connect().then(() => {
	console.log("Connected to Redis DB");
})
.catch((err) => {
	console.log("Error connecting to redis ", err);
});

const REDIS_EXPIRATION = 360;

const checkRedis = (key) => {
	console.log(key);
	return redisClient.get(key)
	.then((data) => {
		if (data != null) {
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