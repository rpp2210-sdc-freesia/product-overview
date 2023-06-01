require("dotenv").config();

module.exports = {
  port: process.env.PORT,

  mongo_ip: process.env.MONGOIP,
  mongo_user: process.env.MONGOUSR,
  mongo_pass: process.env.MONGOPASS,

  post_name: process.env.PG_CONTAINER_NAME,
  post_user: process.env.POSTGRESUSR,
  post_pass: process.env.POSTGRESPASS,
  post_db: process.env.PGDATABASE,
  post_port: process.env.POSTGRESPORT,
  post_ip: process.env.POSTGRESIP,

  redis_ip: process.env.REDISIP
};
