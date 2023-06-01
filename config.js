require("dotenv").config();

module.exports = {
  port: process.env.PORT,

  post_name: process.env.PG_CONTAINER_NAME,
  post_user: process.env.PG_USR,
  post_pass: process.env.PG_PASS,
  post_db: process.env.PG_DATABASE,
  post_port: process.env.PG_PORT,

  redis_ip: "redis://" + process.env.REDIS_CONTAINER_NAME + ":" + process.env.REDIS_PORT
};
